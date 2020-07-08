import { McTable } from '..'
import { TableConfig } from '../../../config/db'


interface Iterater extends McTable {}


class Iterater {

    /**
     * @public
     * @param { Function } fn
     */
    each ( fn: Function ): McTable {
        this.records.forEach( ( record, index, records ) => fn( record, index, records ) )
        return this
    }

    /**
     * @public
     * @param { Function } fn
     */
    map ( fn: Function ): any[] {
        return this.records.map( ( record, index, records ) => fn( record, index, records ) )
    }

    /**
     * @public
     * @param   { Function } fn
     * @param   { * }        previousValue
     * @returns { * }
     */
    reduce (fn: Function, previousValue: any): any {
        return this.records.reduce( ( previousValue, record, index, records )  =>
            fn( previousValue, record, index, records ), previousValue
        )
    }

    /**
     * @public
     * @param { Function } fn
     */
    some ( fn: Function ): boolean {
        return this.records.some( ( record, index, records ) => fn( record, index, records ) )
    }

    /**
     * @public
     * @param { Function } fn
     */
    filter ( fn: Function ): McTable {
        const records = this.records.filter( ( record, index, records ) =>
            fn( record, index, records )
        )

        if ( records.length === 0 ) {
            return this.discard()
        }

        return McTable.use({
            ...this,
            data: [ this.duplicateCols(), ...records ]
        })
    }

    /**
     * @public
     * @param { Function } fn
     */
    sort ( fn: Function ): McTable {
        if ( this.recordsLength === 0 ) {
            return this.discard()
        }

        return McTable.use({
            ...this,
            data: [ this.duplicateCols(), ...this.records.sort( ( a, b ) => fn( a, b ) ) ]
        })
    }
}

export {
    Iterater
}