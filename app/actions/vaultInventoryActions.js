import actionTypes from './actionTypes'
import requestCreator from './requestCreator'

function startVaultInventoryJob(regionId, vaultARN) {
  return {
    type: actionTypes.START_INVENTORY_JOB,
    regionId,
    vaultARN
  }
}

function completeVaultInventoryJob(regionId, vaultARN, jobInfo) {
  return {
    type: actionTypes.COMPLETE_INVENTORY_JOB,
    regionId,
    vaultARN,
    jobInfo
  }
}

function startCachedVaultInventoryRetrieval(regionId, vaultARN) {
  return {
    type: actionTypes.START_INVENTORY_RETRIEVAL,
    regionId,
    vaultARN
  }
}

function completeCachedVaultInventoryRetrieval(regionId, vaultARN, inventory) {
  return {
    type: actionTypes.COMPLETE_INVENTORY_RETRIEVAL,
    regionId,
    vaultARN,
    inventory
  }
}

export function retrieveCachedVaultInventory(regionId, vaultARN) {
  return (dispatch) => {
    dispatch(startCachedVaultInventoryRetrieval(regionId, vaultARN))

    requestCreator.getCachedVaultInventory(vaultARN, (res) => {
      if (!res.err) {
        dispatch(completeCachedVaultInventoryRetrieval(regionId, vaultARN, res.data))
      }
    })
  }
}