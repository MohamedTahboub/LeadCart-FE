import React from 'react';
import { Table } from 'antd';

import './style.css';

const SubaccountsSection = ({ subaccounts }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Package',
      dataIndex: 'package',
      key: 'package'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ];
  return <Table size='small' columns={columns} dataSource={subaccounts} pagination={false} />;
};

export default SubaccountsSection;
