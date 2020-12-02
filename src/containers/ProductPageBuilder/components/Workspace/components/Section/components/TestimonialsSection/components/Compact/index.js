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

const CompactTestimonial = ({
  author = 'John Doe',
  authorDescription = 'Senior Marketing Manager, University of San Diego',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  rank = 2,
  orderId: id,
  onChange,
  styles = {}
}) => {
  const { backgroundColor = 'transparent', nameColor = '#000', jobTitleColor = '#a2a2a2', descriptionColor = 'rgba(0, 0, 0, 0.65)' } = styles;

  const onImageChange = ({ value }) => {
    onChange({
      target: {
        name: 'content.image',
        value
      }
    });
  };

  return (
    <FlexBox className='compact-testimonial-section' style={{ backgroundColor }}>
      <Image
        className='compact-testimonial-image'
        image={image}
        name={`testimonial-image-${id}`}
        onChange={onImageChange}
      />
      <FlexBox column className='full-width'>
        <ResizableTextarea
          onChange={onChange}
          name='content.value'
          defaultValue='testimonial content'
          value={content}
          className='medium-text blush-gray max-w-500 margin-v-20 text-align-center'
          style={{ overflow: 'hidden', color: descriptionColor }}
        />
        <FlexBox spaceBetween className='col-on-mobile'>
          <ResizableInput
            className='ml-2'
            onChange={onChange}
            name='content.author'
            defaultValue='Author Name'
            value={author}
            style={{ fontWeight: 'bold', color: nameColor }}
            maxLength='20'
          />
          <StarsRanking
            name='content.rank'
            rank={rank}
            max={5}
            onChange={onChange}
          />
        </FlexBox>
        <ResizableInput
          className='ml-2 testimonial-content-input text-align-start verifying-party-input author-description'
          onChange={onChange}
          name='content.authorDescription'
          defaultValue='Works at Xalion'
          value={authorDescription}
          style={{ fontWeight: 'bold', color: jobTitleColor }}
          maxLength='55'
        />
      </FlexBox>
    </FlexBox>
  );
};

CompactTestimonial.propTypes = {};

export default CompactTestimonial;
