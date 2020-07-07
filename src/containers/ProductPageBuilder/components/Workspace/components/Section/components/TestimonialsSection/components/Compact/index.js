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

const CompactTestimonial = ({
  author = 'Click to edit Author name',
  authorDescription = 'Click to edit job title',
  authorDescriptionExtra = 'Click to edit job description',
  authorCountry = 'Click to edit country of residence',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  verifyingParty = 'Verified by Endorsal.io',
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
    <FlexBox className='compact-testimonial-section'>
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
          style={{ minWidth: '400px' }}
          className='medium-text blush-gray max-w-500 margin-v-20 text-align-center'
        />
        <FlexBox spaceBetween>
          <ResizableInput
            className='ml-2'
            onChange={onChange}
            name='content.author'
            defaultValue='Author Name'
            value={author}
            style={{ fontWeight: 'bold' }}
          />
          <StarsRanking
            name='content.rank'
            rank={rank}
            max={5}
            onChange={onChange}
          />
        </FlexBox>
        <ResizableInput
          className='ml-2 testimonial-content-input text-align-start verifying-party-input'
          onChange={onChange}
          name='content.authorDescription'
          defaultValue='Works at Xalion'
          value={authorDescription}
          style={{ fontWeight: 'bold' }}
        />
        <ResizableInput
          className='ml-2 testimonial-content-input text-align-start verifying-party-input'
          onChange={onChange}
          name='content.authorDescriptionExtra'
          defaultValue='Works at Xalion'
          value={authorDescriptionExtra}
          style={{ fontWeight: 'bold' }}
        />
        <ResizableInput
          className='ml-2 testimonial-content-input text-align-start verifying-party-input'
          onChange={onChange}
          name='content.authorCountry'
          defaultValue='Austin, Tx'
          value={authorCountry}
          style={{ fontWeight: 'bold' }}
        />
        <ResizableInput
          className='ml-2 testimonial-content-input text-align-start verifying-party-input'
          onChange={onChange}
          name='content.verifyingParty'
          defaultValue='Verified by Endorsal.io'
          value={verifyingParty}
          style={{ fontWeight: 'bold' }}
        />
      </FlexBox>
    </FlexBox>
  );
};

CompactTestimonial.propTypes = {};

export default CompactTestimonial;
