import { users }   from '../../config/db'
import { McTable } from '../../modules/mc_table'


const { Table, cols } = McTable.TableSet( users )


export {
    Table,
    cols
}
