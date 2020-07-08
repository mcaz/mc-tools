// import { Table as Users,       cols as usersCols }       from './../db/tables/users'
// import { Table as Covid19,     cols as covid19Cols }     from './../db/tables/covid19'
// import { Table as Countries,   cols as countriesCols }   from './../db/tables/countries'
// import { Table as Authorities, cols as authoritiesCols } from './../db/tables/authorities'

// import { grow } from './../db/grow';
// import { McRecord } from './../modules/mc_record'
// import { McTable } from './../modules/mc_table';


// declare var global: any;


// global.doGet = e => {
//   ContentService.createTextOutput()

//   const covid19 = Covid19()
//   const result  = covid19.find({
//     [ covid19Cols.STATUS ]: '退院'
//   })
//   const json    = result.map( record => record.hash() )
//   const payload = JSON.stringify( json )
//   const output  = ContentService.createTextOutput()

//   output.setMimeType( ContentService.MimeType.JSON )
//   output.setContent( payload )

//   return output
// }

// global.testCovid19 = function () {
//   const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
//   const covid19     = Covid19( spreadsheet )
//   const result      = covid19.find({
//     [ covid19Cols.STATUS ]: '退院または死亡'
//   }).distinct()

//   var a = 1
// }

// global.testUsers = function () {
//   const users  = Users()
  // const record = users.Record({
  //   data: {
  //     [ usersCols.ID ]        : 3,
  //     [ usersCols.NAME ]      : 'taro',
  //     [ usersCols.MAIL ]      : 'foo@gmail.com',
  //     [ usersCols.AUTH_ID ]   : 1,
  //     [ usersCols.COUNTRY_ID ]: 'USA',
  //   }
  // })

//   users.begin({
//     /**
//      * レコード登録
//      * @param { McTable } users
//      */
//     handler: users => {
//       users.insert( record ).commit()
//     },

//     /**
//      *
//      * @param { any }     e          エラーオブジェクト
//      * @param { McTable } rollbacked begin実行時に保存したバージョンのテーブル
//      */
//     exceptionHander: ( e, rollbacked ) => {
//       Logger.log( e )
//     }
//   })
// }

// global.McTable = McTable

// global.growSeeds = function () {
//   grow()
// }

// global.join = function () {
//   const users     = Users()
//   const countries = Countries()

//   const table = users.innerJoin(
//     countries,
//     usersCols.COUNTRY_ID,
//     countriesCols.ID
//   )

//   var a = 1
// }

// global.innerJoin = function () {
//   const users       = Users()
//   const countries   = Countries()
//   const authorities = Authorities()

//   const table1 = users
//     .innerJoin(
//       countries,
//       usersCols.COUNTRY_ID,
//       countriesCols.ID
//     ).innerJoin(
//       authorities,
//       users.name + McRecord.NAMESPACE_SPLICER + users.AUTH_ID,
//       authoritiesCols.AUTH_ID,
//     )

//     var id = table1.firstRecord.get( users.AUTH_ID )
//     var b = 1
// }

// global.outerJoin = function () {
//   const users       = Users()
//   const authorities = Authorities()

//   const table1 = users.outerJoin(
//     authorities,
//     usersCols.AUTH_ID,
//     authoritiesCols.ID
//   )

//   var id = table1.firstRecord.get( usersCols.AUTH_ID )
//   var b = 1
// }

// global.crossJoin = function () {
//   const users       = Users()
//   const authorities = Authorities()
//   const table1      = users.crossJoin( authorities )

//   var id = table1.firstRecord.get( usersCols.AUTH_ID )
//   var b = 1
// }
