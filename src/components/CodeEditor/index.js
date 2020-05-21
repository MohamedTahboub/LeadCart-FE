import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import dedent from 'dedent';
import './style.css';
require('prismjs/components/prism-jsx');

const CodeEditor = ({
  name,
  value,
  onChange,
  style = {},
  withIndent,
  ...props
}) => {


  const styes = {
    fontFamily: '"Fira code", "Fira Mono", monospace',
    fontSize: 12,
    ...style
  };

  const codeText = withIndent ? dedent(value) : value;
  return useMemo(() => {

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
        value={codeText}
        onValueChange={onValueChange}
        highlight={(code) => highlight(code, languages.markup)}
        padding={10}
        style={styes}
        {...props}
      />
    );
  }, [codeText, name, onChange, props, styes]);
};

CodeEditor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
export default CodeEditor;
