import React, { useState } from 'react';
import Avatar from 'components/common/Avatar';
import './style.css';


const TestimonialElement = ({
  author = 'Click to edit Author name',
  content = 'click to edit , Write the testimonial content,what the author want to say about your product',
  image,
  name,
  onChange
}) => {
  const initState = {
    changed: false,
    editAuthor: false,
    editContent: false,
    testimonial: {
      author,
      content,
      image
    }
  };

  const [state, setState] = useState(initState);

  const updateTestimonialModel = ({ name, value }) => {
    const { testimonial } = state;
    setState({
      ...state,
      testimonial: {
        ...testimonial,
        [name]: value
      }
    });
  };
  const onToggleEditField = (fieldName) => {
    const fieldValue = state[fieldName];
    const newState = {
      ...state,
      [fieldName]: !fieldValue
    };
    setState(newState);
    onChange(newState.testimonial);
  };

  const onEnterKey = (fieldName, keyName = '') => {
    if (keyName === 'Enter') onToggleEditField(fieldName);
  };


  const onFieldChange = ({ target: { name, value } }) => {
    if (value) updateTestimonialModel({ name, value });
  };

  const onAuthorImageChange = (uploadedImage = {}) => {
    if (name === uploadedImage.name) {
      const newState = { ...state, testimonial: { ...state.testimonial, image: uploadedImage.image } };
      setState(newState);
      onChange(newState.testimonial);
    }
  };

  const { testimonial: { author: tAuthor, content: tContent, image: tImage }, editAuthor, editContent } = state;

  return (
    <div className='testimonial-item'>
      <Avatar
        className='testamonial-author'
        image={tImage}
        name={name}
        onChange={onAuthorImageChange}
      />
      <div className='testimonial-author'>
        {editAuthor
          ? (
            <input
              ref={(ref) => ref && ref.focus()}
              onBlur={(e) => onToggleEditField('editAuthor')}
              onKeyDown={(e) => onEnterKey('editAuthor', e.key)}
              onChange={onFieldChange}
              type='text'
              name='author'
              value={tAuthor}
              className='light-input'
            />
          )
          : <span onClick={() => onToggleEditField('editAuthor')} className='t-author-name'>{tAuthor}</span>
        }
      </div>
      {editContent
        ? (
          <textarea
            onBlur={() => onToggleEditField('editContent')}
            onKeyDown={(e) => onEnterKey('editContent', e.key)}
            onChange={onFieldChange}
            name='content'
            value={tContent}
            width='auto'
            className='testimonial-content-input'
          />
        )
        : (
          <div onClick={() => onToggleEditField('editContent')} className='testamonial-content'>
            {tContent}
          </div>
        )}
    </div>
  );
};


export const Testi = TestimonialElement;
