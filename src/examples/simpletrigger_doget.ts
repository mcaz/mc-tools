import { McTable } from '../modules/mc_table'



declare var global: any;

const users       = McTable.use( { name: 'users' } )
const authorities = McTable.use( { name: 'authorities' } )
const countries   = McTable.use( { name: 'countries' } )


global.doGet = function ( e ) {
    const id = +e.parameter.id

    const resultTable = users
        // usersとauthoritiesをusersのauth_idとauthoritiesのidをキーに外部結合
        .leftOuterJoin( 'auth_id',          authorities, 'id' )
        // 内部結合したテーブルとcountriesをusers.country_idとcountriesのidをもとに外部結合
        .leftOuterJoin( 'users.country_id', countries,   'id' )
        // 結合されたテーブルからusersのidをキーにレコード検索
        .find( { 'users.id': id } )
        // 抽出カラム選択
        .select( [
            'users.id',
            'users.name',
            'countries.id',
            'countries.name_ja',
            'authorities.auth'
        ] )

    resultTable.each(record => {
        const countryId = record.get( 'countries.id' )

        if ( countryId === 'USA' ) {
            // 国籍変更
            record
                .set( 'countries.id', 'JPN' )
                .set( 'countries.name_ja', 'ジパング' )
        }

        const auth = record
            // いちいちauthorities.authと入力するのが面倒なのでネームスペースを設定
            .setNamespace( 'authorities' )
            // authorities.authのデータを取得
            .get( 'auth' )

        // authorities.authが'admin'の場合にレコードを上書き
        if ( auth === 'admin' ) {
            record.set( 'auth', '管理者' )
        }

        const mail = record
            // ネームスペースをリセット
            .resetNamespace()
            .get( 'users.mail' )

        // メールダドレスの登録がなければ変わりのアドレスを設定
        if ( mail === '' ) {
            record.set( 'users.mail', 'sample@_gmail.com' )
        }
    })

    const result = JSON.stringify({
        data: resultTable.hashes()
    })

    return ContentService.createTextOutput( result );
}
