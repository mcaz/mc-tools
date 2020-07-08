import { McTable } from '../modules/mc_table'
import { McRecord } from '../modules/mc_record'
import { isString } from '../modules/utils/is'


const users = McTable.use( { name: 'users' } )
let record

// ---------------------------------------------------------------------------------------------------------------------
// デフォルトモード(strict=false)、バリデートを通らなかったデータは''で登録
// ---------------------------------------------------------------------------------------------------------------------

record = users.Record({
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    },
    validators: {
        // 条件に一致しない( falseを返す )データを弾く
        id        : McRecord.validators.number,
        name      : McRecord.validators.string,
        mail      : McRecord.validators.string,
        auth_id   : McRecord.validators.string, // 数値型の値に文字列用のバリデーションを設定
        country_id: McRecord.validators.string,
    }
})

Logger.log( record )
// [999.0, Smith, smith@_gmail.com, 2.0, JPN]

Logger.log( record.hash() )
// {name=Smith, country_id=JPN, mail=smith@_gmail.com, auth_id=, id=999.0}
// auth_id=には空白が設定される

Logger.log( record.get( 'mail' ) )
// "smith@_gmail.com"



// ---------------------------------------------------------------------------------------------------------------------
// strictモード(strict=true)、バリデートを通らなかったデータがある場合にエラーになる
// ---------------------------------------------------------------------------------------------------------------------

record = users.Record({
    strict: true,
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    },
    validators: {
        // 条件に一致しない( falseを返す )データを弾く
        // バリデーションが設定されていない場合はデータの検証をしない
        auth_id: McRecord.validators.string,
    }
})

// Error: Invalid Col [ auth_id ] Data [ 2 ]

record = users.Record({
    strict: true,
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    },
    validators: {
        // 条件に一致しない( falseを返す )データを弾く
        id        : McRecord.validators.number,
    }
})

// set()内でもバリデーションを行う
record.set( 'id', 'aaa' )
// Error: Invalid Col [ id ] Data [ aaa ]


record = McRecord.create({
    strict: true,
    cols: [ 'id', 'name', 'mail', 'auth_id', 'country_id' ],
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    },
    validators: {
        auth_id: McRecord.validators.string,
    }
})

// Error: Invalid Col [ auth_id ] Data [ 2 ]


// ---------------------------------------------------------------------------------------------------------------------
// 関数を介した作成
// ---------------------------------------------------------------------------------------------------------------------

function createUsersRecord ( data: object ): McRecord {
    const validators = {
        // 設定されていないデータは検査しない
        id  : McRecord.validators.number,
        name: McRecord.validators.string,
        mail: McRecord.validators.string,
    }

    return users.Record( { data, validators } )
}

record = createUsersRecord({
    id        : 999,
    name      : 'Smith' ,
    mail      : 'smith@_gmail.com',
    auth_id   : 2,
    country_id: 'JPN'
})


// ---------------------------------------------------------------------------------------------------------------------
// バリデータ自作
// ---------------------------------------------------------------------------------------------------------------------

// バリデーション用関数
function validateMail ( v: any ) {
    return isString( v ) && /.*@_gmail/.test( v )
}

// バリデーション関数を登録
McRecord.setValidator( 'validateName', v => {
    return isString(v)
})


record = users.Record({
    data: {
        id        : 999,
        name      : 'Smith' ,
        mail      : 'smith@_gmail.com',
        auth_id   : 2,
        country_id: 'JPN'
    },
    validator: {
        /**
         * 条件に一致しない( falseを返す )データを弾く
         * @validator
         * @param   { * } v
         * @returns { boolean }
         */
        mail   : validateMail,
        auth_id: v => v === 1 || v === 2 || v === 3,
        name   : McRecord.validators.validateName
    }
})
