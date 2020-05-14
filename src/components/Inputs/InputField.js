import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';

export default ({ className, label, ...props }) => (
  <div className={classNames(className, 'mb-2')}>
    <label>{label}</label>
    <Input {...props} />
  </div>
);
