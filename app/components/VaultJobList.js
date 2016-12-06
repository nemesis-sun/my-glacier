import React from 'react'
import {connect} from 'react-redux'

export default class VaultJobList extends React.Component {
  render() {
        // let vaultJob = this.props.vaultJobs[this.props.params.vaultARN]
    // let content = null
    // if(vaultJob) {
    //   if(vaultJob.fetching) {
    //     content = 'Fetching pending/completed jobs for this vault...'
    //   } else {
    //     content = `Number of jobs ${vaultJob.jobList.length}`
    //   }
    // } else {
    //   content = 'Nothing to display'
    // }
    return (
      <table className='table table-condensed table-striped'>
        <thead>
          <tr>
            <th>header</th>
            <th>header</th>
            <th>header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>
          </tr>
          <tr>
            <td>data</td>
            <td>data</td>
            <td>data</td>              
          </tr>
          <tr>
            <td>data</td>              
            <td>data</td>              
            <td>data</td>              
          </tr>
        </tbody>
      </table>
    )
  }
}