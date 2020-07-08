import { McTable } from '../modules/mc_table'


// テーブル取得
const users       = McTable.use( { name: 'users'       } )
const authorities = McTable.use( { name: 'authorities' } )

// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users CROSS JOIN authorities
// ---------------------------------------------------------------------------------------------------------------------

const result1 = users.crossJoin( authorities )

Logger.log( result1.hashes() )
// [
//   {
//     "users.id"        : 1,
//     "users.name"      : "John",
//     "users.country_id": "USA",
//     "users.mail"      : "foo@_gmail.com",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 1,
//     "authorities.auth": "admin",
//   },
//   {
//     "users.id"        : 1,
//     "users.name"      : "John",
//     "users.country_id": "USA",
//     "users.mail"      : "foo@_gmail.com",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 2,
//     "authorities.auth": "editor",
//   },
//   {
//     "users.id"        : 1,
//     "users.name"      : "John",
//     "users.mail"      : "foo@_gmail.com",
//     "users.country_id": "USA",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 3,
//     "authorities.auth": "viewer",
//   },
//   {
//     "users.id"        : 2,
//     "users.name"      : "Dick",
//     "users.mail"      : "dick@_gmail.com",
//     "users.country_id": "USA",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 1,
//     "authorities.auth": "admin",
//   },
//   {
//     "users.id"        : 2,
//     "users.name"      : "Dick",
//     "users.mail"      : "dick@_gmail.com",
//     "users.country_id": "USA",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 2,
//     "authorities.auth": "editor",
//   },
//   {
//     "users.id"        : 2,
//     "users.name"      : "Dick",
//     "users.country_id": "USA",
//     "users.mail"      : "dick@_gmail.com",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 3,
//     "authorities.auth": "viewer",
//   },
//   {
//     "users.id"        : 3,
//     "users.name"      : "Emma",
//     "users.country_id": "USA",
//     "users.mail"      : "emma@gmail.com",
//     "authorities.auth": "admin",
//     "authorities.id"  : 1,
//     "users.auth_id"   : 1,
//   },
//   {
//     "users.id"        : 3,
//     "users.name"      : "Emma",
//     "users.country_id": "USA",
//     "users.mail"      : "emma@gmail.com",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 2,
//     "authorities.auth": "editor",
//   },
//   {
//     "users.id"        : 3,
//     "users.name"      : "Emma",
//     "users.mail"      : "emma@gmail.com",
//     "users.country_id": "USA",
//     "users.auth_id"   : 1,
//     "authorities.i": 3,
//     "authorities.auth": "viewer",
//   },
//   {
//     "users.id"        : 4,
//     "users.name"      : "James",
//     "users.country_id": "USA",
//     "users.mail"      : "james@_gmail.com",
//     "users.auth_id"   : 3,
//     "authorities.id"  : 1,
//     "authorities.auth": "admin"
//   },
//   {
//     "users.id"        : 4,
//     "users.name"      : "James",
//     "users.country_id": "USA",
//     "users.mail"      : "james@_gmail.com",
//     "users.auth_id"   : 3,
//     "authorities.id"  : 2,
//     "authorities.auth": "editor",
//   },
//   {
//     "users.id"        : 4,
//     "users.name"      : "James",
//     "users.mail"      : "james@_gmail.com",
//     "users.country_id": "USA",
//     "users.auth_id"   : 3,
//     "authorities.id"  : 3,
//     "authorities.auth": "viewer"
//   },
//   {
//     "users.id"        : 5,
//     "users.name"      : "pochi",
//     "users.country_id": "JPN",
//     "users.mail"      : "foo@gmail.com",
//     "users.auth_id"   : 3,
//     "authorities.id"  : 1,
//     "authorities.auth": "admin",
//   },
//   {
//     "users.id"        : 5,
//     "users.name"      : "pochi",
//     "users.country_id": "JPN",
//     "users.mail"      : "foo@gmail.com",
//     "users.auth_id"   : 3,
//     "authorities.id"  : 2,
//     "authorities.auth": "editor",
//   },
//   {
//     "users.id"        : 5,
//     "users.name"      : "pochi",
//     "users.mail"      : "foo@gmail.com",
//     "users.country_id": "JPN",
//     "users.auth_id"   : 3,
//     "authorities.id"  : 3,
//     "authorities.auth": "viewer"
//   }
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
//   {
//     "users.id"        : 1,
//     "users.name"      : "John",
//     "users.country_id": "USA",
//     "users.mail"      : "foo@_gmail.com",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 1,
//     "authorities.auth": "admin",
//   },
//   {
//     "users.id"        : 2,
//     "users.name"      : "Dick",
//     "users.country_id": "USA",
//     "users.mail"      : "dick@_gmail.com",
//     "users.auth_id"   : 1,
//     "authorities.id"  : 1,
//     "authorities.auth": "admin",
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
//   {
//     "users.name"      : "John",
//     "authorities.auth": "admin"
//   },
//   {
//     "authorities.auth": "admin",
//     "users.name"      : "Dick"
//   }
// ]
