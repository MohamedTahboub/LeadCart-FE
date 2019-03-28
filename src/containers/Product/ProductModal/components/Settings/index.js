import React from 'react'
import Headers from './Headers';
import Available from './Available';
import General from './General';

import './style.css'
export default class Setting extends React.Component {


  static Headers = Headers;

  static Available = Available;

  static General = General;

  render() {
    return (
      <div className="product-form-settings">
        {this.props.children}
      </div>
    );
  }
}; 