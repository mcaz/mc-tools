import { Constructor, Properties, Methods } from './interface'
import { McSS }                             from '../mc_ss'
import { Views }                            from './views'
import { Data }                             from './data'
import { applyMixins }                      from '../utils/mixin'


class McSheet {

    /**
     * @constructor
     * @param { Constructor } props
     */
    constructor ( props?: Constructor ) {
        const _props = props || {}

        this.mcSS  = ( () => {
            if ( _props.spreadsheet === void 0 && _props.spreadsheetId === null ) {
                return null
            }

            if ( _props.spreadsheet )   return McSS.use( { spreadsheet: _props.spreadsheet } )
            if ( _props.spreadsheetId ) return McSS.use( { id: _props.spreadsheetId } )
            return McSS.use( { id: SpreadsheetApp.getActiveSpreadsheet().getId() } )
        })()

        this.spreadsheetId = this.mcSS
             ? this.mcSS.id
             : null

        this.sheet = ( () => {
            if ( _props.sheet === null && _props.name === null ) {
                return null
            }

            if ( _props.sheet ) {
                return _props.sheet
            }

            if ( this.mcSS ) {
                return _props.name
                    ? this.mcSS.spreadsheet.getSheetByName( props.name )
                    : this.mcSS.spreadsheet.getActiveSheet()
            }

            return null
        })()

        if ( this.sheet ) {
            this.entryRange = this.sheet.getRange( 1, 1 )
            this.name       = this.sheet.getSheetName()
            this.id         = this.sheet.getSheetId()
        } else {
            this.entryRange =
            this.name       =
            this.id         = null
        }
    }

    /**
     * @static
     * @param { Constructor } props
     */
    static use ( props?: Constructor ) {
        return new McSheet(props)
    }

    /**
     * @public
     * @returns {string}
     */
    className (): string {
        return McSheet.name
    }
}


interface McSheet extends Properties, Methods {}
applyMixins( McSheet, [ Data, Views ] )


export {
    McSheet
}
