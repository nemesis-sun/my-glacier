import React from 'react'
import {connect} from 'react-redux'
import {fetchJob} from '../actions/vaultJobActions'
import VaultJobList from './VaultJobList'
import classNames from 'classnames'

class VaultJobPanel extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showNewJobForm: false
    }
  }

  render() {
    return (
      <div className='job-panel'>
        <div className='job-list'>
          <VaultJobList />
        </div>
        <div className='job-detail'>
          <div className="btn-group btn-group-xs zero-radius" role="group">
            <button type="button" className="btn btn-default btn-primary"
                    onClick={this.showNewJobForm.bind(this)}>
              <span className='glyphicon glyphicon-plus'/>
            </button>
          </div>

          <div className={classNames('job-panel-main', {'new-job' : this.state.showNewJobForm})}>
            <div className='job-info'>Job Info goes here...</div>
            <div className='job-add'>New Job form goes here...</div>
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.vaultJobs[nextProps.params.vaultARN]) {
      nextProps.fetchJob(nextProps.params.vaultARN)
    }
  }

  showNewJobForm(){
    this.setState({showNewJobForm: true})
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

export default connect(mapStateToProps, mapDispatchToProps)(VaultJobPanel)