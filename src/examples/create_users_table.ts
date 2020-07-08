import { McTable } from '../modules/mc_table'
import { users }   from '../config/db'



/**
 * usersテーブル作成・レコード挿入
 */


// 作成先スプレットシート
// McTable.create()の引数にspreadsheetを設定しない場合、実行したスクリプトに紐づくスプレットシートに作成される
// simpleTriggerからの実行など、権限の問題でSpreadsheetApp.getActiveSpreadsheet()を使用できない場合がある
// simpleTriggerの引数から取得できるspreadsheetを使用すれば回避できるのでそんなときに使う
// spreadsheetを使い回すとちょっとだけ軽い
// const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()


// テーブル名称を設定
// const name = users.name
const name = 'uers'

// カラム設定
// const cols = users.cols
const cols = [
    'id',
    'name',
    'mail',
    'auth_id',
    'country_id'
]

const defaultRecord = {
    auth_id   : 3,
    country_id: 'JPN'
}


// 挿入レコード
const records = [
    {
      id        : 1,
      name      : 'John',
      mail      : 'john@_gmail.com',
      auth_id   : 1,
      country_id: 'USA'
    },
    {
      id        : 2,
      name      : 'Taro',
      mail      : 'taro@_gmail.com',
      auth_id   : 2,
      country_id: 'JPN'
    },
    {
        ...defaultRecord,
      id        : 3,
      name      : 'Emma',
      mail      : 'emma@_gmail.com',
    },
    {
      ...users.defaultRecord,
      id        : 4,
      name      : 'Hanako',
      mail      : 'hanako@_gmail.com',
      auth_id   : 2,
    },
]



export function createUsersTable () {
    McTable.create({
      // spreadsheet,
      name,
      cols,
      records
    })
}
