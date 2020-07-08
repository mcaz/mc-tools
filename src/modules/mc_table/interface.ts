import { McTable }  from '.'
import { McRecord } from '../mc_record'
import { McSheet }  from '../mc_sheet'
import { McSS }     from '../mc_ss'
import { Alias }    from '../../config/alias'


export interface Constructor {
    data         ?: any[][]
    spreadsheet  ?: Alias.Spreadsheet
    spreadsheetId?: string
    sheet        ?: Alias.Sheet
    name         ?: string
    latest       ?: number
    savePoints   ?: object
}

export interface Properties {
    data         : any[][]           // ヘッダー・レコードの全データ
    cols         : any[]             // カラム名リスト
    colsLength   : number            // カラム数
    existsSheet  : boolean           // 捜査対象のシートが存在するか
    existsCols   : boolean           // カラムが存在するか
    existsRecords: boolean           // レコードが存在するか
    records      : McRecord[]        // レコードデータ
    recordsLength: number            // レコード数
    firstRecord  : McRecord | null   // 最初のレコード
    lastRecord   : McRecord          //
    mcSS         : McSS
    mcSheet      : McSheet
    savePoints   : object
    latest       : number
    writable     : boolean
}

namespace Modules {

    export interface Ddl {

    }

    export interface Dml {
        duplicate        (): McTable
        duplicateCols    (): string[]
        duplicateRecords (): McRecord[]
        insert           ( values?: McTable | McRecord | McRecord[] | object, append?: boolean ): McTable
        find             ( query: object ): McTable
        colIndex         ( col: any ) : number | -1
        hasCol           ( col: any ): boolean
        not              ( query: object ): McTable
        orderByAsc       ( col: any ): McTable
        orderByDesc      ( col: any ): McTable
        discard          (): McTable
        rows             ( col: any ): any[]
        max              ( col: any ): any | null
        min              ( col: any ): any | null
        distinctRows     ( col: any ): any[]
        select           ( cols: any[] ): McTable
        distinct         (): McTable
        innerJoin        ( leftCol: any, rightTable: McTable, rightCol: any ): McTable | null
        leftOuterJoin ( leftCol: any, right: McTable, rightCol: any ): McTable
        crossJoin        ( right: McTable ): McTable | null
    }

    export interface Dcl {
        save     ( savePoint?: number ): McTable
        begin    ( props: { handler: Function, exceptionHander: Function } ): McTable
        commit   (): McTable
        rollback ( savePoint?: any ): McTable
    }

    export interface Iterater {
        each   ( fn: Function ): McTable
        map    ( fn: Function ): any[]
        reduce ( fn: Function , previousValue: any ): any
        some   ( fn: Function ): boolean
        filter ( fn: Function ): McTable
        sort   ( fn: Function ): McTable
    }
}

export interface Methods extends Modules.Dcl, Modules.Ddl, Modules.Dml, Modules.Iterater {
    className (): string
    fetch     ( data?: any[][] ): McTable
    Record    ( data: object ): McRecord
    hashes 　 (): object[]
    trim      (): McTable
    McRecord  ( data: object ): McRecord
    lock      (): McTable
}
