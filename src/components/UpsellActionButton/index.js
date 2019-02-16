import React, { Component } from 'react';
import { HuePicker } from 'react-color';

import './style.css';
class UpsellActionButton extends Component {
    state = { color: '' }

    updateColor = (color) => {
      this.setState({ color });
      if (color) this.props.onChange(color);
    }

    componentDidMount () {
      this.updateColor(this.props.color);
    }

    componentDidUpdate (prev) {
      if (prev.color !== this.props.color) this.updateColor(this.props.color);
    }

    onChange = (color) => {
      console.log(color.hex);
      this.updateColor(color.hex);
    }

    render () {
      const { text } = this.props;
      const { color = 'green' } = this.state;

      const style = {
        background: color
      };
      return (
        <div className='upsell-action-btn-container'>
          <span style={style} className='action-btn'>{text}</span>
          <HuePicker
            width='200px'
            color={color}
            onChangeComplete={this.onChange}
          />
        </div>
      );
    }
}

export default UpsellActionButton;
