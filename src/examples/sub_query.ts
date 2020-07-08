import { McTable } from '../modules/mc_table'


// テーブル取得
const users = McTable.use( { name: 'users' } )

let result


/* ---------------------------------------------------------------------------------------------------------------------
 * SELECT id, auth_id
 * FROM users
 * WHERE
 *   id IN(1, 2) AND
 *   name IN(
 *     SELECT DISTINCT name
 *     FROM users
 *     WHERE name IN('Taro', 'Jiro')
 *   )
--------------------------------------------------------------------------------------------------------------------- */

result = users.find({
  id  : [ 1, 2, 3 ],
  name: users.find( { name: [ 'John', 'Dick' ] }).distinctRows( [ 'name' ] )
})
.select([ 'name', 'auth_id' ])

Logger.log( result.hashes() )
// [
//   {auth_id=1.0, name=John},
//   {name=Dick, auth_id=1.0}
// ]


/* ---------------------------------------------------------------------------------------------------------------------
 * SELECT id, name, auth_id
 * FROM (
 *   SELECT * FROM users WHERE id IN(1,2,3)
 * )
 * WHERE
 *   id=1
--------------------------------------------------------------------------------------------------------------------- */

result = users.find({
  id: [ 1, 2, 3 ]
}).find({
  id: 1
}).select( [ 'id', 'name', 'auth_id' ] )

Logger.log( result.hashes() )
// [
//   {name=John, id=1.0, auth_id=1.0}
// ]


// ---------------------------------------------------------------------------------------------------------------------
// SELECT auth_id FROM (SELECT * FROM users WEHERE id NOT 1) WHERE id IN(1, 2, 3)
// ---------------------------------------------------------------------------------------------------------------------

result = users.find( { id: [ 1, 2, 3 ] } ).not( { id: 1 } ).select([ 'auth_id' ])

Logger.log( result.hashes() )
// [
//   {auth_id=1.0}, {auth_id=1.0}
// ]