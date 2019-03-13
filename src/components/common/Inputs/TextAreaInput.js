import React, { Component } from 'react';

const getWordsCount = (words = '') => words.split((/(\w+)/g)).filter((w) => w.trim().length >= 1).length;

class TextAreaInput extends Component {
  state = {
    value: '',
    error: '',
    wordsNumber: 0,
    countable: true,
    max: 40,
    min: 5
  }

  componentDidMount () {
    const {
      value, min, max, error
    } = this.props;
    this.setState({
      value,
      min,
      max,
      wordsNumber: getWordsCount(value),
      error
    });
  }

  componentDidUpdate (prev) {
    const {
      name, value, min, max, error
    } = this.props;
    if (prev.name !== name || prev.value !== value) {
      this.setState({
        name, value, min, max, error
      });
    }
  }

  onChange = ({ target: { name, value } }) => {
    const wordsNumber = getWordsCount(value);
    const { min, max } = this.state;
    if (this.props.countable) {
      if (wordsNumber <= max && wordsNumber >= min) {
        this.setState({
          wordsNumber,
          value
        });
        this.props.onChange({ target: { name, value } });
      } else {
        this.setState({
          error: `Words shouldn't be less than ${min} word or more than ${max} word`
        });
      }
    } else {
      this.setState({
        wordsNumber,
        value,
        error: ''
      });
      this.props.onChange({ target: { name, value } });
    }
  }

  render () {
    const {
      value, error = this.props.error, wordsNumber, max
    } = this.state;
    const {
      name, disabled, width = '697px', countable, className, placeholder
    } = this.props;
    return (
      <div className='text-area-container'>
        <textarea
          style={{ width }}
          placeholder={placeholder}
          onChange={this.onChange}
          value={value}
          name={name}
          disabled={disabled}
          className={`textarea-input-field ${className || ''} ${error ? 'invalid-field' : ''}`}
        />
        <span className='text-area-small-note'>{countable ? `${wordsNumber} / ${max} words` : `${wordsNumber} words`}</span>
      </div>
    );
  }
}
export default TextAreaInput;

