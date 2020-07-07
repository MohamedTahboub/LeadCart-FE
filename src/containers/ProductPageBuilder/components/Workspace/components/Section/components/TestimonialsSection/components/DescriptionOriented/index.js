import React from 'react';
import PropTypes from 'prop-types';
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

const DescriptionOrientedTestimonial = ({
  author = 'Click to edit Author name',
  authorDescription = 'Click to edit job title',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  rank = 2,
  className,
  orderId: id,
  onChange,
  ...props
}) => {


  const onImageChange = ({ value, ...res }) => {
    onChange({
      target: {
        name: 'content.image',
        value
      }
    });
  };

  return (
    <FlexBox center='v-center margin-v-10 description-oriented-testimonial'>
      <FlexBox column className='margin-left-20'>
        <StarsRanking
          name='content.rank'
          rank={rank}
          max={5}
          onChange={onChange}
        />
        <ResizableTextarea
          onChange={onChange}
          name='content.value'
          defaultValue='testimonial content'
          value={content}
          style={{ minWidth: '400px' }}
          className='medium-text blush-gray max-w-500 margin-v-20'
        />
        <FlexBox>
          <Image
            className='description-oriented-testimonial-image'
            image={image}
            name={`testimonial-image-${id}`}
            onChange={onImageChange}
          />
          <FlexBox column>
            <ResizableInput
              className='ml-2'
              onChange={onChange}
              name='content.author'
              defaultValue='Author Name'
              value={author}
              style={{ fontWeight: 'bold' }}
            />
            <ResizableInput
              className='ml-2 testimonial-content-input text-align-start'
              onChange={onChange}
              name='content.authorDescription'
              defaultValue='Job title'
              value={authorDescription}
              style={{ fontWeight: 'bold' }}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

DescriptionOrientedTestimonial.propTypes = {};

export default DescriptionOrientedTestimonial;
