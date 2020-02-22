import React from 'react';
import PropTypes from 'prop-types';
import QuillEditor from 'components/QuillEditor';
import { useContext } from '../../../../../actions';
// value={pagePreferences.description}
// onEdit={onEdit}

const TextContent = ({ value, section, ...props }) => {
  const {
    product: {
      sections: []
    } = {},
    actions
  } = useContext();
  // const

  const onChange = (value) => {
    const updatedSection = {
      ...section,
      content: {
        ...section.content,
        value
      }
    };
    actions.updateProductSection(updatedSection);
  };

  return (
    <div {...props}>
      <QuillEditor
        value={value}
        onEdit={onChange}
      />
    </div>
  );
};

TextContent.propTypes = {

};

export default TextContent;
