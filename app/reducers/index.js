import {combineReducers} from 'redux'
import regions from './regions'
import vaultJobs from './vaultJobs'
import vaultInventory from './vaultInventory'


const appReducer = combineReducers({
  regions,
  vaultJobs,
  vaultInventory
})

export default appReducer