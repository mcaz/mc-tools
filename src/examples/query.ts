import { McTable } from '../modules/mc_table'


// テーブル取得
const users       = McTable.use( { name: 'users' } )
const authorities = McTable.use( { name: 'authorities' } )
const countries   = McTable.use( { name: 'countries' } )

// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users WHERE id=1
// ---------------------------------------------------------------------------------------------------------------------

users.find( { id: 1 } )
// foundUsers.data          //=> [ [ 1, 'John', 'john@_gmail.com', 1, 'USA' ] ]
// foundUsers.cols          //=> [ 'id', 'name', 'mail', 'auth_id', 'country_id' ]
// foundUsers.colsLength    //=> 1
// foundUsers.existsSheet   //=> true
// foundUsers.existsCols    //=> true
// foundUsers.existsRecords //=> true
// foundUsers.records       //=> [ { McRecord } ]
// foundUsers.recordsLength //=> 1
// foundUsers.firstRecord   //=> { McRecord }
// foundUsers.lastRecord    //=> { McRecord }
// foundUsers.mcSS          //=> { McSS }
// foundUsers.mcSheet       //=> { McSheet }
// foundUsers.savepoints    //=> { McSheet }
// foundUsers.latest        //=> { McSheet }


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users WHERE id=2 or id=3
// ---------------------------------------------------------------------------------------------------------------------

users.find({ id: [ 2, 3 ] })
// foundUsers.data          //=> [ [ 1, 'John', 'john@_gmail.com', 1, 'USA' ], [ 2, 'John', 'John@_gmail.com', 2, 'JPN' ] ]
// foundUsers.cols          //=> [ 'id', 'name', 'mail', 'auth_id', 'country_id' ]
// foundUsers.colsLength    //=> 2
// foundUsers.existsSheet   //=> true
// foundUsers.existsCols    //=> true
// foundUsers.existsRecords //=> true
// foundUsers.records       //=> [ { McRecord }, { McRecord } ]
// foundUsers.recordsLength //=> 2
// foundUsers.firstRecord   //=> { McRecord }
// foundUsers.lastRecord    //=> { McRecord }
// foundUsers.mcSS          //=> { McSS }
// foundUsers.mcSheet       //=> { McSheet }
// foundUsers.savepoints    //=> { McSheet }
// foundUsers.latest        //=> { McSheet }


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users WHERE id=1 OR id=2
// ---------------------------------------------------------------------------------------------------------------------

var result: any = users.find( { id: [ 1, 2 ] } )

Logger.log( result.hashes() )
// [
//     {
//         id=1.0,
//         mail=foo@_gmail.com,
//         country_id=USA
//         name=John,
//         auth_id=1.0,
//     },
//     {
//         id=2.0,
//         name=Dick,
//         mail=dick@_gmail.com
//         country_id=USA,
//         auth_id=1.0,
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users WHERE id IN(1, 2) AND name="John"
// ---------------------------------------------------------------------------------------------------------------------

result = users.find( { id: [ 1, 2 ], name: 'John' } )

Logger.log( result.hashes() )
// [
//     {
//         id=1.0,
//         name=John,
//         mail=foo@_gmail.com,
//         country_id=USA,
//         auth_id=1.0
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT id, name FROM users WHERE id IN(1, 2) AND name="John"
// ---------------------------------------------------------------------------------------------------------------------

result = users
    .find( { id: [ 1, 2 ], name: 'John' } )
    .select( [ 'id', 'name' ] )

Logger.log( result.hashes() )
// [
//     {
//         name=John,
//         id=1.0
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT DISTINCT name FROM users WHERE name IN('John', 'Dick')
// ---------------------------------------------------------------------------------------------------------------------

result = users.rows( 'name' )

Logger.log(result)
// [John, Dick, Emma, James, pochi]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT DISTINCT name FROM users WHERE name IN('John', 'Dick')
// ---------------------------------------------------------------------------------------------------------------------

result = users.find( { name: [ 'John', 'Dick' ] } ).distinctRows( 'name' )

Logger.log(result)
// [John, Dick]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT MAX(id) FROM users WHERE name IN('John', 'Dick')
// ---------------------------------------------------------------------------------------------------------------------

result = users.find( { name: [ 'John', 'Dick' ] } ).max( 'id' )

Logger.log(result)
// 2


// ---------------------------------------------------------------------------------------------------------------------
// SELECT MAX(id) FROM users
// ---------------------------------------------------------------------------------------------------------------------

result = users.max( 'id' )

Logger.log(result)
//  5


// ---------------------------------------------------------------------------------------------------------------------
// SELECT MIN(id) FROM users
// ---------------------------------------------------------------------------------------------------------------------

result = users.max( 'id' )

Logger.log(result)
//  1


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users WHERE name NOT 'Dick'
// ---------------------------------------------------------------------------------------------------------------------

result = users.not( { name: 'Dick' } )

Logger.log( result.hashes() )
// [
//     {
//         id=1.0
//         name=John,
//         country_id=USA,
//         mail=foo@_gmail.com,
//         auth_id=1.0,
//     },
//     {
//         id=3.0,
//         name=Emma
//         mail=emma@gmail.com,
//         country_id=USA,
//         auth_id=1.0,
//     },
//     {
//         id=4.0,
//         name=James,
//         mail=james@_gmail.com,
//         country_id=USA,
//         auth_id=3.0
//     },
//     {
//         id=5.0,
//         name=pochi,
//         mail=foo@gmail.com,
//         country_id=JPN,
//         auth_id=3.0
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users WHERE name NOT IN('Dick', 'John')
// ---------------------------------------------------------------------------------------------------------------------

result = users.not( { name: [ 'Dick', 'John' ] } )

Logger.log( result.hashes() )
// [
//     {
//         id=3.0,
//         name=Emma,
//         country_id=USA,
//         mail=emma@gmail.com
//         auth_id=1.0,
//     },
//     {
//         id=4.0
//         name=James,
//         mail=james@_gmail.com,
//         country_id=USA,
//         auth_id=3.0,
//     },
//     {
//         id=5.0,
//         name=pochi,
//         mail=foo@gmail.com,
//         country_id=JPN
//         auth_id=3.0,
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users WHERE name NOT 'Dick' AND NOT id=1
// ---------------------------------------------------------------------------------------------------------------------

result = users.not( { name: 'Dick', id: 1 } )

Logger.log( result.hashes() )
// [
//     {
//         id=1.0,
//         name=John,
//         country_id=USA,
//         mail=foo@_gmail.com
//         auth_id=1.0,
//     },
//     {
//         id=2.0,
//         name=Dick
//         mail=dick@_gmail.com,
//         country_id=USA,
//         auth_id=1.0,
//     },
//     {
//         id=3.0
//         name=Emma,
//         country_id=USA,
//         mail=emma@gmail.com,
//         auth_id=1.0,
//     },
//     {
//         id=4.0,
//         name=James,
//         country_id=USA,
//         mail=james@_gmail.com,
//         auth_id=3.0
//     },
//     {
//         id=5.0,
//         name=pochi,
//         country_id=JPN,
//         mail=foo@gmail.com
//         auth_id=3.0,
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT auth_id FROM (SELECT * FROM users WEHERE id NOT 1) WHERE id IN(1, 2, 3)
// ---------------------------------------------------------------------------------------------------------------------

result = users.find( { id: [ 1, 2, 3, 4 ] } ).not( { id: 1 } ).select( [ 'auth_id' ] )

Logger.log( result.hashes() )
// [
//     {
//         auth_id=1.0
//     },
//     {
//         auth_id=1.0
//     },
//     {
//         auth_id=3.0
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users ORDER BY id ASC
// ---------------------------------------------------------------------------------------------------------------------

result = users.orderByAsc( 'id' )

Logger.log( result.hashes() )
// [
//     {
//         id=1.0,
//         name=John,
//         country_id=USA,
//         mail=foo@_gmail.com,
//         auth_id=1.0
//     },
//     {
//         id=2.0,
//         name=Dick
//         country_id=USA,
//         mail=dick@_gmail.com,
//         auth_id=1.0,
//     },
//     {
//         id=3.0
//         name=Emma,
//         country_id=USA,
//         mail=emma@gmail.com,
//         auth_id=1.0,
//     },
//     {
//         id=4.0,
//         name=James,
//         country_id=USA,
//         mail=james@_gmail.com
//         auth_id=3.0,
//     },
//     {
//         id=5.0
//         name=pochi,
//         country_id=JPN,
//         mail=foo@gmail.com,
//         auth_id=3.0,
//     }
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT * FROM users ORDER BY id DESC
// ---------------------------------------------------------------------------------------------------------------------

result = users.orderByDesc( 'id' )

Logger.log( result.hashes() )
// [
//     {
//         id=5.0,
//         name=pochi,
//         mail=foo@gmail.com,
//         country_id=JPN
//         auth_id=3.0,
//     },
//     {
//         id=4.0,
//         name=James,
//         mail=james@_gmail.com,
//         country_id=USA
//         auth_id=3.0,
//     },
//     {
//         id=3.0,
//         name=Emma,
//         country_id=USA,
//         mail=emma@gmail.com
//         auth_id=1.0,
//     },
//     {
//         id=2.0,
//         name=Dick,
//         country_id=USA,
//         mail=dick@_gmail.com,
//         auth_id=1.0
//     },
//     {
//         id=1.0,
//         name=John
//         country_id=USA,
//         mail=foo@_gmail.com,
//         auth_id=1.0,
//     }
// ]
