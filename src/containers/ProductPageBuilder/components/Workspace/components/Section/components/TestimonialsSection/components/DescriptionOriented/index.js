import React from 'react';

import common from 'components/common';
import avatarLink from 'assets/images/avatar.jpg';
import StarsRanking from 'components/StarsRanking';
import Image from 'components/common/Image';
import { getSectionBackground } from 'helpers/common';

import './style.css';

const {
  FlexBox,
  ResizableInput,
  ResizableTextarea
} = common;

const DescriptionOrientedTestimonial = ({
  author = 'John Doe',
  authorDescription = 'Senior Marketing Manager, University of San Diego',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  rank = 2,
  className,
  orderId: id,
  onChange,
  styles = {},
  ...props
}) => {
  const { nameColor = '#000', jobTitleColor = '#a2a2a2', descriptionColor = 'rgba(0, 0, 0, 0.65)' } = styles;

  const onImageChange = ({ value, ...res }) => {
    onChange({
      target: {
        name: 'content.image',
        value
      }
    });
  };

  const sectionBackground = getSectionBackground(styles);


  return (
    <FlexBox center='v-center margin-v-10 description-oriented-testimonial' style={sectionBackground}>
      <FlexBox column className='full-width'>
        <FlexBox className='margin-left-20' column>
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
            className='medium-text blush-gray max-w-500 margin-v-20'
            style={{ overflow: 'hidden', color: descriptionColor }}
          />
        </FlexBox>

        <FlexBox>
          <Image
            className='description-oriented-testimonial-image'
            image={image}
            name={`testimonial-image-${id}`}
            onChange={onImageChange}
          />
          <FlexBox style={{ overflow: 'hidden' }} column>
            <ResizableInput
              className='ml-2'
              onChange={onChange}
              name='content.author'
              defaultValue='Author Name'
              value={author}
              style={{ fontWeight: 'bold', color: nameColor }}
              maxLength='20'
            />
            <ResizableInput
              className='ml-2 testimonial-content-input text-align-start author-description'
              onChange={onChange}
              name='content.authorDescription'
              defaultValue='Job title'
              value={authorDescription}
              style={{ fontWeight: 'bold', color: jobTitleColor }}
              maxLength='55'
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

DescriptionOrientedTestimonial.propTypes = {};

export default DescriptionOrientedTestimonial;
