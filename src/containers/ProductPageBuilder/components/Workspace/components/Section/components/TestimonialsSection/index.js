import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../../../actions';


import './style.css';
import {
  BusinessTestimonial,
  ClassicTestimonial,
  CompactTestimonial,
  DescriptionOrientedTestimonial,
  EdgyTestimonial,
  ModernTestimonial,
  PlainTestimonial
} from './components';

const { LayoutSwitch } = common;


const Testimonial = ({ theme = 'classic', ...props }) => (
  <LayoutSwitch active={theme}>
    <ClassicTestimonial id='classic' {...props} />
    <ModernTestimonial id='modern' {...props} />
    <DescriptionOrientedTestimonial id='description-oriented' {...props} />
    <EdgyTestimonial id='edgy' {...props} />
    <PlainTestimonial id='plain' {...props} />
    <CompactTestimonial id='compact' {...props} />
    <BusinessTestimonial id='business' {...props} />
  </LayoutSwitch>
);
const Testimonials = ({ section = {} }) => {
  const { styles = {}, content = {} } = section;
  const { actions } = useContext();


  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section,
      field: target
    });
  };

  return (
    <Testimonial
      {...content}
      onChange={onChange}
      theme={styles.theme}
    />
  );
};

export default Testimonials;
