/**
 * @param { number } length
 * @param { * }      v
 */
function fill ( length: number, v: any ) {
    const a = []
    for ( var i = 0; i < length; i++ ) a.push( v )
    return a
}


export {
    fill
}