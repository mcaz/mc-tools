import { McTable } from '../modules/mc_table'


// テーブル取得
const users       = McTable.use( { name: 'users'       } )
const countries   = McTable.use( { name: 'countries'   } )

// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users INNER JOIN countries ON users.country_id=countries.id
// ---------------------------------------------------------------------------------------------------------------------

const result = users.innerJoin( 'country_id', countries, 'id' )

Logger.log( result.hashes )
// [
//   {users.mail=foo@_gmail.com, country.name_en=UNITED STATES, users.name=John, users.auth_id=1.0, users.country_id=USA, users.id=1.0, country.id=USA, country.name_ja=アメリカ合衆国(米国)},
//   {users.name=Dick, users.mail=dick@_gmail.com, country.name_ja=アメリカ合衆国(米国), users.id=2.0, country.id=USA, country.name_en=UNITED STATES, users.auth_id=1.0, users.country_id=USA},
//   {country.id=USA, users.id=3.0, users.country_id=USA, users.auth_id=1.0, country.name_ja=アメリカ合衆国(米国), country.name_en=UNITED STATES, users.name=Emma, users.mail=emma@gmail.com},
//   {users.mail=james@_gmail.com, country.name_ja=アメリカ合衆国(米国), users.id=4.0, country.id=USA, users.name=James, users.country_id=USA, users.auth_id=3.0, country.name_en=UNITED STATES},
//   {users.country_id=JPN, country.name_en=JAPAN, users.auth_id=3.0, users.id=5.0, users.mail=foo@gmail.com, users.name=pochi, country.name_ja=日本国, country.id=JPN}
// ]
