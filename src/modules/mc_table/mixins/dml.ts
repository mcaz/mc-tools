import { McTable }                     from '..'
import { McRecord }                    from '../../mc_record'
import { isObject, isTable, isRecord } from '../../utils/is'
import { values }                      from '../../utils/object'


interface Dml extends McTable {}


/**
 * DML( Data Manipulation )
 */
class Dml {

    /**
     * @public
     * @returns { McTable }
     */
    duplicate (): McTable {
        return McTable.use( { ...this, data: [ this.duplicateCols(), ...this.duplicateRecords() ] } )
    }

    /**
     * @public
     * @returns { string[] }
     */
    duplicateCols (): string[] {
        return this.cols.slice()
    }

    /**
     * @public
     * @returns { McRecord[] }
     */
    duplicateRecords (): McRecord[] {
        return this.records.slice()
    }

    /**
     * @public
     * @param   { McTable | McRecord | McRecord[] | object, append?: boolean }
     * @returns { McTable }
     */
    insert ( data?: McTable | McRecord | McRecord[] | object, append?: boolean ): McTable {
        /**
         * @private
         */
        const toMcRecords = v => {
            if ( isRecord( v ) ) return v
            if ( isObject( v ) ) return this.Record( v )
            return v
        }

        const records = ( data => {
            if ( !data )            return data
            if ( isTable ( data ) ) return data[ 'records' ]
            if ( isRecord( data ) ) return [ data ]
            return [].concat( data ).map( toMcRecords )
        })( data )

        if ( records ) {
            return McTable.use({
                ...this,
                data: append
                    ? [ this.duplicateCols(), ...records, ...this.duplicateRecords() ]
                    : [ this.duplicateCols(), ...this.duplicateRecords(), ...records ]
            })
        }

        return this.duplicate()
    }

    /**
     * @public
     * @param   { object } query
     * @returns { McTable }
     */
    find ( query: object ): McTable {
        return this.filter( record => record.matched(query) )
    }

    /**
     * @public
     * @param   { object } query
     * @returns { McTable }
     */
    not ( query: object ): McTable {
        return this.filter( record => !record.matched(query) )
    }

    /**
     * @public
     * @param   { * } col
     * @returns { boolean }
     */
    hasCol ( col: any ): boolean {
        return this.colIndex( col ) !== -1
    }

    /**
     * @public
     * @param   { * } col
     * @returns { number | -1 }
     */
    colIndex ( col: any ) : number | -1 {
        return this.cols.indexOf( col )
    }

    /**
     * @public
     * @param { * } col
     */
    orderByAsc ( col: any ): McTable {
        return this.hasCol( col ) ? this.sort( ( a, b ) => a.get( col ) > b.get( col ) ? 1 : -1 ) : this
    }

    /**
     * @public
     * @param { * } col
     */
    orderByDesc ( col: any ): McTable {
        return this.hasCol( col ) ? this.sort( ( a, b ) => a.get( col ) > b.get( col ) ? -1 : 1 ) : this
    }

    /**
     * @public
     * @returns { McTable }
     */
    discard (): McTable {
        return McTable.use( { ...this, data: [ this.duplicateCols() ] } )
    }

    /**
     * @public
     * @param   { * } col
     * @returns { * }
     */
    rows ( col: any ): any[] {
        return this.hasCol( col ) ? this.map(record => record.get( col )) : []
    }

    /**
     * @public
     * @param { * } col
     */
    max ( col: any ): any | null {
        const rows = this.rows( col )

        return rows.length === 0 ? null : rows.reduce( ( max, row ) =>
            max < row ? row : max, rows[0]
        )
    }

    /**
     * @public
     * @param { * } col
     */
    min ( col: any ): any | null {
        const rows = this.rows( col )

        return rows.length === 0 ? null : rows.reduce( ( min, row ) =>
            min > row ? row : min, rows[0]
        )
    }

    /**
     * @public
     * @param   { * } col
     * @returns { * }
     */
    distinctRows ( col: any ): any[] {
        const obj =  Object.keys( this.rows( col ).reduce( ( o, field ) => ( { ...o, [ field ]: field } ), {} ) )
        return values(obj)
    }

    /**
     * カラム選択
     * @public
     * @param   { *[] } col
     * @returns { McTable }
     */
    select ( cols: any[] ): McTable {
        const filteredcols = cols.filter( col => this.cols.some( _col => _col === col ) )
        const records      = this.map( record => McRecord.create({
            cols: filteredcols,
            data: record.hash()
        }) )

        return McTable.use().fetch( [ cols, ...records ] ).lock()
    }

    /**
     * 重複削除
     * @public
     * @returns { McTable }
     */
    distinct (): McTable {
        return this.filter( ( record, index, records ) => {
            const hash = record.hash()

            return !records.slice( ++index ).some( _record =>
                _record.matched( hash )
            )
        })
    }

    /**
     * @public
     * @param   { McTable } right
     * @param   { any }     leftCol
     * @param   { any }     rightCol
     * @returns { McTable }
     */
    innerJoin ( leftCol: any, right: McTable, rightCol: any ): McTable {
        const records: McRecord[] = this.reduce( ( records, leftRecord ) => {
            const {
                existsRecords,
                rightRecords,
                newLeftRecordCols,
                newLeftRecordHash,
            } = JoinContext(
                this,
                leftRecord,
                leftCol,
                right,
                rightCol
            )

            if ( !existsRecords ) {
                return records
            }

            return [ ...records, ...rightRecords.map( rightRecord => {
                const newRightRecord = rightRecord.namespace( right.name )

                const cols = [
                    ...newLeftRecordCols,
                    ...newRightRecord.cols
                ]

                const data = {
                    ...newLeftRecordHash,
                    ...newRightRecord.hash()
                }

                return McRecord.create({
                    cols,
                    data
                })
            }) ]
        }, [])

        return this
            .duplicate()
            .fetch([ records[ 0 ].cols, ...records ])
            .lock()
    }

    /**
     * @public
     * @param   { any }     leftCol
     * @param   { McTable } right
     * @param   { any }     rightCol
     * @returns { McTable }
     */
    leftOuterJoin ( leftCol: any, right: McTable, rightCol: any ): McTable {
        const newRightRecordCols = McRecord.namespace(
            right.firstRecord,
            right.name
        )

        const records: McRecord[] = this.reduce( ( records, leftRecord ) => {
            const {
                existsRecords,
                rightRecords,
                newLeftRecordCols,
                newLeftRecordHash,
            } = JoinContext(
                this,
                leftRecord,
                leftCol,
                right,
                rightCol
            )

            if ( existsRecords ) {
                return [ ...records, ...rightRecords.map( rightRecord => {
                    const newRightRecord = rightRecord.namespace( right.name )

                    const cols = [
                        ...newLeftRecordCols,
                        ...newRightRecordCols
                    ]

                    const data = {
                        ...newLeftRecordHash,
                        ...newRightRecord.hash()
                    }

                    return McRecord.create({
                        cols,
                        data
                    })
                }) ]
            }

            const cols = [
                ...newLeftRecordCols,
                ...newRightRecordCols
            ]

            return [
                ...records,
                 McRecord.create( { cols, data: newLeftRecordHash } )
            ]
        }, [])

        return this
            .duplicate()
            .fetch([ records[ 0 ].cols, ...records ])
            .lock()
    }

    /**
     * @public
     * @param   { McTable } right
     * @returns { McTable }
     */
    crossJoin ( right: McTable ): McTable {
        const records = this.reduce( ( records, leftRecord ) => {
            const newLeftRecord     = leftRecord.namespace( this.name )
            const newLeftRecordHash = newLeftRecord.hash()

            return [ ...records, ...right.map( rightRecord => {
                const newRightRecord = rightRecord.namespace( right.name )

                const cols = [
                    ...newLeftRecord.cols,
                    ...newRightRecord.cols
                ]

                const data = {
                    ...newLeftRecordHash,
                    ...newRightRecord.hash()
                }

                return McRecord.create({
                    cols,
                    data
                })
            }) ]
        }, [])

        return this
            .duplicate()
            .fetch([ records[ 0 ].cols, ...records ])
            .lock()
    }
}

/**
 * @param   { McTable }  left
 * @param   { McRecord } leftRecord
 * @param   { any }      leftCol
 * @param   { McTable }  right
 * @param   { any }      rightCol
 * @returns {
 *   existsRecords    : boolean,
 *   rightRecords     : McRecord[],
 *   newLeftRecordCols: *[]
 *   newLeftRecordHash: object
 * }
 */
function JoinContext ( left: McTable, leftRecord: McRecord, leftCol: any, right: McTable, rightCol: any ): {
    existsRecords    : boolean,
    rightRecords     : McRecord[],
    newLeftRecordCols: any[],
    newLeftRecordHash: object
} {
    const {
        existsRecords,
        records: rightRecords
    } = right.find({
        [ rightCol ]: leftRecord.get( leftCol )
    })

    const newLeftRecord     = leftRecord.namespace( left.name )
    const newLeftRecordCols = newLeftRecord.cols
    const newLeftRecordHash = newLeftRecord.hash()

    return {
        existsRecords,
        rightRecords,
        newLeftRecordCols,
        newLeftRecordHash,
    }
}


export {
    Dml
}
