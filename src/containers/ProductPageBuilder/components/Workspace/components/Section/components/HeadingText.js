import React from 'react';
import QuillEditor from 'components/QuillEditor';
import { useContext } from '../../../../../actions';
// value={pagePreferences.description}
// onEdit={onEdit}

const HeadingText = ({
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
    if (props.onChange) return props.onChange(updatedSection);

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
        headingMode
      />
    </div>
  );
};

HeadingText.propTypes = {};

export default HeadingText;
