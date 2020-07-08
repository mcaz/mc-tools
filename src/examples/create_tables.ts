import { McTable }                from '../modules/mc_table'
import { context as users }       from '../db/seeds/users'
import { context as authorities } from '../db/seeds/authorities'
import { context as countries }   from '../db/seeds/countries'



/**
 * 設定ファイルを利用したテーブル作成・データインポート
 *
 * users
 * countries
 * authorities
 */


// どっちも同じ
// const tables = [
//   createUsersTable,
//   createCountriesTable,
//   createAuthoritiesTable,
// ]


// export function createTables () {
//   return tables.map( createTable => createTable() )
// }




const contexts = [
  users,
  authorities,
  countries,
]

export function createTables () {
    return contexts.map( McTable.create )
}
