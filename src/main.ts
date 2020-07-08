import { Table as Users,       cols as usersCols }       from './db/tables/users'
import { Table as Countries,   cols as countriesCols }   from './db/tables/countries'
import { Table as Authorities, cols as authoritiesCols } from './db/tables/authorities'

import { growSeeds } from './db/grow';
import { McRecord }  from './modules/mc_record'
import { McTable }   from './modules/mc_table';


declare var global: any;

global.growSeeeds = function () {
    growSeeds()
}
