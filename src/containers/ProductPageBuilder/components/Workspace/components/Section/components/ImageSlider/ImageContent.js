import React, { useRef } from 'react';

import common from 'components/common';
import defaultDropImage from 'assets/images/upload-image.png';


const { InputRow: { AddImage } } = common;


export default ({ src, id, section = {}, actions }) => {
  const inputRef = useRef(null);
  const { content = {} } = section;
  const { images = [] } = content;

  const onUpload = () => {
    inputRef.current.click();
  };


  const onImageChange = (src) => {
    const newImagesList = images.map((ele) => {
      if (ele.id !== id)
        return ele;
      else
        return { ...ele, src };
    });


    actions.onSectionFieldChange({
      ...section,
      content: { ...content, images: newImagesList }
    });
  };


  return (
    <div className='image-slider-content' >
      <div className='image-slider-content-image' style={{ backgroundImage: `url(${src || defaultDropImage})` }} onDoubleClick={onUpload} />

      <AddImage
        inputRef={inputRef}
        subLabel='Logo'
        source='product_image'
        className='hiden-element test'
        name='logo'
        onUploaded={onImageChange}
      />
    </div>
  );
};
