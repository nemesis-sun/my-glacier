import actionTypes from './actionTypes'
import requestCreator from './requestCreator'

export function startVaultFetch(regionId) {
  return {
    type: actionTypes.START_VAULT_FETCH,
    regionId: regionId
  }
}

export function completeVaultFetch(regionId, vaultList) {
  return {
    type: actionTypes.COMPLETE_VAULT_FETCH,
    regionId: regionId,
    vaultList: vaultList
  }
}

export function vaultFetch(regionId) {
  return (dispatch, getState) => {
    const {regions} = getState()
    const region = regions.find((reg) => reg.id == regionId)

    if(!region.fetching) {
      dispatch(startVaultFetch(regionId))

      new Promise((resolve, reject) => {
        requestCreator.listVault(regionId, (data) => {
          resolve(data.data)
        })
      }).then((vaultList) => { 
        dispatch(completeVaultFetch(regionId, vaultList))
      })
    }
  }
}