import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import './style.css';
require('prismjs/components/prism-jsx');

const CodeEditor = ({
  name,
  value,
  onChange,
  style = {},
  ...props
}) => {
  const styes = {
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 12,
    ...style
  };

  const onValueChange = (value) => {
    onChange({
      target: {
        name,
        value
      }
    });
  };

  return (
    <Editor
      className='code-editor'
      value={value}
      onValueChange={onValueChange}
      highlight={(code) => highlight(code, languages.jsx)}
      padding={10}
      draggable={false}
      style={styes}
      {...props}
    />
  );

};

CodeEditor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
export default CodeEditor;
