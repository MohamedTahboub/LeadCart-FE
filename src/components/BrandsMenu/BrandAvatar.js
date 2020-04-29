import React from 'react';
import { Avatar, Tag } from 'antd';
import classNames from 'classnames';
import './index.css';

const BrandAvatar = ({ brand, className }) => {
  const subscriptionShort = brand.activePackage.type === 'Free' ? 'FREE'
    : brand.activePackage.type === 'Premium' ? 'PREMIUM'
      : brand.activePackage.type === 'Pro' ? 'PRO'
        : brand.activePackage.type === 'Basic' ? 'BASIC'
          : 'Sub';
  return (
    <span className={classNames('brand-avatar-wrapper', className)}>
      <Avatar size={32} className='mr-2 brand-avatar-image'>B</Avatar>
      <Tag className='brand-avatar-subscription'>{subscriptionShort}</Tag>
    </span>
  );
};

export default BrandAvatar;
