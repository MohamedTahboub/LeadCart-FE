import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import avatarLink from 'assets/images/avatar.jpg';
import StarsRanking from 'components/StarsRanking';
import Image from 'components/common/Image';

import './style.css';
const {
  FlexBox,
  EditableField,
  ResizableInput,
  ResizableTextarea
} = common;

const ModernTestimonial = ({
  author = 'Click to edit Author name',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  rank = 2,
  className,
  orderId: id,
  onChange,
  ...props
}) => {
  // const onChange = ({ target: { value, name } }) => {
  //   props.onChange({
  //     target: {
  //       name: id,
  //       value: {
  //         author,
  //         content,
  //         image,
  //         [name]: value
  //       }
  //     }
  //   });
  // };

  const onImageChange = ({ value, ...res }) => {
    onChange({
      target: {
        name: 'content.image',
        value
      }
    });
  };

  return (
    <FlexBox center='v-center margin-v-10'>
      <Image
        // className='testimonial-author-image'
        className='modern-testimonial-image'
        image={image}
        name={`testimonial-image-${id}`}
        onChange={onImageChange}
      />
      <FlexBox column reverse className='margin-left-20'>
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
        <FlexBox center='v-center'>
          <ResizableInput
            onChange={onChange}
            name='content.author'
            defaultValue='Author Name'
            value={author}
            style={{
              fontWeight: 'bold'
            }}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

ModernTestimonial.propTypes = {

};

export default ModernTestimonial;