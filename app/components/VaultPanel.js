import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {retrieveCachedVaultInventory} from '../actions/vaultInventoryActions'
import {fetchJob} from '../actions/vaultJobActions'

class VaultPanel extends React.Component {
  render() {
    return (
    <div>
      <div>
        <h2 className='vault-title'>Vault <small>{this.props.params.vaultARN}</small></h2>
      </div>
      <div className='vault-panel-toolbar'>
        <div className="btn-group btn-group-xs zero-radius" role="group">
          <Link to={`${this.props.params.regionId}/vaults/${encodeURIComponent(this.props.params.vaultARN)}/inventory`} 
                activeClassName='btn-primary' 
                type="button" className="btn btn-default">Inventory</Link>
          <Link to={`${this.props.params.regionId}/vaults/${encodeURIComponent(this.props.params.vaultARN)}/jobs`} 
                activeClassName='btn-primary' 
                type="button" className="btn btn-default">Jobs</Link>
        </div>
        <div className='zero-radius'>
          <button type="button" className="btn btn-primary btn-xs" 
              onClick={this.onRefresh.bind(this)} >Refresh</button>
        </div>
      </div>
      <div>{this.props.children}</div>
    </div>
    )
  }

  onRefresh() {
    const {vaultARN} = this.props.params
    const {pathname} = this.props.location

    if(pathname.includes('inventory')) {
      this.props.retrieveCachedVaultInventory(vaultARN)
    } else if(pathname.includes('jobs')) {
      this.props.fetchJob(vaultARN)
    }
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchJob: (vaultARN) => {
      dispatch(fetchJob(vaultARN))
    },
    retrieveCachedVaultInventory: (vaultARN) => {
      dispatch(retrieveCachedVaultInventory(vaultARN))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultPanel)