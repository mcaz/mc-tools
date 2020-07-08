import { McSheet }      from '.'
import { TargetRanges } from './interface'
import { Alias }        from '../../config/alias'



interface Data extends McSheet {}


class Data {

    /**TargetRanges
     * シートの全データを返す
     * @returns { *[][] }
     */
    values (): any[][] {
        const values = this.sheet.getDataRange().getValues()

        if ( values.length === 1 && !values[0].some( field => field !== '' ) ) {
            return [ [] ]
        }

        return values
    }

    /**
     * シートの全数式データを返す
     * @returns { *[][] }
     */
    formulas (): any[][] {
        return this.sheet.getDataRange().getFormulas()
    }

    /**
     * 入力範囲を返す
     * @param   { Alias.Range } entry
     * @param   { *[][] }       value s
     * @returns { TargetRanges }
     */
    TargetRanges ( entry: Alias.Range, values: any[][] ): TargetRanges {
        return {
            sRow: entry.getRow(),
            sCol: entry.getColumn(),
            eRow: values.length,
            eCol: values[ 0 ].length
        }
    }

    /**
     * 空白を含めないシートの行数を返す
     * @returns { number }
     */
    lastRow(): number {
        return this.sheet.getLastRow()
    }

    /**
     * 空白を含めないシートの列数を返す
     * @returns { number }
     */
    lastCol(): number {
        return this.sheet.getLastColumn()
    }

    /**
     * 空白を含めたシートの列数を返す
     * @returns { number }
     */
    maxRow(): number {
        return this.sheet.getMaxRows()
    }

    /**
     * 空白を含めたシートの列数を返す
     * @returns { number }
     */
    maxCol(): number {
        return this.sheet.getMaxColumns()
    }
}


export {
    Data
}