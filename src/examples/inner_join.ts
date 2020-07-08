import { McTable } from '../modules/mc_table'


// テーブル取得
const users     = McTable.use( { name: 'users'       } )
const countries = McTable.use( { name: 'countries'   } )

// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users INNER JOIN countries ON users.country_id=countries.id
// ---------------------------------------------------------------------------------------------------------------------

const result = users.innerJoin( 'country_id', countries, 'id' )

Logger.log( result.hashes )
// [
//     {
//         "users.id"        : 1,
//         "users.auth_id"   : 1,
//         "users.name"      : "John",
//         "users.mail"      : "foo@_gmail.com",
//         "users.country_id": "USA",
//         "country.id"      : "USA",
//         "country.name_en" : "UNITED STATES",
//         "country.name_ja" : "アメリカ合衆国(米国)"
//     },
//     {
//         "users.id"        : 2,
//         "users.auth_id"   : 1,
//         "users.name"      : "Dick",
//         "users.mail"      : "dick@_gmail.com",
//         "users.country_id": "USA",
//         "country.id"      : "USA",
//         "country.name_en" : "UNITED STATES",
//         "country.name_ja" : "アメリカ合衆国(米国)",
//     },
//     {
//         "users.id"        : 3,
//         "users.auth_id"   : 1,
//         "users.name"      : "Emma",
//         "users.mail"      : "emma@gmail.com",
//         "users.country_id": "USA",
//         "country.id"      : "USA",
//         "country.name_en" : "UNITED STATES",
//         "country.name_ja" : "アメリカ合衆国(米国)",
//     },
//     {
//         "users.id"        : 4,
//         "users.auth_id"   : 3,
//         "users.name"      : "James",
//         "users.mail"      : "james@_gmail.com",
//         "country.id"      : "USA",
//         "users.country_id": "USA",
//         "country.name_en" : "UNITED STATES",
//         "country.name_ja" : "アメリカ合衆国(米国)",
//     },
//     {
//         "users.id"        : 5,
//         "users.name"      : "pochi",
//         "users.auth_id"   : 3,
//         "users.mail"      : "foo@gmail.com",
//         "users.country_id": "JPN",
//         "country.id"      : "JPN",
//         "country.name_en" : "JAPAN",
//         "country.name_ja" : "日本国",
//     }
// ]
