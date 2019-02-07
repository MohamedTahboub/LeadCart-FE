import React, { Component } from 'react';
import common from '../common'

import './style.css';

const { EditableTextField } = common


class UpsellFeature extends Component {


  onChange = () => console.log('Feature title changes')
  render() {
    const { title, description, id, onChange, number } = this.props;
    return (
      <div className='upsell-feature-item'>
        <div className='upsell-feature-title'>
          <span className='feature-number'>{number}</span>
          <EditableTextField
            name='title'
            value={title}
            onChange={onChange.bind(this, id)}
          />
        </div>
        <div className='upsell-feature-description'>
          <EditableTextField
            name='description'
            value={description}
            onChange={onChange.bind(this, id)}
          />
        </div>
      </div>
    );
  }
}

export default UpsellFeature;
