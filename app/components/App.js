import React from 'react'
import RegionList from './RegionList'
import RegionToolbar from './RegionToolbar'
import VaultPanel from './VaultPanel'

export default class App extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-xs-4'>
          <RegionToolbar />
          <RegionList currRegion={this.props.params.regionId} currVault={this.props.params.vaultARN} />
        </div>
        <div className='col-xs-8'>
          {this.props.children}
        </div>
      </div>
    );
  }
}