import React from 'react'
import {connect} from 'react-redux'
import {retrieveCachedVaultInventory} from '../actions/vaultInventoryActions'

class VaultInventoryList extends React.Component {

  render() {
    let vaultARN = this.props.params.vaultARN
    let content = null
    let inventory = this.props.vaultInventory[vaultARN]

    if(inventory){
      if(!inventory.fetching) {
        if(inventory.inventory==null){
          content = (
            <div>Inventory for this vault has not been retrieved from Glacier, check pending job list or initiate an inventory retrieval job?</div>
          )
        } else {
          content = (
            <div>Inventory list rendered here</div>
          )
        }
      } else {
        content = (
          <div>Fetching inventory from cache...</div>
        )
      }
    } else {
      content = (
        <div>Nothing to display here</div>
      )
    }

    return (
      <div>
        {content}
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.vaultInventory[nextProps.params.vaultARN]) {
      nextProps.retrieveCachedVaultInventory(nextProps.params.regionId, nextProps.params.vaultARN)
    }
  }

  refreshCachedInventory(){
    this.props.retrieveCachedVaultInventory(this.props.params.regionId, this.props.params.vaultARN)
  }
}

function mapStateToProps(state) {
  return {
    vaultInventory: state.vaultInventory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    retrieveCachedVaultInventory: (regionId, vaultARN) => {
      dispatch(retrieveCachedVaultInventory(regionId, vaultARN))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultInventoryList)