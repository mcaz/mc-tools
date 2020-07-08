export type Constoructor< T = {} > = new ( ...args: any[] ) => T

function applyMixins( derivedCtor, baseCtors ) {

    baseCtors.forEach( baseCtor =>
        Object.getOwnPropertyNames( baseCtor.prototype ).forEach( name => {

            const property = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            )

            Object.defineProperty(
                derivedCtor.prototype,
                name,
                property
            )
        })
    )

    // baseCtors.forEach(baseCtor => {
    //     const properties = Object.getOwnPropertyDescriptors(baseCtor)

    //     Object.keys(properties).forEach(name => {
    //         if (name === 'prototype' || name === 'length') return

    //         properties[name]

    //         Object.defineProperty(
    //             derivedCtor,
    //             name,
    //             properties[name]
    //         )
    //     })
    // })
}


export {
    applyMixins
}
