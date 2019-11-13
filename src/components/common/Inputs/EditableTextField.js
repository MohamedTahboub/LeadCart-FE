import React, { Component } from 'react';

class EditableTextField extends Component {
  state = { editable: false, value: '' };

  onToggle = (e) => {
    const { editable } = this.state;
    this.setState({ editable: !editable });
    this.props.onBlur && this.props.onBlur(e);
  };

  onEnterKey = (e) => {
    if (e.key === 'Enter') this.onToggle();
  };

  onChange = ({ target: { value, name } }) => {
    const { min = 0, max } = this.props;
    if (value) {
      if (value.length > max || value.length < min)
        return;

      this.setState({ value });
      this.props.onChange && this.props.onChange({ target: { name, value } });
    }
  };

  componentDidMount () {
    const { value } = this.props;
    if (value) this.setState({ value });
  }

  componentWillUpdate (prev) {
    const { value } = this.props;
    if (value !== prev.value) this.setState({ value });
  }

  render () {
    const { editable, value } = this.state;
    const {
      className,
      min,
      max,
      name,
      autoComplete,
      style
    } = this.props;
    return (
      <div className={`editable-text-field ${className || ''}`} style={style}>
        {editable ? (
          <input
            ref={(ref) => ref && ref.focus()}
            onBlur={this.onToggle}
            onKeyDown={this.onEnterKey}
            name={name}
            onChange={this.onChange}
            min={min}
            max={max}
            autoComplete={autoComplete}
            type='text'
            defaultValue={value}
            className='editable-text-input'
          />
        ) : (
          <span onClick={this.onToggle} className='editable-text-content'>
            <abbr className='abbr-note' title='Click to Edit'>
              {value}
            </abbr>
          </span>
        )}
      </div>
    );
  }
}

export default EditableTextField;
