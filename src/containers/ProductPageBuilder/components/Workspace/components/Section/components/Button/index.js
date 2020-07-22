import React from 'react';
import common from 'components/common';
import clx from 'classnames';
import { useContext } from '../../../../../../actions';
import ButtonWithText from './components/ButtonWithText';
import ButtonWithImage from './components/ButtonWithImage';

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
  const { actions = {} } = useContext();
  const { content = {}, styles = {}, actions: buttonActions } = section;
  const { image, layout, editor } = content;
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

  const onImageChange = (image) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.image',
        value: image.value
      }
    });
  };
  const onEditorChange = (editor) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.editor',
        value: editor
      }
    });
  };

  const buttonStyle = {
    borderTopLeftRadius: content.borderTopLeftRadius,
    borderTopRightRadius: content.borderTopRightRadius,
    borderBottomLeftRadius: content.borderBottomLeftRadius,
    borderBottomRightRadius: content.borderBottomRightRadius,
    display: 'flex',
    borderStyle: styles.borderStyle || 'none',
    borderColor: styles.borderColor || '#FFF',
    boxShadow: content.hasShadow ? `${content.boxShadowOffsetX || 0}px ${content.boxShadowOffsetY || 0}px ${content.boxShadowBlur || 0}px ${styles.shadowColor || '#FFF'}` : '',
    backgroundColor: styles.backgroundColor
  };
  const buttonTextStyle = {
    color: styles.foregroundColor || '#FFF',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: '16px'
  };
  const containerClasses = clx('button-section-wrapper', `justify-${position === 'left' ? 'start' : position === 'right' ? 'end' : 'center'}`, 'truncate');
  const buttonClasses = clx({
    'primary-color': true,
    'justified': position === 'justified',
    'align-items-center': true
  });
  const iconStyles = {
    borderRadius: content.iconBorderRadius || 0,
    padding: content.iconBorderRadius * 0.1,
    ...(content.iconPlacement === 'left' ? {
      marginLeft: content.iconBorderRadius / -2,
      marginRight: 8
    } : content.iconPlacement === 'right' ? {
      marginRight: content.iconBorderRadius / -2,
      marginLeft: 8
    } : content.iconPlacement === 'snapped-left' ? {
      width: 34,
      height: 34,
      padding: 4,
      borderRadius: 0,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    } : {
      width: 34,
      height: 34,
      padding: 4,
      borderRadius: 0,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5
    }),
    backgroundColor: styles.iconBackgroundColor || 'transparent'
  };
  const icon = content.iconPlacement !== 'none' && content.icon;

  const iconComponent = (
    icon && <img alt='icon' src={icon} className='button-icon' style={iconStyles} />
  );
  const buttonComponent = (
    <>
      {content.iconPlacement === 'snapped-left' && iconComponent}
      <Button className={buttonClasses} style={buttonStyle}>
        {content.iconPlacement === 'left' && iconComponent}
        <ResizableInput
          onChange={onChange}
          value={value}
          style={buttonTextStyle}
        />
        {content.iconPlacement === 'right' && iconComponent}
      </Button>
      {content.iconPlacement === 'snapped-right' && iconComponent}
    </>
  );

  return (
    <FlexBox {...props} className={containerClasses}>
      {
        ['withTextLeft', 'withTextRight'].includes(layout) ? (
          <ButtonWithText
            layout={layout}
            containerClasses={containerClasses}
            buttonComponent={buttonComponent}
            editor={editor}
            onEditorChange={onEditorChange}
            section={section}
          />
        ) : ['withImageLeft', 'withImageRight'].includes(layout) ? (
          <ButtonWithImage
            layout={layout}
            containerClasses={containerClasses}
            buttonComponent={buttonComponent}
            editor={image}
            onEditorChange={onImageChange}
            section={section}
          />
        ) : (
          buttonComponent
        )
      }
    </FlexBox>
  );
};

ButtonSection.propTypes = {};

export default ButtonSection;
