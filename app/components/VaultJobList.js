import React from 'react'
import {connect} from 'react-redux'
import {fetchJob} from '../actions/vaultJobActions'

class VaultJobList extends React.Component {
  render() {
    let vaultJob = this.props.vaultJobs[this.props.params.vaultARN]
    let content = null
    if(vaultJob) {
      if(vaultJob.fetching) {
        content = 'Fetching pending/completed jobs for this vault...'
      } else {
        content = `Number of jobs ${vaultJob.jobList.length}`
      }
    } else {
      content = 'Nothing to display'
    }

    return (
      <div>
        {content}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.vaultJobs[nextProps.params.vaultARN]) {
      nextProps.fetchJob(nextProps.params.vaultARN)
    }
  }
}

function mapStateToProps(state) {
  return {
    vaultJobs: state.vaultJobs
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJob: (vaultARN) => {
      dispatch(fetchJob(vaultARN))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultJobList)