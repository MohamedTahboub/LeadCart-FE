import React, { Component, Fragment } from 'react';
import Testimonials from 'components/Testimonials';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';


const ProductTestimonials = (props) => {
  const onTestimonialsChange = (testimonials) => {
    props.onProductCheckoutFieldChange({
      name: 'testimonials',
      value: testimonials.map(({ text, image }) => ({ text, image })) || []
    });
  };

  return <Testimonials onChange={onTestimonialsChange} />;
};


const mapStateToProps = ({ product: { checkout } }) => ({ checkout });
export default connect(mapStateToProps, producActions)(ProductTestimonials);
