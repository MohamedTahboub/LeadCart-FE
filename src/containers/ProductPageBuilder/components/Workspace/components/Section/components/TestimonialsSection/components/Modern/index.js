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

const ModernTestimonial = ({
  author = 'John Doe',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  rank = 2,
  className,
  orderId: id,
  onChange,
  styles = {},
  ...props
}) => {
  const { backgroundColor = 'transparent', nameColor = '#000', descriptionColor = 'rgba(0, 0, 0, 0.65)' } = styles;

  const onImageChange = ({ value, ...res }) => {
    onChange({
      target: {
        name: 'content.image',
        value
      }
    });
  };

  return (
    <FlexBox center='modern-testimonial margin-v-10 h-center' style={{ backgroundColor }} wrappable>
      <Image
        className='modern-testimonial-image'
        image={image}
        name={`testimonial-image-${id}`}
        onChange={onImageChange}
      />

      <FlexBox flex column className='margin-left-20 full-width modern-testimonial-content'>
        <FlexBox center='v-center'>
          <ResizableInput
            onChange={onChange}
            name='content.author'
            defaultValue='Author Name'
            value={author}
            style={{ fontWeight: 'bold', color: nameColor }}
            maxLength='20'
          />
        </FlexBox>

        <ResizableTextarea
          onChange={onChange}
          name='content.value'
          defaultValue='testimonial content'
          value={content}
          className='medium-text blush-gray max-w-500 margin-v-20'
          style={{ overflow: 'hidden', color: descriptionColor }}
        />


        <StarsRanking
          name='content.rank'
          rank={rank}
          max={5}
          onChange={onChange}
        />
      </FlexBox>


    </FlexBox>
  );
};

ModernTestimonial.propTypes = {};

export default ModernTestimonial;
