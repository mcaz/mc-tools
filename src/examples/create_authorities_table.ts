import { McTable } from '../modules/mc_table'


/**
 * authoritiesテーブル作成・レコード挿入
 * nameで指定した名前のシートが存在しないか、空のテーブルだった場合に作成する
 */


// 作成先スプレットシート
// McTable.create()の引数にspreadsheetを設定しない場合、実行したスクリプトに紐づくスプレットシートに作成される
// simpleTriggerからの実行など、権限の問題でSpreadsheetApp.getActiveSpreadsheet()を使用できない場合がある
// simpleTriggerの引数から取得できるspreadsheetを使用すれば回避できるのでそんなときに使う
// spreadsheetを使い回すとちょっとだけ軽い
// const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()


// テーブル名称を設定
// const name = authorities.name
const name = 'authorities'

// カラム設定
// const cols = authorities.cols
const cols = [
    'id',
    'auth',
]

// 挿入レコード
const records = [
  {
    id  : 1,
    auth: 'admin',
  },

  {
    id  : 2,
    auth: 'editor',
  },

  {
    id  : 3,
    auth: 'viewer',
  },
]


export function createAuthoritiesTable () {
  McTable.create({
    // spreadsheet,
    name,
    cols,
    records
  })
}
