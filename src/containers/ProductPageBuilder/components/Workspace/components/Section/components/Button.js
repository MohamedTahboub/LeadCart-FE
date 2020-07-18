import React from 'react';
import common from 'components/common';
import clx from 'classnames';
import { useContext } from '../../../../../actions';

const {
  Button,
  ResizableInput,
  FlexBox
} = common;

const ButtonSection = ({
  value,
  section = {},
  ...props
}) => {
  const { actions = {}, state: { modals: { sectionSetting } = {} } } = useContext();
  const { content = {}, styles = {}, actions: buttonActions } = section;
  const { position } = styles;

  const onChange = ({ target: { value } }) => {
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

  const buttonStyle = {
    display: 'flex',
    backgroundColor: styles.backgroundColor
  };
  const buttonTextStyle = {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: '16px'
  };
  const containerClasses = clx(`align-${position}`, 'truncate');
  const buttonClasses = clx({
    'primary-color': true,
    'justified': position === 'justified'
  });
  return (
    <FlexBox {...props} className={containerClasses}>
      <Button className={buttonClasses} style={buttonStyle}>
        <ResizableInput
          onChange={onChange}
          value={content.value}
          style={buttonTextStyle}
        />
      </Button>
    </FlexBox>
  );
};

ButtonSection.propTypes = {};

export default ButtonSection;
