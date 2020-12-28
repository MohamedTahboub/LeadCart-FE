import React from 'react';
import clx from 'classnames';
import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';
import common from 'components/common';
import { useContext } from '../../../../../../actions';
import QuillEditor from 'components/QuillEditor';

import './style.css';
const { FlexBox, ResizableImage } = common;

const Figure = ({
  className,
  section = {}
}) => {
  const { actions } = useContext();

  const {
    id,
    styles = {},
    content: {
      image: imageSrc = guaranteeBadge1,
      text: textContent
    } = {}
  } = section;

  const { theme = 'right-theme', imageSize: { width, height } = {} } = styles;


  const sectionClasses = clx({
    'margin-h-20': true,
    'text-center full-width': theme === 'center-theme'
  });


  const onChange = ({ name, value }) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name,
        value
      }
    });
  };
  const onImageChange = ({ value }) => {
    onChange({
      name: 'content.image',
      value
    });
  };

  const onContentChange = (value) => {
    onChange({
      name: 'content.text',
      value
    });
  };


  const onSizeChange = ({ key, height, width }) => {
    const value = key === 'height' ? height : width;
    onChange({ name: `styles.imageSize.${key}`, value });
  };

  return (
    <FlexBox
      center='h-center'
      className={clx('figure-section', className)}
      reverse={theme === 'right-theme'}
    >

      <ResizableImage
        className='figure-section-image'
        src={imageSrc}
        alt='figure illustration photo'
        name={`figure-image-${id}`}
        onChange={onImageChange}
        onResizeStop={onSizeChange}
        size={{ width, height }}
        verticalResizable={theme === 'right-theme' ? 'left' : 'right'}
        horizontalResizable
      />

      <FlexBox flex column className={sectionClasses}>
        <QuillEditor
          value={textContent}
          onEdit={onContentChange}
          bounds='#product-builder-window'
        />
      </FlexBox>
    </FlexBox>
  );
};

Figure.propTypes = {};
Figure.defaultProps = {};

export default Figure;
