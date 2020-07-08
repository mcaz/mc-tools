import { authorities as table } from '../../config/db'
import { values }               from '../../modules/utils/object'


const name    = table.name
const cols    = values( table.cols )
const records = [
  {
    [ table.cols.ID ]  : 1,
    [ table.cols.AUTH ]: 'admin',
  },

  {
    [ table.cols.ID ]  : 2,
    [ table.cols.AUTH ]: 'editor',
  },

  {
    [ table.cols.ID ]  : 3,
    [ table.cols.AUTH ]: 'viewer',
  },
]


export const context = {
  name,
  cols,
  records
}
