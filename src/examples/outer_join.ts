import { McTable } from '../modules/mc_table'


// テーブル取得
const users       = McTable.use( { name: 'users'       } )
const authorities = McTable.use( { name: 'authorities' } )
const countries   = McTable.use( { name: 'countries'   } )

// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users LEFT OUTER JOIN authorities ON users.auth_id=authorities.id
// ---------------------------------------------------------------------------------------------------------------------

var result = users.leftOuterJoin('auth_id', authorities, 'id')

Logger.log( result.hashes() )
// [
//   {authorities.auth=admin, users.id=1.0, users.auth_id=1.0, users.mail=foo@_gmail.com, users.name=John, users.country_id=USA, authorities.id=1.0},
//   {users.country_id=USA, users.mail=dick@_gmail.com, authorities.id=1.0, users.name=Dick, users.id=2.0, authorities.auth=admin, users.auth_id=1.0},
//   {authorities.auth=admin, users.id=3.0, users.country_id=USA, users.name=Emma, authorities.id=1.0, users.mail=emma@gmail.com, users.auth_id=1.0},
//   {users.name=James, users.id=4.0, authorities.id=3.0, users.mail=james@_gmail.com, users.auth_id=3.0, authorities.auth=viewer, users.country_id=USA},
//   {users.mail=foo@gmail.com, users.country_id=JPN, users.auth_id=3.0, users.id=5.0, users.name=pochi, authorities.id=3.0, authorities.auth=viewer}
// ]

result = authorities.leftOuterJoin('id', users, 'auth_id')

Logger.log( result.hashes() )
// [
//   {users.country_id=USA, authorities.id=1.0, users.mail=foo@_gmail.com, authorities.auth=admin, users.auth_id=1.0, users.name=John, users.id=1.0},
//   {users.mail=dick@_gmail.com, users.country_id=USA, users.auth_id=1.0, users.name=Dick, authorities.auth=admin, authorities.id=1.0, users.id=2.0},
//   {users.mail=emma@gmail.com, users.auth_id=1.0, authorities.auth=admin, users.country_id=USA, authorities.id=1.0, users.id=3.0, users.name=Emma},
//   {users.mail=, users.id=, users.name=, authorities.id=2.0, authorities.auth=editor, users.country_id=, users.auth_id=},
//   {users.mail=james@_gmail.com, users.name=James, users.auth_id=3.0, users.country_id=USA, authorities.auth=viewer, authorities.id=3.0, users.id=4.0},
//   {users.mail=foo@gmail.com, authorities.id=3.0, users.name=pochi, users.id=5.0, users.auth_id=3.0, authorities.auth=viewer, users.country_id=JPN}
// ]