import { countries } from '../../config/db'
import { McTable }   from '../../modules/mc_table'


const { Table, cols } = McTable.TableSet( countries )


export {
    Table,
    cols
}
