import React, { useState } from 'react';
import PropTypes from 'prop-types';


const Feature = ({ children, plus }) => (
  <div
    className={`package-card-feature ${plus ? 'plus' : ''}`}
  >
    {children}
  </div>
);


const Price = ({
  originalPrice,
  interval,
  packageType,
  code = {}
}) => {
  let price = originalPrice;
  let dashed = false;
  if (
    code.applied
    && interval === code.recurringPeriod
    && packageType === code.packageType
  ) {
    price = code.amount;
    dashed = true;
  }

  return (
    <div className='package-card-price'>
      <span className='amount'>
        <span className={dashed ? 'line-though' : ''}>
          {`$${originalPrice}`}
        </span>
        {
          dashed && (
            <span>
              {`$${price}`}
            </span>
          )
        }
      </span>
      {`/${interval}`}
    </div>
  );
};
const PackageCard = ({
  name,
  plus,
  code = {},
  package: {
    price = {},
    features = []
  } = {},
  onSelect,
  interval = 'Monthly',
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
      <Price
        originalPrice={price[interval]}
        interval={interval}
        code={code}
        packageType={name}
      />
    </div>
  </div>
);

PackageCard.propTypes = {

};

export default PackageCard;
