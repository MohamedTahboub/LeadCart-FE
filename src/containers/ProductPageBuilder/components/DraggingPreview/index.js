import React from 'react';
import { DragPreviewImage } from 'react-dnd';

import * as previewImages from './dragingImages';
const defaultImage = previewImages.textImage;

const images = {
  text: previewImages.textImage,
  image: previewImages.imageSectionImage,
  video: previewImages.videoImage,
  layout: previewImages.layoutImage,
  bumpOffer: previewImages.bumpOfferImage,
  shippingDetails: previewImages.shippingDetailsImage,
  couponSection: previewImages.couponImage,
  testimonialsSection: previewImages.testimonialsImage,
  featuresSection: previewImages.featuresImage,
  guaranteeWidget: previewImages.guaranteeImage,
  countDownWidget: previewImages.countdownImage,
  progressbarWidget: previewImages.progressbarImage,
  bookmarkWidget: previewImages.pageBadgeImage,
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
