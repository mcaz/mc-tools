import { McTable }  from '..'
import { McSS }     from '../../mc_ss'
import { McRecord } from '../../mc_record'
import { Alias }    from '../../../config/alias'


interface Ddl extends McTable {}


/**
 * DDL( Data Definition )
 */
class Ddl {
    static create ( props: { spreadsheet?: Alias.Spreadsheet, name: string, cols: any[], records?: object[] | McRecord[] } ): McTable {
        const mcSS    = McSS.use( props.spreadsheet ? { spreadsheet: props.spreadsheet } : null )
        const mcTable = mcSS.insertTable( props.name )

        return mcTable.begin({
            /**
             * @param {McTable} table
             */
            handler( table: McTable ) {
                if ( table.existsCols || table.existsRecords ) {
                    throw new Error('Table already exists.')
                }

                table
                    .fetch( [ props.cols ] )
                    .insert( props.records )
                    .commit()
            },
            /**
             * @param { * } e
             */　
            exceptionHander( e: any ) {
                Logger.log( e )
            }
        })
    }
}


export {
    Ddl
}
