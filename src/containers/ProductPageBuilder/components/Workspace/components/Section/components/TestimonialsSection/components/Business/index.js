import React from 'react';
import common from 'components/common';
import avatarLink from 'assets/images/avatar.jpg';
import StarsRanking from 'components/StarsRanking';
import Image from 'components/common/Image';

import './style.css';
const {
  FlexBox,
  ResizableInput,
  ResizableTextarea
} = common;

const EdgyTestimonial = ({
  author = 'John Doe',
  authorDescription = 'Senior Marketing Manager, University of San Diego',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  authorCountry = 'Estonia',
  image = avatarLink,
  rank = 2,
  orderId: id,
  onChange,
  styles = {}
}) => {
  const { backgroundColor = 'transparent', nameColor = '#000', jobTitleColor = '#a2a2a2', countryNameColor = '#a2a2a2', descriptionColor = 'rgba(0, 0, 0, 0.65)' } = styles;


  const onImageChange = ({ value }) => {
    onChange({
      target: {
        name: 'content.image',
        value
      }
    });
  };


  return (
    <FlexBox column className='business-testimonial-section' style={{ backgroundColor }}>
      <FlexBox>
        <Image
          className='business-testimonial-image mr-4'
          image={image}
          name={`testimonial-image-${id}`}
          onChange={onImageChange}
        />
        <FlexBox style={{ overflow: 'hidden' }} column>
          <ResizableInput
            className='mb-2'
            onChange={onChange}
            name='content.author'
            defaultValue='Author Name'
            value={author}
            style={{ fontWeight: 'bold', color: nameColor }}
            maxLength='20'
          />
          <ResizableInput
            className='testimonial-content-input text-align-start author-description'
            onChange={onChange}
            name='content.authorDescription'
            defaultValue='Job title'
            value={authorDescription}
            style={{ fontWeight: 'bold', colro: jobTitleColor }}
            maxLength='55'

          />
          <ResizableInput
            className='testimonial-content-input text-align-start'
            onChange={onChange}
            name='content.authorCountry'
            defaultValue='Estonia'
            value={authorCountry}
            style={{ fontWeight: 'bold', color: countryNameColor }}
            maxLength='20'
          />
          <StarsRanking
            name='content.rank'
            rank={rank}
            max={5}
            onChange={onChange}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox column className='full-width'>
        <ResizableTextarea
          onChange={onChange}
          name='content.value'
          defaultValue='testimonial content'
          value={content}
          className='medium-text blush-gray max-w-500 margin-v-20'
          style={{ overflow: 'hidden', color: descriptionColor }}
        />
      </FlexBox>
    </FlexBox>
  );
};

EdgyTestimonial.propTypes = {};

export default EdgyTestimonial;
