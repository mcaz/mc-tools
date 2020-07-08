export interface TableConfig {
    name          : string
    cols          : object
    defaultRecord?: object
}


// users table

const users = (() => {

    // table name

    const NAME = 'users'

    // columns

    const cols = {
        ID        : 'id',         // ID
        NAME      : 'name',       // ユーザー名
        MAIL      : 'mail',       // メールアドレス
        AUTH_ID   : 'auth_id',    // authorities.id
        COUNTRY_ID: 'country_id', // countries.id
    }

    // default record data

    const defaultRecord =  {
        [ cols.AUTH_ID ]   : 3,
        [ cols.COUNTRY_ID ]: 'JPN'
    }

    return {
        name: NAME,
        cols,
        defaultRecord,
    }
})()


// authorities table

const authorities = (() => {

    // table name

    const NAME = 'authorities'

    // columns

    const cols = {
        ID  : 'id',
        AUTH: 'auth',
    }

    return {
        name: NAME,
        cols,
    }
})()


// countries table

const countries = (() => {

    // table name

    const NAME = 'countries'

    // columns

    const cols = {
        ID     : 'id',
        NAME_JA: 'name_ja',
        NAME_EN: 'name_en',
    }

    return {
        name: NAME,
        cols,
    }
})()


export {
    users,
    authorities,
    countries,
}
