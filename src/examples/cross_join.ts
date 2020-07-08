import { McTable } from '../modules/mc_table'


// テーブル取得
const users       = McTable.use( { name: 'users'       } )
const authorities = McTable.use( { name: 'authorities' } )
const countries   = McTable.use( { name: 'countries'   } )

// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users CROSS JOIN authorities
// ---------------------------------------------------------------------------------------------------------------------

const result1 = users.crossJoin( authorities )

Logger.log( result1.hashes() )
// [
//   {authorities.id=1.0, users.mail=foo@_gmail.com, users.country_id=USA, authorities.auth=admin, users.auth_id=1.0, users.name=John, users.id=1.0},
//   {users.name=John, authorities.auth=editor, users.id=1.0, users.mail=foo@_gmail.com, authorities.id=2.0, users.country_id=USA, users.auth_id=1.0},
//   {users.mail=foo@_gmail.com, authorities.auth=viewer, users.country_id=USA, authorities.id=3.0, users.auth_id=1.0, users.id=1.0, users.name=John},
//   {authorities.auth=admin, users.auth_id=1.0, users.name=Dick, users.mail=dick@_gmail.com, users.country_id=USA, users.id=2.0, authorities.id=1.0},
//   {users.auth_id=1.0, users.mail=dick@_gmail.com, authorities.auth=editor, authorities.id=2.0, users.name=Dick, users.id=2.0, users.country_id=USA},
//   {users.country_id=USA, users.auth_id=1.0, authorities.id=3.0, authorities.auth=viewer, users.mail=dick@_gmail.com, users.name=Dick, users.id=2.0},
//   {users.auth_id=1.0, users.country_id=USA, authorities.id=1.0, authorities.auth=admin, users.mail=emma@gmail.com, users.name=Emma, users.id=3.0},
//   {users.country_id=USA, users.id=3.0, users.auth_id=1.0, users.name=Emma, users.mail=emma@gmail.com, authorities.auth=editor, authorities.id=2.0},
//   {users.mail=emma@gmail.com, authorities.auth=viewer, users.auth_id=1.0, users.country_id=USA, users.name=Emma, users.id=3.0, authorities.id=3.0},
//   {authorities.id=1.0, users.name=James, users.country_id=USA, users.mail=james@_gmail.com, users.id=4.0, users.auth_id=3.0, authorities.auth=admin},
//   {users.id=4.0, users.auth_id=3.0, users.name=James, authorities.id=2.0, users.mail=james@_gmail.com, authorities.auth=editor, users.country_id=USA},
//   {users.id=4.0, users.auth_id=3.0, authorities.id=3.0, users.mail=james@_gmail.com, users.name=James, users.country_id=USA, authorities.auth=viewer},
//   {users.id=5.0, authorities.auth=admin, users.country_id=JPN, authorities.id=1.0, users.auth_id=3.0, users.name=pochi, users.mail=foo@gmail.com},
//   {users.name=pochi, authorities.id=2.0, users.id=5.0, users.auth_id=3.0, users.mail=foo@gmail.com, authorities.auth=editor, users.country_id=JPN},
//   {users.id=5.0, users.mail=foo@gmail.com, users.country_id=JPN, users.name=pochi, users.auth_id=3.0, authorities.id=3.0, authorities.auth=viewer}
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users CROSS JOIN authorities WHERE users.id IN(1, 2) AND authorities.id=1
// ---------------------------------------------------------------------------------------------------------------------

const result2 = users.crossJoin( authorities ).find({
  'users.id'      : [ 1, 2 ],
  'authorities.id': 1,
})

Logger.log( result2.hashes() )

// [
//   {users.country_id=USA, users.auth_id=1.0, users.mail=foo@_gmail.com, users.name=John, users.id=1.0, authorities.auth=admin, authorities.id=1.0},
//   {users.country_id=USA, users.name=Dick, authorities.auth=admin, users.mail=dick@_gmail.com, authorities.id=1.0, users.auth_id=1.0, users.id=2.0}
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT users.name, authorities.auth FROM users CROSS JOIN authorities WHERE users.id IN(1, 2) AND authorities.id=1
// ---------------------------------------------------------------------------------------------------------------------

const result3 = users.crossJoin( authorities ).find({
  'users.id'      : [ 1, 2 ],
  'authorities.id': 1,
}).select([
  'users.name',
  'authorities.auth',
])

Logger.log( result3.hashes() )
// [
//   {users.name=John, authorities.auth=admin},
//   {authorities.auth=admin, users.name=Dick}
// ]



