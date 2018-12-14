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

    onChange = ({ target: { value } }) => {
      const wordsNumber = getWordsCount(value);
      const { min, max } = this.state;
      if (this.props.countable) {
        if (wordsNumber <= max && wordsNumber >= min) {
          this.setState({
            wordsNumber,
            value
          });
          this.props.onChange({ target: { value } });
        } else {this.setState({ error: `Words shouldt'n be less than ${min} word or more than ${max} word` });}
      } else {
        this.setState({
          wordsNumber,
          value,
          error: ''
        });
        this.props.onChange({ target: { value } });
      }
    }

    render () {
      const {
        value, error, wordsNumber, max
      } = this.state;
      const { name, disabled, countable } = this.props;
      return (
        <div className='text-area-container'>
          <textarea
            onChange={this.onChange}
            value={value}
            name={name}
            disabled={disabled}
            className={`textarea-input-field ${error && 'invalid-field'}`}
          />
          <span className='text-area-small-note'>{countable ? `${wordsNumber} / ${max} word` : `${wordsNumber} word`}</span>
        </div>
      );
    }
}
export default TextAreaInput;

