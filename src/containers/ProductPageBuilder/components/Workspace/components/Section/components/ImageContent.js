import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import defaultDropImage from 'assets/images/image-drop-area.png';
import common from 'components/common';
import FlexibleBox from 'components/FlexibleBox';
import { useContext } from '../../../../../actions';
const { InputRow: { AddImage } } = common;

const ImageContent = ({
  className,
  section = {},
  onUpdateDragging,
  value: imageSrc = defaultDropImage
}) => {
  const inputRef = useRef(null);

  const { actions } = useContext();
  const { styles = {} } = section;
  const classNames = clx({
    'image-section': true,
    [className]: className
  });

  // const sectionStyle = {
  //   paddingTop: `${styles.paddingTop}px`,
  //   paddingBottom: `${styles.paddingBottom}px`,
  // };

  // const imageStyles = {
  //   height: `${styles.height}px`,
  //   width: `${styles.width}px`
  // };

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


  const onResizeStart = () => {
    onUpdateDragging(true);
  };
  const onResizeStop = () => {
    onUpdateDragging(false);
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
      onResize={onSizeChange}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
      showOnParentHover
    >
      <img
        src={imageSrc}
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
