import { McSheet } from '../mc_sheet'
import { McTable } from '../mc_table'
import { Alias } from '../../config/alias'


namespace McSS {
    export interface Constructor {
        spreadsheet?: Alias.Spreadsheet
        id         ?: string
    }
}

class McSS {

    id         : string
    spreadsheet: Alias.Spreadsheet
    name       : string
    url        : string

    /**
     * @constructor
     * @param { McSS.Constructor } props
     */
    constructor ( props?: McSS.Constructor ) {
        if ( !props || ( !props.spreadsheet && !props.id ) ) {
            this.spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
            this.id          = this.spreadsheet.getId()
            this.name        = this.spreadsheet.getName()
            this.url         = this.spreadsheet.getUrl()

            return
        }

        if ( props.spreadsheet ) {
            this.spreadsheet = props.spreadsheet
            this.id          = this.spreadsheet.getId()
        } else if ( props.id ) {
            this.spreadsheet = SpreadsheetApp.openById( props.id )
            this.id          = props.id
        }

        this.name = this.spreadsheet.getName()
        this.url  = this.spreadsheet.getUrl()
    }

    /**
     * @static
     * @param { McSS.Constructor } props
     */
    static use ( props?: McSS.Constructor ) {
        return new McSS( props )
    }

    /**
     * @public
     * @returns { string }
     */
    className (): string {
        return McSS.name
    }

    /**
     * @public
     * @param   { string } name
     * @returns { McSheet }
     */
    insertSheet ( name: string ): McSheet {
        return McSheet.use({
            spreadsheet: this.spreadsheet,
            sheet      : this.existSheet( name )
                ? this.getSheetByName( name ).sheet
                : this.spreadsheet.insertSheet( name )
        })
    }

    /**
     * @public
     * @param   { string } name
     * @returns {McTable}
     */
    insertTable ( name: string ): McTable {
        const { spreadsheet, sheet } = this.insertSheet( name )

        return McTable.use({
            spreadsheet,
            sheet
        })
    }

    /**
     * @public
     * @returns {string[]}
     */
    getSheetNames (): string[] {
        const sheets = this.spreadsheet.getSheets()

        return sheets.map( sheet =>
            sheet.getName()
        )
    }

    /**
     * @public
     * @returns { McSheet }
     */
    getActiveSheet (): McSheet {
        return McSheet.use()
    }

    /**
     * @public
     * @returns { McSheet }
     */
    getSheetByName ( name: string ): McSheet {
        return McSheet.use( { name } )
    }

    /**
     * ペンディングされているシート内の処理を処理を流す
     * @public
     */
    flush (): McSS {
        SpreadsheetApp.flush()
        return this
    }

    /**
     * @param   { string } name
     * @returns { boolean }
     */
    existSheet ( name: string ): boolean {
        const sheet = this.spreadsheet.getSheetByName( name )
        return sheet !== null
    }
}


export {
    McSS
}
