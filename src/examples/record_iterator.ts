import { McTable } from '../modules/mc_table'
import { McRecord } from '../modules/mc_record'




const users = McTable.use( { name: 'users' } )


// Iteraters
users.each  ( ( record, index, records ) => {} ) //=> McTable
users.filter( ( record, index, records ) => {} ) //=> McTable
users.sort  ( ( a, b ) => {} )                   //=> McTable
users.some  ( ( record, index, records ) => {} ) //=> boolean
users.map   ( ( record, index, records ) => {} ) //=> any[]
users.reduce( ( previousValue, record, index, records ) => {}, {} /** [], '', 1, users //=> previousValue { any } */ ) //=> any(previousValue)


