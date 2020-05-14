import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames';

export default ({ className, ...props }) => <Table {...props} className={classNames(className)} />;
