import React from 'react';
import avatarLink from 'assets/images/avatar.jpg';
import Image from 'components/common/Image';
import { EditableField } from 'components/common/Inputs';

import './style.css';

const ClassicTestimonial = ({
  author = 'Click to edit Author name',
  value: content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  className,
  orderId: id,
  onChange,
  ...props
}) => {
  const onImageChange = ({ value, ...res }) => {
    props.onChange({
      target: {
        name: 'content.image',
        value
      }
    });
  };
  return (
    <div className={`testimonial-item margin-h-10 ${className}`}>
      <Image
        className='testimonial-author-image'
        image={image}
        name={`testimonial-image-${id}`}
        onChange={onImageChange}
      />
      <EditableField
        onChange={onChange}
        name='content.author'
        defaultValue='Author Name'
        value={author}
        className='testimonial-author light-input'
      />
      <EditableField
        textarea
        onChange={onChange}
        name='content.value'
        defaultValue='testimonial content'
        value={content}
        className='testimonial-content-input'
      />
    </div>
  );
};


export default ClassicTestimonial;