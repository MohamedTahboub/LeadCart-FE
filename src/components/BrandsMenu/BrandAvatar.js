import React, { Fragment } from 'react';
import { Avatar, Tag } from 'antd';
import classNames from 'classnames';
import './index.css';

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


const BrandAvatar = ({ brand, className }) => {
  const brandType = getBrandType(brand);
  const brandPackage = getBrandActivePackage(brand);
  return (
    <span className={classNames('brand-avatar-wrapper', className)}>
      <Avatar size={32} className='mr-2 brand-avatar-image' src={brand.logo}>{brand.name[0]}</Avatar>
      <Tag className='brand-avatar-subscription'>
        {brandType ? (
          <span className='bold-text'>{`${brandType} Account`}</span>
        ) : (
          brandPackage
        )}
      </Tag>
    </span>
  );
};

export default BrandAvatar;
