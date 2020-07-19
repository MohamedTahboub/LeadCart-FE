import React from 'react';
import common from 'components/common';
import clx from 'classnames';
import { useContext } from '../../../../../actions';
import QuillEditor from 'components/QuillEditor';
import Image from 'components/common/Image';

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
    display: 'flex',
    backgroundColor: styles.backgroundColor
  };
  const buttonTextStyle = {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: '16px'
  };
  const containerClasses = clx(`justify-${position === 'left' ? 'start' : position === 'right' ? 'end' : 'center'}`, 'truncate');
  const buttonClasses = clx({
    'primary-color': true,
    'justified': position === 'justified'
  });
  return (
    <FlexBox {...props} className={containerClasses}>
      {
        ['withTextLeft', 'withTextRight'].includes(layout) ? (
          <FlexBox className='fluid py-5' reverse={layout === 'withTextLeft'}>
            <FlexBox className={clx(containerClasses, 'col-6', 'align-center')}>
              <Button className={buttonClasses} style={buttonStyle}>
                <ResizableInput
                  onChange={onChange}
                  value={value}
                  style={buttonTextStyle}
                />
              </Button>
            </FlexBox>
            <FlexBox className='col-6'>
              <QuillEditor
                className='fluid'
                value={editor}
                onEdit={onEditorChange}
                headingMode
                bounds={`[id='${section.id}']`}
              />
            </FlexBox>
          </FlexBox>
        ) : ['withImageLeft', 'withImageRight'].includes(layout) ? (
          <FlexBox className='fluid py-5' reverse={layout === 'withImageLeft'}>
            <FlexBox className={clx(containerClasses, 'col-6', 'align-center')}>
              <Button className={buttonClasses} style={buttonStyle}>
                <ResizableInput
                  onChange={onChange}
                  value={value}
                  style={buttonTextStyle}
                />
              </Button>
            </FlexBox>
            <FlexBox className='col-6'>
              <Image
                className='figure-section-image'
                image={image}
                alt='figure illustration photo'
                name={`figure-image-${section.id}`}
                onChange={onImageChange}
              />
            </FlexBox>
          </FlexBox>
        ) : (
          <Button className={buttonClasses} style={buttonStyle}>
            <ResizableInput
              onChange={onChange}
              value={content.value}
              style={buttonTextStyle}
            />
          </Button>
        )
      }
    </FlexBox>
  );
};

ButtonSection.propTypes = {};

export default ButtonSection;
