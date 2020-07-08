import { McTable }  from '..'
import { fill }     from '../../utils/array'
import { McRecord } from '../../mc_record'


interface Dcl extends McTable {}


/**
 * DCL( Data Control )
 */
class Dcl {
    /**
     * @public
     * @param   { number } savePoint
     * @returns { McTable }
     */
    save ( savePoint?: number ): McTable {
        this.savePoints = { ...this.savePoints, [ savePoint || ++this.latest ]: this.duplicate() }
        return this
    }

    /**
     * トランザクション処理
     * @public
     * @returns { McTable }
     */
    begin ( props: { handler: Function, exceptionHander: Function } ): McTable {
        this.save()

        if ( !props ) {
            return this
        }

        try {
            props.handler && props.handler( this )
        } catch ( e ) {
            const rollbacked = this.rollback()
            props.exceptionHander && props.exceptionHander( e, rollbacked )

            return rollbacked
        }

        return this
    }

    /**
     * シートへデータ反映
     * @public
     * @returns { McTable }
     */
    commit (): McTable {
        if ( this.writable ) {
            return this
        }

        const sheetValues  = this.values()
        const recordLength = Math.max( this.data.length, sheetValues.length )
        const colsLength   = Math.max( this.cols.length,  sheetValues[0].length )
        const emptyRecord  = fill( colsLength, McRecord.BLANK_DATA )
        const emptyRecords = fill( recordLength, emptyRecord )
        const records      = emptyRecords.map( ( record, index ) => this.data[ index ] || record )

        const {
            sRow,
            sCol,
            eRow,
            eCol
        } = this.TargetRanges(
            this.entryRange,
            records
        )

        this.sheet.getRange(
            sRow,
            sCol,
            eRow,
            eCol
        ).setValues(
            records
        )

        this.mcSS.flush()

        return this.fetch( this.data ).trim()
    }

    /**
     * @public
     * @returns { McTable }
     * @param   { * } savePoint
     */
    rollback ( savePoint?: any ): McTable {
        const point = savePoint || this.latest

        return this.savePoints[ point ]
            ? this.fetch( this.savePoints[ point ].data ).commit()
            : this
    }
}


export {
    Dcl
}
