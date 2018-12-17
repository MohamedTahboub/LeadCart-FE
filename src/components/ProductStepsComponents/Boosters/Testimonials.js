import React, { Component, Fragment } from 'react';
import Testimonials from 'components/Testimonials';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';


const ProductTestimonials = ({ testimonials, onProductBoostersFieldChange }) => {
  const onTestimonialsChange = (testimonials) => {
    onProductBoostersFieldChange({
      name: 'testimonials',
      value: testimonials.map(({ text, image }) => ({ text, image })) || []
    });
  };

  return <Testimonials list={testimonials} onChange={onTestimonialsChange} />;
};


const mapStateToProps = ({ product: { boosters: { testimonials = [] } } }) => ({ testimonials });
export default connect(mapStateToProps, producActions)(ProductTestimonials);
