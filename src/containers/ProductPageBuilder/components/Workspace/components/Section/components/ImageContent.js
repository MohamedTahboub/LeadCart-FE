import React, { useRef } from 'react';
import clx from 'classnames';
import defaultDropImage from 'assets/images/upload-image.png';
import common from 'components/common';
import FlexibleBox from 'components/FlexibleBox';
import { useContext } from '../../../../../actions';
const { InputRow: { AddImage } } = common;

const ImageContent = ({
  className,
  section = {},
  parentSectionId
}) => {
  const inputRef = useRef(null);
  const { actions } = useContext();
  const { styles = {}, content = {} } = section;
  const classNames = clx({
    'image-section': true,
    [className]: className
  });

  const onImageChange = (image) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'content.value',
        value: image
      }
    });
  };

  const onUpload = () => {
    inputRef.current.click();
  };


  const onSizeChange = (size) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'styles.height',
        value: size.height
      }
    });
  };

  return (
    <FlexibleBox
      size={{ height: styles.height }}
      className={classNames}
      onResizeStop={onSizeChange}
      showOnParentHover
      holdResize={!!parentSectionId}
    >
      <img
        src={content.value || defaultDropImage}
        alt='product asset'
        data-tip='Double Click to Upload'
        data-delay-show={1000}
        className='image-section'
        onDoubleClick={onUpload}
        role='presentation'
      />
      <AddImage
        inputRef={inputRef}
        subLabel='Logo'
        source='product_image'
        className='hiden-element'
        name='logo'
        onUploaded={onImageChange}
      />
    </FlexibleBox>
  );
};

ImageContent.propTypes = {};

export default ImageContent;
