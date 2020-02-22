import React from 'react';
import PropTypes from 'prop-types';
import QuillEditor from 'components/QuillEditor';
import { useContext } from '../../../../../actions';
// value={pagePreferences.description}
// onEdit={onEdit}

const TextContent = ({
  value,
  section = { styles: {} },
  ...props
}) => {
  const { actions } = useContext();
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

  if (!section.styles) section.styles = {};
  const style = {
    ...section.styles,
    paddingTop: `${section.styles.paddingTop}px`,
    paddingBottom: `${section.styles.paddingBottom}px`,
    fontSize: `${section.styles.fontSize}px`
  };
  return (
    <div {...props} style={style}>
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
