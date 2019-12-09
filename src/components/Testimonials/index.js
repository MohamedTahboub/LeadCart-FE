import React from 'react';
import avatarLink from 'assets/images/avatar.jpg';

import Image from 'components/common/Image';
import { EditableField } from 'components/common/Inputs';
import './style.css';

const TestimonialElement = ({
  author = 'Click to edit Author name',
  content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image = avatarLink,
  className,
  id,
  onDelete,
  ...props
}) => {
  const onChange = ({ target: { value, name } }) => {
    props.onChange({
      target: {
        name: id,
        value: {
          author, content, image, [name]: value
        }
      }
    });
  };


  const onImageChange = ({ value, ...res }) => {
    props.onChange({
      target: {
        name: id,
        value: { author, content, image: value }
      }
    });
  };
  return (
    <div className={`testimonial-item ${className}`}>
      <Image
        className='testimonial-author-image'
        image={image}
        name={`testimonial-image-${id}`}
        onChange={onImageChange}
      />
      <EditableField
        onChange={onChange}
        name='author'
        defaultValue='Author Name'
        value={author}
        className='testimonial-author light-input'
      />
      <EditableField
        textarea
        onChange={onChange}
        name='content'
        defaultValue='testimonial content'
        value={content}
        className='testimonial-content-input'
      />
      <span onClick={() => onDelete(id)} className='template-testimonial-delete'>
        <i className='fas fa-trash-alt' />
      </span>
    </div>
  );
};


export const Testi = TestimonialElement;
