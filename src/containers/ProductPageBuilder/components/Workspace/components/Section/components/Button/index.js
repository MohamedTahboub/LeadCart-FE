import React, { Fragment } from 'react';
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
  const { styles = {} } = section;
  const { position, editor, image, layout } = styles;
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
        name: 'styles.image',
        value: image.value
      }
    });
  };
  const onEditorChange = (editor) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'styles.editor',
        value: editor
      }
    });
  };

  const buttonStyle = {
    borderTopLeftRadius: styles.borderTopLeftRadius,
    borderTopRightRadius: styles.borderTopRightRadius,
    borderBottomLeftRadius: styles.borderBottomLeftRadius,
    borderBottomRightRadius: styles.borderBottomRightRadius,
    display: 'flex',
    borderStyle: styles.borderStyle || 'none',
    borderColor: styles.borderColor || '#FFF',
    boxShadow: styles.hasShadow ? `${styles.boxShadowOffsetX || 0}px ${styles.boxShadowOffsetY || 0}px ${styles.boxShadowBlur || 0}px ${styles.shadowColor || '#FFF'}` : '',
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
    borderRadius: styles.iconBorderRadius || 0,
    padding: styles.iconBorderRadius * 0.1,
    ...(styles.iconPlacement === 'left' ? {
      marginLeft: styles.iconBorderRadius / -2,
      marginRight: 8
    } : styles.iconPlacement === 'right' ? {
      marginRight: styles.iconBorderRadius / -2,
      marginLeft: 8
    } : styles.iconPlacement === 'snapped-left' ? {
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
  const icon = styles.iconPlacement !== 'none' && styles.icon;


  const iconComponent = (
    icon && <img alt='icon' src={icon} className='button-icon' style={iconStyles} />
  );
  const buttonComponent = (
    <Fragment>
      {styles.iconPlacement === 'snapped-left' && iconComponent}
      <Button className={buttonClasses} style={buttonStyle}>
        {styles.iconPlacement === 'left' && iconComponent}
        <ResizableInput
          onChange={onChange}
          value={value}
          style={buttonTextStyle}
        />
        {styles.iconPlacement === 'right' && iconComponent}
      </Button>
      {styles.iconPlacement === 'snapped-right' && iconComponent}
    </Fragment>
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
            image={image}
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
