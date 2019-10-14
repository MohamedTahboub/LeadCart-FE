import React from 'react';
import PropTypes from 'prop-types';

const Features = ({
  list,
  title,
  type,
  ...props
}) => (
  <div className='upsell-features-container'>
    <div className='upsell-features-title'>
                Bonuses you get with this offer
    </div>
    <div className='upsell-features-list'>
      <div className='feature-item'>
        <div className='feater-title'>Feature 1</div>
        <div className='feater-content'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
      <div className='feature-item'>
        <div className='feater-title'>Feature 2</div>
        <div className='feater-content'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
      <div className='feature-item'>
        <div className='feater-title'>Feature 3</div>
        <div className='feater-content'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
      <div className='feature-item'>
        <div className='feater-title'>Feature 4</div>
        <div className='feater-content'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
      </div>
    </div>
  </div>
);

Features.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf()),
  title: PropTypes.string
};

Features.defaultProps = {
  value: ''
};

export default Features;
