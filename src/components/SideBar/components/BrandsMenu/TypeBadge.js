import React from 'react';

import common from 'components/common';

import './style.css';

const { Badge } = common;

const getBrandActivePackage = ({ activePackage = {}, level } = {}) => {
  if (level) {
    let type = 'Basic';
    if (level >= 2) type = 'Pro';
    if (level >= 4) type = 'Premium';
    return type;
  } else {
    return activePackage.type === 'Free' ? 'FREE'
      : activePackage.type === 'Premium' ? 'PREMIUM'
        : activePackage.type === 'Pro' ? 'PRO'
          : activePackage.type === 'Basic' ? 'BASIC'
            : 'Sub';
  }
};

const getBrandType = ({ type }) => {
  const brandTypes = {
    Admin: '',
    Sub: 'Sub'
  };
  return brandTypes[type] || '';
};


const TypeBadge = ({ brand, className, isActiveBran }) => {
  const brandType = getBrandType(brand);
  const brandPackage = getBrandActivePackage(brand);
  return (
    <Badge type={isActiveBran ? 'normal' : 'primary'} className={className} size='small' >
      {brandType ?
        <span className='uppercase'>{`${brandType}-Account`}</span>
        :
        brandPackage
      }
    </Badge>
  );
};

export default TypeBadge;
