import React, { Component } from 'react';

import './style.css';

class UpsellFeature extends Component {
  render () {
    const { title, description, id } = this.props;
    return (
      <div className='upsell-feature-item'>
        <div className='upsell-feature-title'>
          <span className='feature-number'>{id + 1}</span>
          {title}
        </div>
        <div className='upsell-feature-description'>{description}</div>
      </div>
    );
  }
}

export default UpsellFeature;
