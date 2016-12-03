import actionTypes from '../actions/actionTypes'
/****
{
  jobId: string, # id of the lastest requested inventory job for this vault
  inventory: list, # list of inventory retreieved from last job
  fetching: boolean, # true if fetching result from inventory job is in progress
  lastFetch: timestamp # last fetch timestamp 
}
****/

export default function vaultInventory(state={}, action) {
  console.log(`vaultInventory reducer : ${JSON.stringify(action)}`)

  switch(action.type) {
    case actionTypes.START_INVENTORY_RETRIEVAL:
      return updateVaultInventory(state, action.vaultARN, (inventory) => ({
        ...inventory,
        fetching: true
      }))
    case actionTypes.COMPLETE_INVENTORY_RETRIEVAL:
      return updateVaultInventory(state, action.vaultARN, (inventory) => ({
        fetching: false,
        lastFetch: Date.now(),
        inventory: action.inventory,
        jobId: "action.###"
      }))
    // case actionTypes.START_INVENTORY_JOB:
    //   return updateVaultInventory(state, action.vaultARN, (inventory) => ({
    //     queuedJob: true,
    //     jobInfo: action.jobInfo,
    //     ready: false,
    //   }))
    // case actionTypes.COMPLETE_INVENTORY_JOB:
    //   return updateVaultInventory(state, action.vaultARN, (inventory) => ({
    //     fetching: false,
    //     lastFetch: Date.now(),
    //     inventory: action.inventory
    //   }))
    default:
      return state    
  }
}

function updateVaultInventory(vaultInventoryMap, vaultARN, updater) {
  let vaultInventory = vaultInventoryMap[vaultARN] || {}
  vaultInventory = updater(vaultInventory)
  return {...vaultInventoryMap, [vaultARN] : vaultInventory}
}