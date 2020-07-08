import {
    users     as usersConfig,
    countries as countriesConfig,
} from '../../config/db'

import {
    McTable
} from '../../modules/mc_table'

import {
    Alias
} from '../../config/alias'


const { Table: Users,     cols: usersCols }     = McTable.TableSet( usersConfig )
const { Table: Countries, cols: countriesCols } = McTable.TableSet( countriesConfig )


const Table = ( srpeadsheet?: Alias.Spreadsheet ) => {
    const counteries = Countries( srpeadsheet )
    const users      = Users( srpeadsheet )

    return users.find({
        [ usersCols.COUNTRY_ID ]: counteries.distinctRows( countriesCols.ID )
    })
}

const cols = usersCols

export {
    Table,
    cols
}

