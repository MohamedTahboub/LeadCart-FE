import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Feature = ({ children, plus }) => (
  <div className={`package-card-feature ${plus ? 'plus' : ''} `}>{children}</div>
);

const PackageCard = ({
  name,
  plus,
  package: {
    price = {},
    features = []
  } = {},
  onSelect,
  interval,
  activePackage
}) => (
    <div
      onClick={() => onSelect(name)}
      className={`package-card ${activePackage === name ? 'active' : ''}`}
    >
      <div className='package-card-header'>
        <div className='package-card-title'>{name}</div>

      </div>
      <div className='package-card-features'>
        {features.map((f, id) => (
          <Feature key={f + id} plus={plus && id === 0}>{f}</Feature>
        ))}
      </div>
      <div className='package-card-footer'>
        <div className='package-card-price'>
          <span className='amount'>
            $
            {' '}
            {price[interval]}
          </span>
          /
          {' '}
          {interval}
        </div>
      </div>
    </div>
  );

PackageCard.propTypes = {

};

export default PackageCard;
