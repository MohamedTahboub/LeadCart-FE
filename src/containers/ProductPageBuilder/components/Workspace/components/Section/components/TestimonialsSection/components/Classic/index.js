import React from 'react';

import avatarLink from 'assets/images/avatar.jpg';
import Image from 'components/common/Image';
import common from 'components/common';
import { getSectionBackground } from 'helpers/common';

import './style.css';

const {
  ResizableInput,
  ResizableTextarea
} = common;

const ClassicTestimonial = ({
  author = 'John Doe',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  className,
  orderId: id,
  onChange,
  styles = {},
  ...props
}) => {
  const { nameColor = '#000', descriptionColor = 'rgba(0, 0, 0, 0.65)' } = styles;

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
    <div className={`testimonial-item margin-h-auto ${className}`} style={sectionBackground}>
      <Image
        className='testimonial-author-image'
        image={image}
        name={`testimonial-image-${id}`}
        onChange={onImageChange}
      />
      <ResizableInput
        onChange={onChange}
        name='content.author'
        defaultValue='Author Name'
        value={author}
        className='testimonial-author light-input'
        maxLength='20'
        style={{ fontWeight: 'bold', textAlign: 'center', color: nameColor }}
      />
      <ResizableTextarea
        textarea
        onChange={onChange}
        name='content.value'
        defaultValue='testimonial content'
        value={content}
        className='testimonial-content-input'
        style={{ overflow: 'hidden', color: descriptionColor }}
      />
    </div>
  );
};


export default ClassicTestimonial;
