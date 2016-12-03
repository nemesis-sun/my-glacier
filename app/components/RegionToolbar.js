import React from 'react'
import {connect} from 'react-redux'
import {vaultFetch} from '../actions/regionActions'
import {awsRegions} from '../helpers/constants'

class RegionToolbar extends React.Component {
  render() {
    return (
      <div className='toolbar-right zero-radius'>
        <button type="button" className="btn btn-primary btn-xs" 
            onClick={this.onRefreshRegions.bind(this)}>Refresh</button>
      </div>
    )
  }

  onRefreshRegions() {
    let self = this
    awsRegions.forEach((region) => {
      console.log(JSON.stringify(region))
      self.props.vaultFetch(region.id)
    })
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    vaultFetch : (regionId) => {
      dispatch(vaultFetch(regionId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionToolbar)