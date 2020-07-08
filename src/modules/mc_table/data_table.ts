// import { Constructor, Properties, Methods, McDataTable } from './interface'
// import { Iterater }                         from './mixins/iterater'
// import { Ddl }                              from './mixins/ddl'
// import { Dml }                              from './mixins/dml'
// import { McSheet }                          from '../mc_sheet'
// import { applyMixins }                      from '../utils/mixin'
// import { TableConfig }                      from '../../config/db'
// import { McSS }                             from '../mc_ss'
// import { McRecord }                         from '../mc_record'
// import { Dcl }                              from './mixins/dcl'
// import { Alias }                            from '../../config/alias'


// class McDataTable {

//     /**
//      * @constructor
//      * @param { McDataTable.Constructor } props
//      */
//     constructor ( props: McDataTable.Constructor ) {
//         const _props = props || {}

//         this.fetch( _props.data )

//     }

//     /**
//      * @static
//      * @param { McDataTable.Constructor } props
//      */
//     static use ( props?: McDataTable.Constructor ) {
//         return new McDataTable( props )
//     }

//     /**
//      * @public
//      * @returns { string }
//      */
//     className (): string {
//         return McDataTable.name
//     }

//     /**
//      * @public
//      * @returns { McDataTable }
//      */
//     fetch ( data: any[][] ): McDataTable {
//         const [ cols, ...records ] = this.data = data

//         this.cols          = cols || []
//         this.colsLength    = this.cols.length
//         this.records       = records.map( data => McRecord.create( { cols, data } ) )
//         this.recordsLength = this.records.length
//         this.existsCols    = this.colsLength > 0
//         this.existsRecords = this.colsLength > 0 && this.recordsLength > 0
//         this.firstRecord   = this.existsRecords ? this.records[ 0 ] : void 0
//         this.lastRecord    = this.existsRecords ? this.records[ this.recordsLength - 1 ] : void 0

//         return this
//     }

//     /**
//      * @public
//      * @param   { object } o
//      * @returns {Record}
//      */
//     Record ( o ): McRecord {
//         return McRecord.create({
//             cols      : this.cols.slice(),
//             data      : o.data,
//             validators: o.validators
//         })
//     }

//     /**
//      * @public
//      * @returns { object[] }
//      */
//     hashes (): object[] {
//         return this.map( record => record.hash() )
//     }
// }


// interface McDataTable extends McDataTable.Properties, McDataTable.Methods {}
// applyMixins( McDataTable, [ Iterater, Dml, Ddl, Dcl ] )


// export {
//     McDataTable,
// }