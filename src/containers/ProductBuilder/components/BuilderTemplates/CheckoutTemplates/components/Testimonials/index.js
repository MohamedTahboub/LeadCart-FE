import React, { Fragment } from 'react';
import { Testi as Testimonial } from 'components/Testimonials';

import common from 'components/common';

import './style.css';

const { EditableField, FloatButton } = common;
const Wrapper = ({ className, children, ...props }) => (className ? <div className={className}>{children}</div> : <Fragment>{children}</Fragment>);

const Testimonials = ({
  testimonialsWrapperClassName,
  testimonialClassName,
  testimonials = {},
  ...props
}) => {
  const { enabled, list = [], title = 'Testimonials' } = testimonials;

  const onChange = (name, value) => {
    const newTestimonials = { ...testimonials, [name]: value };
    props.onChange({
      target: {
        name: 'pagePreferences.testimonials',
        value: newTestimonials
      }
    });
  };

  const onTestimonialChange = ({ target: { name, value } }) => {
    const updateMatched = (t, id) => (id === name ? value : t);
    const newList = list.map(updateMatched);
    onChange('list', newList);
  };

  const onDelete = (i) => {
    const newList = list.filter((f, id) => id !== +(i));
    onChange('list', newList);
  };

  const onAdd = () => {
    const newList = [...list, { author: 'edit author name!', content: 'click on text to edit content' }];
    onChange('list', newList);
  };

  const onDisable = () => {
    onChange('enabled', false);
  };

  const onTitleChange = ({ target: { value } }) => {
    onChange('title', value);
  };
  if (!enabled) return null;
  return (
    <div className='product-template-testimonials-container'>

      <h3>
        <EditableField
          name='testimonials'
          defaultValue='Testimonials'
          onChange={onTitleChange}
          value={title}
        />
        <FloatButton onClick={onDisable} position={{ left: 0 }}>
          <i className='fas fa-eye-slash' />
        </FloatButton>
        <FloatButton
          onClick={onAdd}
          position={{
            right: -5,
            left: 'unset',
            top: '0',
            background: 'transparent',
            color: '#4DA1FF'
          }}
        >
          <i className='fas fa-plus-circle' />
        </FloatButton>
      </h3>
      <Wrapper className={testimonialsWrapperClassName}>
        {list.map((i, id) => (
          <Testimonial
            key={id}
            id={id}
            {...i}
            className={testimonialClassName}
            onDelete={onDelete}
            onChange={onTestimonialChange}
          />
        ))}
      </Wrapper>
    </div>
  );
};

export default Testimonials;
