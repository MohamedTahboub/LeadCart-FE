import React, { Component } from 'react';

const getWordsCount = (words = '') => words.split((/(\n)/g)).filter((w) => w.trim().length >= 1).length;

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
    const { value, min, max, error } = this.props;
    this.setState({
      value,
      min,
      max,
      wordsNumber: getWordsCount(value),
      error
    });
  }

  componentDidUpdate (prev) {
    const { name, value, min, max, error } = this.props;
    if (prev.name !== name || prev.value !== value)
      this.setState({ name, value, min, max, error, wordsNumber:  getWordsCount(value) });
  }

  onChange = ({ target: { name, value } }) => {
    const wordsNumber = getWordsCount(value);
    const { min, max } = this.state;
    const { countable, onChange } = this.props;
    if (countable) {
      if (wordsNumber <= max && wordsNumber >= min) {
        this.setState({
          wordsNumber,
          value
        });
        onChange({ target: { name, value } });
      } else {
        this.setState({ error: `Words shouldn't be less than ${min} word or more than ${max} word` });
      }
    } else {
      this.setState({
        wordsNumber,
        value,
        error: ''
      });
      onChange({ target: { name, value } });
    }
  }

  render () {
    const { name, disabled, countable, error: passedError, className, placeholder, wordName = 'words', onBlur } = this.props;
    const { value, error = passedError, wordsNumber, max } = this.state;
    return (
      <div className='text-area-container'>
        <textarea
          placeholder={placeholder}
          onChange={this.onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          disabled={disabled}
          className={`textarea-input-field ${className || ''} ${error ? 'invalid-field' : ''}`}
        />
        <span className='text-area-small-note'>{countable ? `${wordsNumber} / ${max} ${wordName}` : `${wordsNumber} ${wordName}`}</span>
      </div>
    );
  }
}
export default TextAreaInput;

