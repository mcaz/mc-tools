import { Table as Users,       cols as usersCols }       from './../db/tables/users'
import { Table as Countries,   cols as countriesCols }   from './../db/tables/countries'
import { Table as Authorities, cols as authoritiesCols } from './../db/tables/authorities'
import { McTable } from '../modules/mc_table'
import { McRecord } from '../modules/mc_record'


const users       = McTable.use( { name: 'users' } )
const authorities = McTable.use( { name: 'authorities' } )
const countries   = McTable.use( { name: 'countries' } )


/**
 * SELECT *
 * FROM (SELECT * FROM users INNER JOIN countries ON users.country=countries.id)
 * INNER JOIN authorities ON users.auth_id=authorities.id
 */
const result = users
.innerJoin(
  usersCols.COUNTRY_ID,
  countries,
  countriesCols.ID
).innerJoin(
    users.name + McRecord.NAMESPACE_SPLICER + usersCols.AUTH_ID,
  authorities,
  authoritiesCols.AUTH_ID,
)

const record = result.firstRecord

// テーブルの結合（innerJoin / leftOuterJoin / rightOuterJoin / crossJoin)を実行するとカラム情報に'テーブル名.'が追加される
// データを取り出す場合は'テーブル名.カラム名'を引数に渡す
record.get(users.name + McRecord.NAMESPACE_SPLICER + usersCols.ID)            //=> 1
record.get(users.name + McRecord.NAMESPACE_SPLICER + countriesCols.ID)        //=> 'USA'
record.set(users.name + McRecord.NAMESPACE_SPLICER + usersCols.ID,     100)
record.set(users.name + McRecord.NAMESPACE_SPLICER + countriesCols.ID, 'JPN')
record.get(users.name + McRecord.NAMESPACE_SPLICER + usersCols.ID)            //=> 100
record.get(users.name + McRecord.NAMESPACE_SPLICER + countriesCols.ID)        //=> 'JPN'

// 予めテーブル名(namespace)をセットするとカラム名だけで取得できる
record.setNamespace(users.name)
record.get(usersCols.ID)                                                      //=> 100
record.set(usersCols.ID, 200)
record.get(usersCols.ID)                                                      //=> 200

// namespaceをセットした状態では'テーブル名.カラム名'では取得できない
record.get(users.name + McRecord.NAMESPACE_SPLICER + usersCols.ID)            //=> Error
record.get(users.name + McRecord.NAMESPACE_SPLICER + countriesCols.ID)        //=> Error

// namespaceをリセットするとsetNamespac()を実行する前の状態に戻る
// 'テーブル名.カラム名'で取得できる
record.resetNamespace()
record.get(users.name + McRecord.NAMESPACE_SPLICER + usersCols.ID)            //=> 200
record.get(users.name + McRecord.NAMESPACE_SPLICER + countriesCols.ID)        //=> 'JPN'

// メソッドは連結して使える
record.setNamespace(countries.name)
    .set(countriesCols.ID, 300)
    .get(countriesCols.ID)                                                    //=> 300

record.setNamespace(countries.name)
    .set(countriesCols.ID, 300)
    .resetNamespace()
    .set(users.name + McRecord.NAMESPACE_SPLICER + usersCols.ID, 400)
    .get(users.name + McRecord.NAMESPACE_SPLICER + usersCols.ID)              //=> 400