import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import avatarLink from 'assets/images/avatar.jpg';
import StarsRanking from 'components/StarsRanking';

import './style.css';
const {
  FlexBox
} = common;

const ModernTestimonial = (props) => (
  <FlexBox center='v-center margin-v-10'>
    <img src={avatarLink} alt='' className='modern-testimonial-image' />
    <FlexBox column reverse className='margin-left-20 padding-v-20'>
      <StarsRanking rank={3} max={5} />
      <p className='medium-text blush-gray max-w-500 margin-v-20'>
                    "We've been able to increase our conversion rate to about 27% which I think is pretty
                    solid."
      </p>
      <FlexBox center='v-center'>
        <span className='bold-text dark-blue medium-text'>
                        Michael C.
        </span>
      </FlexBox>
    </FlexBox>
  </FlexBox>
);

ModernTestimonial.propTypes = {

};

export default ModernTestimonial;
