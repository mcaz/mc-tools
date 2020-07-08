import { isNumber, isString, isBoolean, isDate } from '../utils/is'


/**
 * @param   { * } o
 * @returns { boolean }
 */
function bool ( o: any ): boolean {
    return isBoolean( o )
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function number ( o: any ): boolean {
    return isNumber( o )
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function string ( o: any ): boolean {
    return isString( o )
}

/**
 * @param   { * } o
 * @returns { boolean }
 */
function date ( o: any ): boolean {
    return isDate( o )
}


const validators = {
    number,
    string,
    bool,
    date,
}


export {
    validators
}