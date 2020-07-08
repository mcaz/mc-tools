import { authorities } from '../../config/db'
import { McTable }     from '../../modules/mc_table'


const { Table, cols } = McTable.TableSet( authorities )


export {
    Table,
    cols
}
