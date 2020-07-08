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
//     {
//         "users.id"        : 1,
//         "users.name"      : "John",
//         "users.mail"      : "foo@_gmail.com",
//         "users.country_id": "USA",
//         "users.auth_id"   : 1,
//         "authorities.id"  : 1,
//         "authorities.auth": "admin",
//     },
//     {
//         "users.id"        : 2,
//         "users.name"      : "Dick",
//         "users.country_id": "USA",
//         "users.mail"      : "dick@_gmail.com",
//         "users.auth_id"   : 1,
//         "authorities.id"  : 1,
//         "authorities.auth": "admin",
//     },
//     {
//         "users.id"        : 3,
//         "users.name"      : "Emma",
//         "users.country_id": "USA",
//         "users.mail"      : "emma@gmail.com",
//         "users.auth_id"   : 1,
//         "authorities.id"  : 1,
//         "authorities.auth": "admin",
//     },
//     {
//         "users.id"        : 4,
//         "users.name"      : "James",
//         "users.mail"      : "james@_gmail.com",
//         "users.country_id": "USA",
//         "users.auth_id"   : 3,
//         "authorities.id"  : 3,
//         "authorities.auth": "viewer",
//     },
//     {
//         "users.id"        : 5,
//         "users.name"      : "pochi",
//         "users.mail"      : "foo@gmail.com",
//         "users.country_id": "JPN",
//         "users.auth_id"   : 3,
//         "authorities.id"  : 3,
//         "authorities.auth": "viewer",
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM authorities LEFT OUTER JOIN usesrs ON authorities.id=users.auth_id
// ---------------------------------------------------------------------------------------------------------------------
result = authorities.leftOuterJoin('id', users, 'auth_id')

Logger.log( result.hashes() )
// [
//     {
//         "users.id"        : 1,
//         "users.name"      : "John",
//         "users.country_id": "USA",
//         "users.mail"      : "foo@_gmail.com",
//         "users.auth_id"   : 1,
//         "authorities.id"  : 1,
//         "authorities.auth": "admin",
//     },
//     {
//         "users.id"        : 2,
//         "users.name"      : "Dick",
//         "users.mail"      : "dick@_gmail.com",
//         "users.country_id": "USA",
//         "users.auth_id"   : 1,
//         "authorities.id"  : 1,
//         "authorities.auth": "admin",
//     },
//     {
//         "users.id"        : 3,
//         "users.name"      : "Emma",
//         "users.mail"      : "emma@gmail.com",
//         "users.country_id": "USA",
//         "users.auth_id"   : 1,
//         "authorities.id"  : 1,
//         "authorities.auth": "admin",
//     },
//     {
//         "users.id"        : "",
//         "users.name"      : "",
//         "users.mail"      : "",
//         "users.country_id": "",
//         "users.auth_id"   : "",
//         "authorities.id"  : 2,
//         "authorities.auth": "editor",
//     },
//     {
//         "users.id"        : 4,
//         "users.name"      : "James",
//         "users.mail"      : "james@_gmail.com",
//         "users.country_id": "USA",
//         "users.auth_id"   : 3,
//         "authorities.id"  : 3,
//         "authorities.auth": "viewer",
//     },
//     {
//         "users.id"        : 5,
//         "users.name"      : "pochi",
//         "users.mail"      : "foo@gmail.com",
//         "authorities.auth": "viewer",
//         "users.auth_id"   : 3,
//         "authorities.id"  : 3,
//         "users.country_id": "JPN"
//     }
// ]
