import { McTable } from '../modules/mc_table'
import { McRecord } from '../modules/mc_record'
import { isString, isNumber } from '../modules/utils/is'




const users = McTable.use( { name: 'users' } )


// ---------------------------------------------------------------------------------------------------------------------
// レコード更新
// ---------------------------------------------------------------------------------------------------------------------

users.begin({
    handler: users => {
        users
            // idが1のレコードのnameをPochiに更新
            .each(record => {
                if ( record.get( 'id' ) === 1 ) record.set( 'name', 'Pochi' )
            })
            // シートへ反映
            .commit()
    },

    exceptionHander: ( e ) => {
        // エラー時にuser.begin()実行時点へシートをロールバック
        Logger.log( e )
    }
})


// ---------------------------------------------------------------------------------------------------------------------
// レコード削除
// ---------------------------------------------------------------------------------------------------------------------

users.begin({
    handler: users => {
        users
            // id=100をインスタンスから削除
            .filter(record => {
                return !(record.get( 'id' ) === 100)
            })
            // シートへ反映
            .commit()
    },

    exceptionHander: ( e ) => {
        // エラー時にuser.begin()実行時点へシートをロールバック
        Logger.log( e )
    }
})


// ---------------------------------------------------------------------------------------------------------------------
// レコード追加
// ---------------------------------------------------------------------------------------------------------------------

// usersが保持しているcolsのデータを使ってレコードを作成
const record1 = users.Record({
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    }
})

// 自分でcolsを設定してレコードを作成
const record2 = McRecord.create({
    cols: [ 'id', 'name', 'mail', 'auth_id', 'country_id' ],
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    }
})

// レコード作成時にバリデーションをする
McRecord.setValidator( 'authIdValidator', function ( v ) {
    return isNumber( v )
} )

const record3 = users.Record({
    strict: true,
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    },
    valitators: {
        id        : McRecord.validators.number,
        name      : McRecord.validators.string,
        mail      : mail => isString( mail ) && /.*@_gmail/.test( mail ),
        auth_id   : McRecord.validators.authIdValidator,
        country_id: McRecord.validators.string
    }
})


const records = [
    record1,
    record2,
    record3,
]

users.begin({
    handler ( users: McTable ) {
        users
            // レコードを一件インサート
            .insert(record1)
            // レコードを一件インサート
            .insert(record2)
            // 複数レコードをインサート
            .insert(records)
            // テーブルのレコードを纏めてインサート
            .insert(users)
            // nameがPochiのレコードを更新
            .each(record => {
                const name = record.get( 'name' )

                if ( name === 'Pochi' ) {
                    record.set( 'name', 'Tama' )
                }
            })
            // シートへ反映
            .commit()
    },

    exceptionHander ( e: any, rollbackedTable: McTable ) {
        // エラー時にuser.begin()実行時点へシートをロールバック　
        Logger.log( e )
    }
})
