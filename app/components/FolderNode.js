import React from 'react'
import classNames from 'classnames'

export default class FolderNode extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false,
      selected: props.selected || false
    }
  }

  render() {
    let nodeToggleButton = null
    let displayChildren = {display: 'none'}

    if (this.props.children) {
      let nodeToggleText = this.state.expanded ? '–' : '+'
      nodeToggleButton = (
        <div className='folder-toggle' onClick={this.onFolderToggle.bind(this)}>
            {nodeToggleText}
        </div>
      )
      displayChildren = (!this.props.loading && this.state.expanded) ? {display: 'initial'} : {display: 'none'} 
    }

    let className = classNames('folder-label', {'folder-loading': this.props.loading, 'folder-selected': this.props.selected})
    return (
      <div className='folder-hier no-highlight'>
        
        <div className={className}>
          {nodeToggleButton}
          <span>&nbsp;</span>
          <div className='folder-name' onClick={this.onFolderSelectToggle.bind(this)}>
            {this.props.label}
          </div> 
        </div>

        <div style={displayChildren}>
          {this.props.children}
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.loading != nextProps.loading) { 
      this.setState({ expanded : !nextProps.loading })
    }
  }

  onFolderToggle() {
    if (this.props.loading) {return}
    let cb = this.state.expanded ? this.props.onCollapse : this.props.onExpand
    if (cb) { cb() }
    this.setState((prevState) => {
      return {expanded: !prevState.expanded}
    })
  }

  onFolderSelectToggle() {
    if (this.props.loading) {return}
    let cb = this.props.selected ? this.props.onDeselect : this.props.onSelect
    if(cb) { cb() }
  }
}

