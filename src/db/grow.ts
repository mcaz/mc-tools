import { McTable }                from '../modules/mc_table'
import { context as users }       from './seeds/users'
import { context as authorities } from './seeds/authorities'
import { context as countries }   from './seeds/countries'


export function growSeeds (): McTable[] {

  const contexts = [
    users,
    authorities,
    countries,
  ]

  return contexts.map( McTable.create )
}
