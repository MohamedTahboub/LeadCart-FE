import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PoweredBy = ({ className }) => {

  return (
    <div className={`powered-by-leadcart ${className}`}>
      <a href='https://leadcart.io/' target='_blank' rel='noopener noreferrer'>
        Powered By : LeadCart.io
      </a>
    </div>
  );
};
PoweredBy.propTypes = { className: PropTypes.string };

export default PoweredBy;
