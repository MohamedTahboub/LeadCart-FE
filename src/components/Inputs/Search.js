import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';

export default ({ className, ...props }) => <Input.Search {...props} className={classNames(className)} />;
