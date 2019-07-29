import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Feature = ({ children }) => (
  <div className='package-card-feature'>{children}</div>
);

const PackageCard = ({
  name,
  prices,
  onSelect,
  features = [],
  activePackage
}) => {
  const [interval, setInterval] = useState('monthly');


  return (
    <div
      onClick={() => onSelect(name)}
      className={`package-card ${activePackage === name ? 'active' : ''}`}
    >
      <div className='package-card-header'>
        <div className='package-card-title'>{name}</div>
        <div className='package-card-price'>
          <span className='amount'>
                        $
            {' '}
            {prices[interval]}
          </span>
                    /
          {' '}
          {interval}
        </div>
      </div>
      <div className='package-card-features'>
        {features.map((f, id) => (
          <Feature key={f + id}>{f}</Feature>
        ))}
      </div>
    </div>
  );
};

PackageCard.propTypes = {

};

export default PackageCard;
