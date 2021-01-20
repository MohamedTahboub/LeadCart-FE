import React from 'react';
import QuillEditor from 'components/QuillEditor';
import { useContext } from '../../../../../actions';
import { getSectionBackground } from 'helpers/common';
// value={pagePreferences.description}
// onEdit={onEdit}

const TextContent = ({
  value,
  section = { styles: {} },
  hasMentions,
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

    actions.onSectionFieldChange(updatedSection);
  };

  if (!section.styles) section.styles = {};
  const style = {
    ...section.styles,
    paddingTop: `${section.styles.paddingTop}px`,
    paddingBottom: `${section.styles.paddingBottom}px`,
    fontSize: `${section.styles.fontSize}px`
  };
  const sectionBackground = getSectionBackground(section.styles);

  return (
    <div {...props} style={{ ...style, ...sectionBackground }}>
      <QuillEditor
        value={value}
        onEdit={onChange}
        isMentionsSupported={hasMentions}
        bounds='#product-builder-window'
      />
    </div>
  );
};

TextContent.propTypes = {};

export default TextContent;
