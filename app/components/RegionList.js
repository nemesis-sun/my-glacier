import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import FolderNode from './FolderNode'
import {vaultFetch} from '../actions/regionActions'
import {VAULT_REFRESH_DELAY} from '../helpers/constants'

class RegionList extends React.Component {
  render() {
    let self = this

    let regionList = this.props.regions.map((region) => {
      let subTree = region.vaultList.map((vault) => {
        return (
          <div className='folder-hier no-highlight' key={vault.VaultARN}>
            <div className='folder-label'>
              <div className='folder-name'>
                <Link to={`${region.id}/vaults/${encodeURIComponent(vault.VaultARN)}`}
                className='folder-link' 
                activeClassName='folder-selected'>{vault.VaultName}</Link>
              </div> 
            </div>
          </div>
        )
      })
      let expanded = (region.id == self.props.currRegion)
      return (
        <FolderNode key={region.id} label={region.name}
          expanded={expanded}
          loading={region.fetching}
          onExpand={self.onRegionExpand.bind(self, region.id)}>
          {subTree}
        </FolderNode>
      )
    })
    return (
      <div>{regionList}</div>
    );
  }

  onRegionExpand(regionId) {
    let region = this.props.regions.find((reg) => {
      return reg.id == regionId
    })

    if(region && (Date.now() - region.lastFetch) > VAULT_REFRESH_DELAY*1000) {
      this.props.vaultFetch(regionId)
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    regions : state.regions,
    vaultJobs: state.vaultJobs
  }
}

const mapDispatchToProps = (dispatch) => {
  return [vaultFetch].reduce((acc, fn) => {
    acc[fn.name] = (regionId) => {
      dispatch(fn(regionId))
    }
    return acc
  }, {})
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionList)