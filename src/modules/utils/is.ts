import { McTable }  from "../mc_table"
import { McRecord } from "../mc_record"
import { McSS }     from "../mc_ss"
import { McSheet }  from "../mc_sheet"


const toString = Object.prototype.toString


/**
 * @param   { * } o
 * @returns { boolean }
 */
function isBoolean ( o: any ): boolean {
    return typeof o === 'boolean'
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isNumber( o: any ): boolean {
    return toString.call( o ) === '[object Number]';
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isString( o: any ): boolean {
    return toString.call( o ) === '[object String]';
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isArray ( o: any ): boolean {
    return toString.call( o ) === '[object Array]'
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isObject ( o: any ): boolean {
    return toString.call( o ) === '[object Object]';
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isDate ( o: any ): boolean {
    return toString.call( o ) === '[object Date]';
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isSS ( o: any ): boolean {
    return o[ 'className' ] && o.className() === McSS.name
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isSheet ( o: any ): boolean {
    return o[ 'className' ] && o.className() === McSheet.name
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isTable ( o: any ): boolean {
    return o[ 'className' ] && o.className() === McTable.name
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isRecord ( o: any ): boolean {
    return o[ 'className' ] && o.className() === McRecord.name
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function isRecords ( o: any ): boolean {
    return isArray( o ) && isRecord( o[ 0 ] )
}



export {
    isBoolean,
    isNumber,
    isString,
    isArray,
    isObject,
    isDate,
    isSS,
    isSheet,
    isTable,
    isRecord,
    isRecords,
}