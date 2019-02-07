import React, { Component } from 'react';
import { SelectBox } from '../Inputs'

import './style.css';

export class DisableEnableWrapper extends Component {
  state = { enabled: false }

  componentDidMount() {
    this.setState({ enabled: this.props.enabled })
  }
  componentDidUpdate(prev) {
    if (prev.enabled !== this.props.enabled)
      this.setState({ enabled: this.props.enabled })
  }
  onToggle = () => {
    let { enabled } = this.state;
    enabled = !enabled
    
    this.setState({ enabled });
    
    const { id : featureId } = this.props
    if(enabled)
      this.props.onEnabled(featureId)
    else
      this.props.onDisabled(featureId)
  }


  render() {
    const { enabled } = this.state;
    const { children, className } = this.props
    return (
      <div className={`disable-enable-wrapper ${className}`}>
        <div className='wrapper-check-input'>
          <SelectBox
            onChange={this.onToggle}
            checked={enabled}
          />
        </div>
        <div className={`wrapper-contained-element ${!enabled ? 'disabled' : ''}`}>
          {children}
        </div>
      </div>
    );
  }
}
