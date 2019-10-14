import React from 'react';
import PropTypes from 'prop-types';
import TextEditorToolBar from 'components/TextEditorToolbar';

const EditableField = (props) => (
  <TextEditorToolBar text='' {...props} />
);

EditableField.propTypes = {

};

export default EditableField;
