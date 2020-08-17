import React from 'react';
import { DragPreviewImage } from 'react-dnd';

import * as previewImages from './dragingImages';
const defaultImage = previewImages.textImage;

const images = {
  heading: previewImages.headingImage,
  text: previewImages.textImage,
  image: previewImages.imageSectionImage,
  spacer: previewImages.spacerImage,
  video: previewImages.videoImage,
  button: previewImages.buttonImage,
  // layout: previewImages.layoutImage,
  bumpOffer: previewImages.bumpOfferImage,
  shippingDetails: previewImages.shippingDetailsImage,
  couponSection: previewImages.couponImage,
  testimonialsSection: previewImages.testimonialsImage,
  featuresSection: previewImages.featuresImage,
  guaranteeWidget: previewImages.guaranteeImage,
  countDownWidget: previewImages.countdownImage,
  progressbarWidget: previewImages.progressbarImage,
  productMarkWidget: previewImages.pageBadgeImage,
  grid: previewImages.gridImage
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
