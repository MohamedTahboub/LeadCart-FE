import React from 'react';
import PropTypes from 'prop-types';
import QuillEditor from 'components/QuillEditor';
import common from 'components/common';
import clx from 'classnames';
import { useContext } from '../../../../../actions';

const {
  Button,
  EditableField,
  FlexBox
} = common;

// value={pagePreferences.description}
// onEdit={onEdit}

const ButtonSection = ({
  value,
  section = {},
  ...props
}) => {
  const { actions = {} } = useContext();
  const { content = {}, styles = {} } = section;
  const { position } = styles;
  // const

  const onChange = ({ target: { value } }) => {
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

  const style = {
    backgroundColor: styles.backgroundColor,
  };
  const containerClasses = clx({
    [`align-${position}`]: position,
  });
  const buttonClasses = clx({
    'primary-color': true,
    'justified': position === 'justified'
  });
  return (
    <FlexBox {...props} className={containerClasses}>
      <Button className={buttonClasses} style={style}>
        <EditableField
          onChange={onChange}
          value={content.value}
          textarea
          style={style}
        />
      </Button>
    </FlexBox>
  );
};

ButtonSection.propTypes = {

};

export default ButtonSection;
