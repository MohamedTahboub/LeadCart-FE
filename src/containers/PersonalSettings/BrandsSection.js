import React from 'react';
import { Avatar, Table } from 'antd';
import config from '../../config';

import './style.css';

const BrandsSection = ({ brands }) => {
  console.log({ brands });
  const columns = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'brandAvatar',
      width: 52,
      render: (text, record) => {
        if (record.logo) return <Avatar src={record.logo}/>;
        else return <Avatar>{record.name[0]}</Avatar>;
      }
    },
    {
      title: 'Brand name',
      dataIndex: 'name',
      key: 'brandName'
    },
    {
      title: 'Subscription',
      dataIndex: null,
      key: 'subscription',
      render: (text, record) => <span>{record.activePackage.type}</span>
    },
    {
      title: 'Price',
      dataIndex: null,
      key: 'price',
      render: (text, record) => {
        const packagePlanPrice = config.packagesPlans[record.activePackage.type.toLowerCase()].price[record.activePackage.period];
        return <span>{packagePlanPrice}$/{record.activePackage.period === 'Monthly' ? 'mo' : 'ye'}</span>;
      }
    }
  ];
  return <Table size='small' columns={columns} dataSource={brands} pagination={false} />;
};

export default BrandsSection;
