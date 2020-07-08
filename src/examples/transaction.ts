import { McTable } from '../modules/mc_table'


const users           = McTable.use( { name: 'users' } )
const authorities     = McTable.use( { name: 'authorities' } )
const countries       = McTable.use( { name: 'countries' } )
const depulicateUsers = users.duplicate()


/**
 * @prop { McRecord } firstRecord
 */
const record  = users.firstRecord
const records = users.records



users.begin({
    // Set users.savepoints.
    // The savepoint is updated when the instance is created and when the begin function is executed or when the save function is executed
    // users.savepoints holds a duplicate instance of an object type
    // The latest version is recorded in users.latest in numeric type

    /**
     * @param { McTable } users
     */
    handler: users => {
        users.insert( record ).commit()
        users.insert( records ).commit()

        users
            .insert( record )          // insert McRecord
            .insert( records )         // insert McRecord array
            .insert( depulicateUsers ) // insert Mctable records
            .insert({                  // insert object
                id        : 999,
                name      : 'Smith',
                mail      : 'smith@_gmail.com',
                auth_id   : 2,
                country_id: 'JPN'
            })
            .commit()

        // throw new Error( 'Error occurrence!' )
        // It rolls back the data in the sheet using the instance that was saved in the savepoint when the error occurred.
    },

    /**
     * @param { any }     e Error object
     * @param { McTable } rollbacked
     */
    exceptionHander: ( e, rollbacked ) => {
        Logger.log( e )
    }
})


// セーブポイント作成

users.save()
authorities.save()
countries.save()

try {

    // テーブルを適当に更新

    users
        .insert( { id: 999, name: 'Smith' , mail: 'smith@_gmail.com', auth_id: 2, country_id: 'JPN' } )
        .commit()

    throw new Error( 'Error!' )

} catch ( e ) {

    // エラー時にまとめてロールバック

    users.rollback()
    authorities.rollback()
    countries.rollback()

    // こっちでもいい
    // users.savepointsは全バージョンのインスタンスを保持、
    // インスタンスのバージョンは0版から始まる数値で管理
    //
    // users.latestには最新バージョン番号で保持
    // users.rollbackに渡す数値でバージョンを指定
    // 何も渡していない場合はusers.latestが保持しているバージョンを使う
    // 0を指定した場合はインスタンス作成時の状態にシートを戻す
    //
    // users.rollback( users.latest )
    // authorities.rollback( authorities.latest )
    // countries.rollback( countries.latest )
}

