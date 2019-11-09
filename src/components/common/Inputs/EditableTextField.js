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
    if (value) {
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

    return (
      <div className={`editable-text-field ${this.props.className || ''}`} style={this.props.style}>
        {editable ? (
          <input
            ref={(ref) => ref && ref.focus()}
            onBlur={this.onToggle}
            onKeyDown={this.onEnterKey}
            name={this.props.name}
            onChange={this.onChange}
            autoComplete={this.props.autoComplete}
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
