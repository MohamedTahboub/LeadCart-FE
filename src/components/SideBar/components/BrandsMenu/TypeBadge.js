import React from 'react';
import clx from 'classnames';

import './style.css';


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


const TypeBadge = ({ brand, isActiveBran }) => {
  const brandType = getBrandType(brand);
  const brandPackage = getBrandActivePackage(brand);
  return (
    <span className={clx('sidebar-brand-option-package-type', { 'active-sidebar-brand-option-package-type': isActiveBran })} >
      {brandType ?
        <span className='uppercase'>{`${brandType}-Account`}</span>
        :
        brandPackage
      }
    </span>
  );
};

export default TypeBadge;
