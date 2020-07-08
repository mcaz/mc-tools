function keys( o: Object ): any[] {
    return Object.keys( o )
}

function values( o: Object ): any[] {
    return keys( o ).map( k => o[ k ] )
}


export {
    keys,
    values,
}
