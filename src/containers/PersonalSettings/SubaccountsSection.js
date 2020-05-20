import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import Section from './Section';
import { PlusOutlined } from '@ant-design/icons';
import { Search } from 'components/Inputs';
import { Button } from 'components/Buttons';
import common from 'components/common';

import './style.css';

const {
  FlexBox,
  Page,
  PageHeader,
  PageContent
} = common;

let _subaccounts = [{
  owner: 'Nour S.',
  email: 'noureldean.sead@gmail.com',
  mainBrand: '5ea02a2338a9780023c7057c',
  package: { type: 'Premium' },
  status: 'active'
}];
Array(3).fill(0).forEach(() => (_subaccounts = _subaccounts.concat(_subaccounts)));

const SubaccountsSection = ({ brands, subaccounts = _subaccounts, dataLoading }) => {
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
    <Page>
      <PageHeader>Sub Accounts</PageHeader>
      <PageContent>
        <FlexBox column className='white-bg p-3 soft-edges'>
          <div className='d-flex justify-space-between mb-2'>
            <Search style={{ width: 250 }} placeholder='Search' onSearch={handleSearch}/>
            <Button type='primary' onClick={() => {}}><PlusOutlined /> New Sub Account</Button>
          </div>
          <Table
            loading={dataLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </FlexBox>
      </PageContent>
    </Page>
  );

};

const mapStateToProps = ({ loading, brands }) => {
  return { dataLoading: loading, brands };
};

export default connect(mapStateToProps, {})(SubaccountsSection);
