import { users as table } from '../../config/db'
import { McRecord }       from '../../modules/mc_record'
import { values }         from '../../modules/utils/object'

// テーブル名
const name: string = table.name

// カラム名
const cols: string[] = values(table.cols)

// レコードデータ
// 1オブジェクト1レコード
// Key名がcolsに存在しない場合はvalue値を無視する
const records: object[] | McRecord[] = [
  {
    id        : 1,
    name      : 'John',
    mail      : 'foo@_gmail.com',
    auth_id   : 1,
    country_id: 'USA'
  },
  {
    [ table.cols.ID ]        : 2,
    [ table.cols.NAME ]      : 'Dick',
    [ table.cols.MAIL ]      : 'dick@_gmail.com',
    [ table.cols.AUTH_ID ]   : 1,
    [ table.cols.COUNTRY_ID ]: 'USA',
  },
  McRecord.create({
    cols,
    data: {
      [ table.cols.ID ]        : 3,
      [ table.cols.NAME ]      : 'Emma',
      [ table.cols.MAIL ]      : 'emma@gmail.com',
      [ table.cols.AUTH_ID ]   : 1,
      [ table.cols.COUNTRY_ID ]: 'USA',
    }
  }),

  McRecord.create({ cols, data: {} })
    .set(table.cols.ID,         4)
    .set(table.cols.NAME,       'James')
    .set(table.cols.MAIL,       'james@_gmail.com')
    .set(table.cols.AUTH_ID,    3)
    .set(table.cols.COUNTRY_ID, 'USA'),
  {
    ...table.defaultRecord,
    [ table.cols.ID ]  : 5,
    [ table.cols.NAME ]: 'pochi',
    [ table.cols.MAIL ]: 'foo@gmail.com',
  }
]

export const context = {
  name,
  cols,
  records
}
