import React, { Component, Fragment } from 'react';
import Testimonials, { Testi } from 'components/Testimonials';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

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
const ProductTestimonials = ({ testimonials, onProductBoostersFieldChange }) => {
  const onTestimonialsChange = (testimonials) => {
    onProductBoostersFieldChange({
      name: 'testimonials',
      value: testimonials.map(({ text, image }) => ({ text, image })) || []
    });
  };

  return (
    <Fragment>
      <Testimonials list={testimonials} onChange={onTestimonialsChange} />

      {t.map((w) => <Testi {...w} />)}
    </Fragment>
  );
};


const mapStateToProps = ({ product: { boosters: { testimonials = [] } } }) => ({ testimonials });
export default connect(mapStateToProps, producActions)(ProductTestimonials);
