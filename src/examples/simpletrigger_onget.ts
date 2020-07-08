import { McTable } from '../modules/mc_table'


const users           = McTable.use( { name: 'users' } )
const authorities     = McTable.use( { name: 'authorities' } )
const countries       = McTable.use( { name: 'countries' } )
const depulicateUsers = users.duplicate()


declare var global: any;


global.onGet = function ( e ) {
    const parameter = e.parameter
    const id        = +parameter.id

    users.find( { id } )
}