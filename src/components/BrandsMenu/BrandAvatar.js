import React from 'react';
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

const BrandAvatar = ({ brand, className }) => {
  return (
    <span className={classNames('brand-avatar-wrapper', className)}>
      <Avatar size={32} className='mr-2 brand-avatar-image' src={brand.logo}>{brand.name[0]}</Avatar>
      <Tag className='brand-avatar-subscription'>{getBrandActivePackage(brand)}</Tag>
    </span>
  );
};

export default BrandAvatar;
