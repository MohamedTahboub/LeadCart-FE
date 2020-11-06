import React, { useMemo, useRef } from 'react';
import clx from 'classnames';
import defaultDropImage from 'assets/images/upload-image.png';
import common from 'components/common';
import FlexibleBox from 'components/FlexibleBox';
import { useContext } from '../../../../../actions';
const { InputRow: { AddImage } } = common;

const ImageContent = ({
  className,
  section = {}
}) => {
  const inputRef = useRef(null);

  const { actions } = useContext();
  const { styles = {}, content = {} } = section;
  const classNames = clx({
    'image-section': true,
    [className]: className
  });

  const onImageChange = (image) => {
    actions.onSectionFieldChange({
      ...section,
      content: { ...content, value: image }
    });
  };

  const onUpload = () => {
    inputRef.current.click();
  };


  const onSizeChange = (size) => {
    actions.onSectionFieldChange({
      ...section,
      styles: {
        ...(section?.styles || {}),
        height: size.height
      }
    });

  };

  return useMemo(() => (
    <FlexibleBox
      size={{ height: styles.height }}
      className={classNames}
      onResizeStop={onSizeChange}
      showOnParentHover
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
  ), [content.value, inputRef, styles.height]);
};

ImageContent.propTypes = {};

export default ImageContent;
