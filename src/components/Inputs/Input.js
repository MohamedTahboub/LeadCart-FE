import React from 'react';
import { Input } from 'antd';
import classNames from 'classnames';

export default ({ className, ...props }) => <Input {...props} className={classNames(className)} />;
