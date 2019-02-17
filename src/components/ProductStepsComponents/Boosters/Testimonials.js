import React, { Fragment } from 'react';
import { Testi as Testimonial } from 'components/Testimonials';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';

const { FlexBoxesContainer } = common;

const t = [
  {
    author: 'Eslam',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatum debitis distinctio, quisquam vel nobis nulla dolor'
  },
  {
    author: 'Ahmad',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatum debitis distinctio, quisquam vel nobis nulla dolor'
  },
];
const ProductTestimonials = ({ testimonials = [], onProductBoostersFieldChange }) => {
  const onTestimonialsChange = (testimonials) => {
    onProductBoostersFieldChange({
      name: 'testimonials',
      value: testimonials.map(({ text, image }) => ({ text, image })) || []
    });
  };

  const onTestimonialChange = (...arg) =>{
    console.log(arg)
  }
  return (
    <FlexBoxesContainer className='product-testimonials-container'>
      {t.map((w, id) => <Testimonial key={id} {...w} onChange={(e) => onTestimonialChange(e)} />)}
    </FlexBoxesContainer>
  );
};


const mapStateToProps = ({ product: { boosters: { testimonials = [] } } }) => ({ testimonials });
export default connect(mapStateToProps, producActions)(ProductTestimonials);
