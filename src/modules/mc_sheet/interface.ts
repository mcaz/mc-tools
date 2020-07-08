import { McSheet } from '.'
import { McSS }    from '../mc_ss'
import { Alias }   from '../../config/alias'


export interface Constructor {
    name         ?: string
    spreadsheetId?: string
    spreadsheet  ?: Alias.Spreadsheet
    sheet        ?: Alias.Sheet
    dataOnly     ?: boolean
}

export interface Properties {
    id           : number
    url          : string
    name         : string
    spreadsheet  : Alias.Spreadsheet
    sheet        : Alias.Sheet
    entryRange   : Alias.Range
    spreadsheetId: string
    mcSS         : McSS
    __class__    : string
}

export interface TargetRanges {
    sRow: number
    sCol: number
    eRow: number
    eCol: number
}

export interface Methods {
    className    (): string
    values       (): any[][]
    formulas     (): any[][]
    show         (): McSheet
    hide         (): McSheet
    TargetRanges ( entry: Alias.Range, values: any[][] ): TargetRanges
    lastRow      (): number
    lastCol      (): number
    maxRow       (): number
    maxCol       (): number
}
