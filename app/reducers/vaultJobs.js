import actionTypes from '../actions/actionTypes'

export default function vaultJobs(state={}, action) {
  console.log(`vaultJobs reducer : ${JSON.stringify(action)}`)
  switch(action.type) {
    case actionTypes.START_JOB_FETCH:
      return updateVaultJobList(state, action.vaultARN, (oldJobList) => ({ 
        ...oldJobList, 
        fetching: true
      })) 
    case actionTypes.COMPLETE_JOB_FETCH:
      return updateVaultJobList(state, action.vaultARN, (_) => ({
        lastFetch: Date.now(), 
        jobList: action.jobList,
        fetching: false
      }))
    default:
      return state
  }
}

function updateVaultJobList(vaults, vaultARN, updater) {
  let vaultJobList = vaults[vaultARN] || {}
  vaultJobList = updater(vaultJobList)
  return { ...vaults, [vaultARN]: vaultJobList}
}