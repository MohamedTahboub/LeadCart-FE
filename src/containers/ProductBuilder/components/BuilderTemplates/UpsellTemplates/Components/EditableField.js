import React from 'react';
import PropTypes from 'prop-types';
import TextEditorToolBar from 'components/TextEditorToolbar';

const EditableField = ({ value, onEdit, props }) => {
  const onChange = (value) => {
    onEdit(JSON.stringify(value));
  };

  let parsedState;// JSON.parse(value);

  try {
    const x = value.replace(/'/ig, '"');
    parsedState = JSON.parse(x);

    console.log(x);
  } catch (error) {
    console.log(error);
  }
  return (
    <TextEditorToolBar
      rowTextState={parsedState}
      onEdited={onChange}
    // {...props}
    />
  );
};

EditableField.propTypes = {

};

export default EditableField;
