import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import Section from './Section';
import { PlusOutlined } from '@ant-design/icons';
import { Search } from 'components/Inputs';
import { Button } from 'components/Buttons';

import './style.css';

const SubaccountsSection = ({ brands, subaccounts, dataLoading }) => {
  const [filter, setFilter] = useState('');
  const [dataSource, setDataSource] = useState(subaccounts);

  const handleSearch = (value) => setFilter(value);

  useEffect(() => {
    setDataSource(subaccounts.filter((subaccount) => subaccount.owner.toLowerCase().includes(filter.toLowerCase())));
  }, [subaccounts, filter]);

  const columns = [
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (text, record) => (
        <div className='d-col align-center'>
          <div>{text}</div>
          <span>{record.email}</span>
        </div>
      )
    }, {
      title: 'Brand Name (main)',
      dataIndex: 'mainBrand',
      key: 'mainBrand',
      render: (brandId) => {
        const targetBrand = brands.find(({ id }) => id === brandId);
        if (targetBrand)
          return <span>{targetBrand.name}</span>;
      }
    }, {
      title: 'Package',
      dataIndex: 'package',
      key: 'package',
      render: (_, record) => <span>{record.package.type}</span>
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color='#87d068'>{status}</Tag>
    }, {
      title: 'Controls',
      dataIndex: null,
      key: 'controls',
      render: () => <span>-</span>
    }
  ];
  return (
    <Section title='Sub Accounts'>
      <div className='d-flex justify-space-between mb-2'>
        <Search style={{ width: 250 }} placeholder='Search' onSearch={handleSearch}/>
        <Button type='primary' onClick={() => {}}><PlusOutlined /> New brand</Button>
      </div>
      <Table
        loading={dataLoading}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </Section>
  );
};

const mapStateToProps = ({ loading }) => {
  return { dataLoading: loading };
};

export default connect(mapStateToProps, {})(SubaccountsSection);
