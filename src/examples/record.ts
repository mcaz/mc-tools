import { McTable } from '../modules/mc_table'
import { McRecord } from '../modules/mc_record'


const users = McTable.use( { name: 'users' } )


const record1 = users.firstRecord               //=> [ 1, 'John', 'foo@_gmail.com', 1, 'USA' ] McRecordはArrayクラスを継承しているので、基本的な振る舞いはArrayクラスと同じ
record1.get( 'id' )                             //=> 1
record1.get( 'name' )                           //=> 'John'
record1.get( 'mail' )                           //=> 'foo@_gmail.com'
record1.get( 'auth_id' )                        //=> 1
record1.get( 'country_id' )                     //=> 'USA'

record1.set( 'id', 999 )                        //=> [ 999, 'John', 'john@_gmail.com',   1, 'USA' ]
record1.set( 'name', 'Smith' )                  //=> [ 999, 'Smith', 'john@gmail.com',   1, 'USA' ]
       .set( 'mail', 'smith@_gmail.com' )       //=> [ 999, 'Smith', 'smith@_gmail.com', 1, 'USA' ]
       .set( 'auth_id', 2 )                     //=> [ 999, 'Smith', 'smith@_gmail.com', 2, 'USA' ]
       .set( 'country_id', 'JPN' )              //=> [ 999, 'Smith', 'smith@_gmail.com', 2, 'JPN' ]
       .hash()                                  //=> { id: 999, name: 'Smith' , mail: 'smith@_gmail.com', auth_id: 2, country_id: 'JPN' }

const usersRecord = users.Record({              //=> [ 10, 'Hanako' ]
    data: {
        name: 'Hanako',
        age : 10
    }
})

usersRecord.hash()                              //=> { id: '', name: 'Hanako , mail: '', auth_id: '', country_id: '' }

const record2 = McRecord.create({
    cols: [ 'age', 'name' ],                    // McRecord.create()はstaticメソッド。カラム情報を持っていないので、引数で教えてやる必要がある
    data: {
        name: 'Pochi',                          // オブジェクトのキーの順番は何でもいい。インスタンス作成時にcolsの情報を見て順番を調整する。colsにないキーのデータは破棄される
        age : 1
    }
})                                              //=> [ 10,  'Pochi' ]
const depulicatedRecord = record2.depulicate()  //=> [ 10,  'Pochi' ]
const record3           = record2.create({      //=> [ 777, 'Miso' ]  record2.create()はmemberメソッド。すでにカラム情報保持しているので、データを渡すだけでいい
    name: 'Miso',
    age : 777
})

record2.hash()                                  //=> { age: 10, name: 'Pochi' }
depulicatedRecord.hash()                        //=> { age: 10, name: 'Pochi' }
record2.matched(depulicatedRecord.hash())       //=> true

record2.get( 'name' )                           //=> 'Pochi'
record2.get( 'age' )                            //=> 10
record2.hash()                                  //=> { age: 10, name: 'Pochi' }
record2.matched( { age: 10, name: 'Pochi' } )   //=> true
record2.matched( { name: 'Pochi' } )            //=> true
record2.matched( { name: 'Tama' } )             //=> false

record2.set( 'name', 'Tama' )                   //=> [ 10, 'Tama' ]
record2.set( 'age',  99 )                       //=> [ 99, 'Tama' ]

record2.get( 'name' )                           //=> 'Tama'
record2.get( 'age' )                            //=> 99
record2.hash()                                  //=> { age: 99, name: 'Tama' }
depulicatedRecord                               //=> [ 10, 'Pochi' ]

record2.matched( { age: 10, name: 'Pochi' } )   //=> false
record2.matched( { name: 'Pochi' } )            //=> false
record2.matched( { name: 'Tama' } )             //=> true

record2.hasCol( 'name' )                        //=> true
record2.hasCol( 'id' )                          //=> false

record2.namespace( 'pets' ).hash()           //=> { 'pets.age': 99, 'pets.name': 'Tama' }
depulicatedRecord.hash()                        //=> { age: 10, name: 'Pochi' }
depulicatedRecord.namespace( 'pets' ).hash() //=> { 'pets.age': 10, 'pets.name': 'Pochi' }


