import React, { Fragment } from 'react';
import { Testi as Testimonial } from 'components/Testimonials';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';
const { FlexBoxesContainer } = common;


const ProductTestimonials = ({ testimonials = [1, 2], onProductBoostersFieldChange }) => {
  const onTestimonialChange = (id, testimonial) => {
    onProductBoostersFieldChange({
      name: 'testimonials',
      value: testimonials.map((t, i) => (i === id ? testimonial : t))
    });
  };
  return (
    <FlexBoxesContainer className='product-testimonials-container'>
      {testimonials.map((testimonial, id) => (
        <Testimonial
          key={id}
          {...testimonial}
          onChange={onTestimonialChange.bind(this, id)}
        />
      ))}
    </FlexBoxesContainer>
  );
};


const mapStateToProps = ({ product: { boosters: { testimonials } } }) => ({ testimonials });
export default connect(mapStateToProps, producActions)(ProductTestimonials);
