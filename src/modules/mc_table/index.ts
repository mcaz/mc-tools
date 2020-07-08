import { Constructor, Properties, Methods } from './interface'
import { Iterater }                         from './mixins/iterater'
import { Ddl }                              from './mixins/ddl'
import { Dml }                              from './mixins/dml'
import { McSheet }                          from '../mc_sheet'
import { applyMixins }                      from '../utils/mixin'
import { TableConfig }                      from '../../config/db'
import { McSS }                             from '../mc_ss'
import { McRecord }                         from '../mc_record'
import { Dcl }                              from './mixins/dcl'
import { Alias }                            from '../../config/alias'


class McTable extends McSheet {

    /**
     * @constructor
     * @param { Constructor } props
     */
    constructor ( props?: Constructor ) {
        super( props )

        const _props = props || {}

        _props.data ? this.fetch( _props.data ) : this.fetch()
        this.latest     = _props.latest || 0
        this.savePoints = _props.savePoints || { [ this.latest ]: this }
    }

    /**
     * @static
     * @param { Constructor } props
     */
    static use ( props?: Constructor ) {
        return new McTable( props )
    }

    /**
     * @static
     * @param {TableConfig} config
     */
    static TableSet (config: TableConfig): { Table: Function, cols: any } {
        return {
            cols: config.cols,
            /**
             * @function
             * @param  { Alias.Spreadsheet } spreadsheet
             * @return { McTable }
             */
            Table ( spreadsheet?: Alias.Spreadsheet ) {
                return McTable.use({
                    spreadsheet: spreadsheet || McSS.use().spreadsheet,
                    name       : config.name,
                })
            }
        }
    }

    /**
     * @static
     * @param   {
     *   spreadsheet?: Alias.Spreadsheet,
     *   name        : string,
     *   cols        : any[],
     *   records    ?: object[] | McRecord[]
     * } props
     * @returns { McTable }
     */
    static create ( props: {
        spreadsheet?: Alias.Spreadsheet,
        name        : string,
        cols        : any[],
        records    ?: object[] | McRecord[]
    } ): McTable {
        return Ddl.create( props )
    }

    /**
     * @public
     * @returns { string }
     */
    className (): string {
        return McTable.name
    }

    /**
     * @public
     * @returns { McTable }
     */
    fetch ( data?: any[][] ): McTable {
        const [ cols, ...records ] = this.data = ( data || this.values() )

        this.cols          = cols || []
        this.colsLength    = this.cols.length
        this.records       = records.map( data => McRecord.create( { cols, data } ) )
        this.recordsLength = this.records.length
        this.existsSheet   = this.sheet !== void 0
        this.existsCols    = this.colsLength > 0
        this.existsRecords = this.colsLength > 0 && this.recordsLength > 0
        this.firstRecord   = this.existsRecords ? this.records[ 0 ] : void 0
        this.lastRecord    = this.existsRecords ? this.records[ this.recordsLength - 1 ] : void 0

        return this
    }

    /**
     * @public
     * @returns {McTable}
     */
    Latest (): McTable {
        return this.savePoints[ this.latest ]
    }

    /**
     * @public
     * @param   { object } o
     * @returns {Record}
     */
    Record ( o ): McRecord {
        return McRecord.create( { cols: this.cols.slice(), ...o })
    }

    /**
     * @public
     * @returns { object[] }
     */
    hashes (): object[] {
        return this.map( record => record.hash() )
    }

    /**
     * @public
     * @returns { McTable }
     */
    trim (): McTable {
        const lastCol = this.lastCol()
        const lastRow = this.lastRow()
        const maxCol  = this.maxCol()
        const maxRow  = this.maxRow()

        lastCol !== maxCol && this.sheet.deleteColumns( lastCol + 1, maxCol - lastCol )
        lastRow !== maxRow && this.sheet.deleteRows   ( lastRow + 1, maxRow - lastRow )

        return this
    }

    /**
     * @returns { McTable }
     */
    lock (): McTable {
        this.writable = true
        return this
    }
}


interface McTable extends McSheet, Properties, Methods {}
applyMixins( McTable, [ Iterater, Dml, Ddl, Dcl ] )


export {
    McTable,
}