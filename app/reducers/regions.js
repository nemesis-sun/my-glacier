import {awsRegions} from '../helpers/constants'
import actionTypes from '../actions/actionTypes'

const defaultState = awsRegions.map((region) => {
  return { ...region, vaultList : [], fetching: false, lastFetch: 0 }
})

export default function regions(state = defaultState, action) {
  console.log(`regions reducer : ${JSON.stringify(action)}`)
  switch(action.type) {
    
    case actionTypes.START_VAULT_FETCH :
      return updateRegions(state, action.regionId, (reg) => {
        return {...reg, fetching: true}
      })

    case actionTypes.COMPLETE_VAULT_FETCH :
      return updateRegions(state, action.regionId, (reg) => {
        return {...reg, fetching: false, vaultList: action.vaultList, lastFetch: Date.now()}
      })

    default:
      return state
  }
}

function updateRegions(regions, regionId, updater) {
  let regIndex = regions.findIndex((reg) => {
    return reg.id == regionId
  })
  if(regIndex != -1) {
    let region = updater(regions[regIndex])
    return [].concat(regions.slice(0,regIndex), region, regions.slice(regIndex+1))
  }
  return regions
}

