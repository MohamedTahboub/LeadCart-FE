import React from 'react';
// import PropTypes from 'prop-types';
import Feature from '../Custom/Feature';


const Price = ({
  originalPrice,
  interval,
  packageType,
  code = {},
  lastTransaction = {}
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
  if (lastTransaction._id && lastTransaction.name === packageType) {
    dashed = true;
    price = lastTransaction.amount;
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
  activePackage,
  lastTransaction
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
        lastTransaction={lastTransaction}
      />
    </div>
  </div>
);

PackageCard.propTypes = {

};

export default PackageCard;
