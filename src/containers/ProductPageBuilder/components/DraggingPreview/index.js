import React from 'react';
import { DragPreviewImage } from 'react-dnd';
import textImage from 'assets/images/previews/text-section.png';
import imageSectionImage from 'assets/images/previews/image-section.png';
import videoImage from 'assets/images/previews/video-section.png';
import layersImage from 'assets/images/previews/layers-section.png';

const defaultImage = textImage;

const images = {
  text: textImage,
  image: imageSectionImage,
  video: videoImage,
  layout: layersImage,
};

export default ({ connect, type }) => {
  const previewImage = images[type] || defaultImage;
  return (
    <DragPreviewImage
      connect={connect}
      src={previewImage}
    // className='section-drag-preview text-drag-preview'
    />
  );
};
