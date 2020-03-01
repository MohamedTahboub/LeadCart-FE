import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import defaultDropImage from 'assets/images/image-drop-area.png';
import common from 'components/common';
import { useContext } from '../../../../../actions';
const { InputRow: { AddImage } } = common;


const ImageContent = ({
  className,
  section = {},
  value: imageSrc = defaultDropImage
}) => {
  const inputRef = useRef(null);

  const { actions } = useContext();
  const { styles = {} } = section;
  const classNames = clx({
    'image-section': true,
    [className]: className,
  });

  const sectionStyle = {
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
  };

  const imageStyles = {
    height: `${styles.height}px`,
    width: `${styles.width}px`
  };

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

  return (
    <div
      className={classNames}
      style={sectionStyle}
    >
      <img
        src={imageSrc}
        style={imageStyles}
        alt='product asset'
        className='image-section'
        onClick={onUpload}
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
    </div>
  );
};

ImageContent.propTypes = {

};

export default ImageContent;
