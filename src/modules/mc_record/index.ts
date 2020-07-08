import { isArray, isDate, isObject } from '../utils/is'
import { keys }            from '../utils/object'
import { validators }      from './validators'
import { McTable } from '../mc_table'


namespace McRecord {
    export interface Constructor {
        cols       : any[]
        data       : any[] | object
        validators?: object
        strict    ?: boolean
    }
}

interface McRecord {
    className      (): string
    create         ( data: object ): McRecord
    depulicate     (): McRecord
    index          ( col: any ): number | -1
    hash           (): object
    _set           ( col: any, v: any ): McRecord
    _get           ( col: any ): any | undefined
    set            ( col: any, v: any ): McRecord
    get            ( col: any ): any | undefined
    matched        ( query: object ): boolean
    hasCol         ( col: any ): boolean
    namespace      ( namespace: string ): McRecord
    setNamespace   ( namespace: string ): McRecord
    resetNamespace (): McRecord
}

/**
 * @private
 * @const
 */
const NAMESPACE_SPLICER = '.'

/**
 * @private
 * @const
 */
const BLANK_DATA = ''

/**
 * 無効データ
 * GASは===を使ったインスタンス比較が機能しないようなので無効データ判定用変数を作る
 * @private
 * @const
 */
const ___INVALID_DATA___ = `___McRecord.INVALID_DATA.${Math.random()}___`


/**
 * @class
 * @extends { Array }
 */
class McRecord extends Array {

    /**
     * @static
     */
    static NAMESPACE_SPLICER = NAMESPACE_SPLICER

    /**
     * @static
     */
    static BLANK_DATA = BLANK_DATA

    /**
     * @static
     */
    static validators: any = validators

    /**
     * @public
     * @member { string }
     */
    NAMESPACE_SPLICER: string

    /**
     * @public
     * @member { string }
     */
    BLANK_DATA: string

    /**
     * @public
     * @member { *[] }
     */
    cols: any[]

    /**
     * @public
     * @member { any[] | object }
     */
    data: any[] | object

    /**
     * @private
     * @member { object }
     */
    _validators: object

    /**
     * @private
     * @member { boolean }
     */
    _strict: boolean

    /**
     * @constructor
     * @param { McRecord.Constructor } props
     */
    constructor ( props: McRecord.Constructor ) {

        super( ...(() => {
            const data   = props.data   || {}
            const strict = props.strict || false

            // JSでArrayクラスを継承したクラスで配列長が1のインスタンスを作成する場合
            // インスタンス内のデータがemptyになる（バグ？）
            // colsの配列長が1でも正しく動作させるために無効データを一旦配列の末尾に設定してインスタンスを作成
            // 作成後に無効データを削除する
            const cols  = props.cols.length === 1 ? [ ...props.cols, ___INVALID_DATA___ ] : props.cols

            if ( !isObject( data ) ) {
                return [].concat( data )
            }

            return cols.map( col => {
                const dataProp  = data[ col ]
                const validator = validators[ col ]

                if ( !dataProp ) {
                    return BLANK_DATA
                }

                if ( validator ) {
                    if ( strict ) {
                        if ( validator( dataProp ) ) {
                            return dataProp
                        }
                        throw new Error ( `Invalid Col [ ${ col } ] Data [ ${ dataProp } ]` )
                    }
                    return validator( dataProp ) ? dataProp : BLANK_DATA
                }
                return dataProp
            })
        })() )

        this.NAMESPACE_SPLICER = McRecord.NAMESPACE_SPLICER
        this.BLANK_DATA        = McRecord.BLANK_DATA
        this.cols              = props.cols
        this._validators       = props.validators || {}
        this._strict           = props.strict     || false

        this[this.length - 1] === ___INVALID_DATA___ && this.pop()

        /**
         * @public
         * @returns { string }
         **/
        this.className = (): string => {
            return McRecord.name
        }

        /**
         * @public
         * @param   { object } o
         * @returns { McRecord }
         */
        this.create = ( o: { data: object, validators: object } ): McRecord => {
            return new McRecord( { cols: this.cols.slice(), data: o.data, validators: o.validators } )
        }

        /**
         * @public
         * @returns { McRecord }
         */
        this.depulicate = (): McRecord => {
            return this.create( this.hash() )
        }

        /**
         * @public
         * @param   { * } col
         * @returns { number | -1 }
         */
        this.index = ( col: any ): number | -1 => {
            return this.cols.indexOf( col )
        }

        /**
         * @public
         * @returns { object }
         */
        this.hash = (): object  => {
            return this.cols.reduce( ( hash, col, index ) => ( { ...hash, [ col ]: this[ index ] }), {} )
        }

        /**
         * @private
         * @param   { * } col
         * @param   { * } v
         * @returns { McRecord }
         */
        this._set = ( col: any, v: any ): McRecord => {
            const validator = this._validators[ col ]
            const index     = this.index( col )

            if ( index !== -1 ) {
                if ( validator ) {
                    if ( validator( v ) ) {
                        this[ index ] = v
                    } else {
                        if ( this._strict ) {
                            throw new Error ( `Invalid Col [ ${ col } ] Data [ ${ v } ]` )
                        }
                        this[ index ] = BLANK_DATA
                    }
                }
                this[ index ] = v
            }

            return this
        }

        /**
         * @public
         * @param   { * } col
         * @param   { * } v
         * @returns { McRecord }
         */
        this.set = ( col: any, v: any ): McRecord => {
            return this._set( col, v )
        }

        /**
         * @private
         * @param   { * } col
         * @returns { undefined }
         */
        this._get = ( col: any ): any | undefined => {
            return ( index => index === -1 ? void 0 : this[ index ] )( this.index( col ) )
        }

        /**
         * @public
         * @param   { * } col
         * @returns { undefined }
         */
        this.get = ( col: any ): any | undefined => {
            return this._get( col )
        }

        /**
         * @public
         * @param   { object } query
         * @returns { boolean }
         */
        this.matched = ( query: object ): boolean => {
            const cols = keys( query )

            return cols.filter( col =>
                [].concat( query[ col ] ).some( condition =>
                    isDate( condition )
                        ? ( isDate( condition ) ? condition : new Date( condition ) ).getTime() === this.get( col ).getTime()
                        : condition === this.get( col )
                )
            ).length === cols.length
        }

        /**
         * @public
         * @param   { * } col
         * @returns { boolean }
         */
        this.hasCol = ( col: any ): boolean => {
            return this.index( col ) !== -1
        }

        /**
         * @public
         * @param   { string } namespace
         * @returns { McRecord }
         */
        this.namespace = ( namespace: string ): McRecord => {
            this.cols = McRecord.namespace( this, namespace )
            return this
        }

        /**
         * @public
         * @param   { string } namespace
         * @returns { McRecord }
         */
        this.setNamespace = ( namespace: string ): McRecord => {
            this.set = ( col: any, v: any ) => this._set( [ namespace, col ].join( McRecord.NAMESPACE_SPLICER ), v )
            this.get = ( col: any )         => this._get( [ namespace, col ].join( McRecord.NAMESPACE_SPLICER ) )

            return this
        }

        /**
         * @public
         * @returns { McRecord }
         */
        this.resetNamespace = (): McRecord => {
            this.set = this._set
            this.get = this._get

            return this
        }
    }

    /**
     * @static
     * @param {McRecord.Constructor} props
     */
    static create ( props: McRecord.Constructor ): McRecord {
        return new McRecord( props )
    }

    /**
     * @static
     * @param  { McRecord } record
     * @param  { string[] } prefix
     */
    static namespace ( record: McRecord, prefix: string ): string[] {
        return record.cols.reduce( ( cols: string[], col ) =>
            col.indexOf( McRecord.NAMESPACE_SPLICER ) === -1
                ? [ ...cols, [ prefix, col ].join( McRecord.NAMESPACE_SPLICER ) ]
                : [ ...cols, col ]
        , [])
    }

    /**
     * @static
     * @param  { any }      any
     * @param  { Function } validator
     */
    static setValidator ( name: any, validator: Function ) {
        McRecord.validators[ name ] = validator
    }
}

export {
    McRecord
}
