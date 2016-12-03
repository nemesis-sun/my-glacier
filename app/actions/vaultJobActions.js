import actionTypes from './actionTypes'
import requestCreator from './requestCreator'

function startJobFetch(vaultARN) {
  return {
    type: actionTypes.START_JOB_FETCH,
    vaultARN
  }
}

function completeJobFetch(vaultARN, jobList){
  return {
    type: actionTypes.COMPLETE_JOB_FETCH,
    vaultARN,
    jobList
  }
}

export function fetchJob(vaultARN) {
  return (dispatch) => {
    dispatch(startJobFetch(vaultARN))

    new Promise((resolve, reject) => {
      requestCreator.listJob(vaultARN, (data) => {
        resolve(data.data)
      })
    }).then((jobList) => { 
      dispatch(completeJobFetch(vaultARN, jobList))
    })
  }
}