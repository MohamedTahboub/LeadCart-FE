import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Avatar, Table } from 'antd';
import { Search } from 'components/Inputs';
import { Button } from 'components/Buttons';
import { CreateModal } from 'containers/Account/components/Brands/components';
import config from '../../config';
import { notification } from 'libs';
import * as brandsActions from 'actions/brands';
import { PlusOutlined } from '@ant-design/icons';

import './style.css';
// I got an error when I imported the section component, also, I replaced the section component with section elements
// import Section from 'Section';


const BrandsSection = ({ brands, dataLoading, createBrand }) => {
  const [dataSource, setDataSource] = useState(brands);
  const [filter, setFilter] = useState('');
  const [isCreateBrandModalOpen, setCreateModalOpen] = useState(false);
  const columns = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'brandAvatar',
      width: 52,
      render: (text, record) => {
        if (record.logo) return <Avatar src={record.logo} />;
        else return <Avatar>{record.name[0]}</Avatar>;
      }
    }, {
      title: 'Brand name',
      dataIndex: 'name',
      key: 'brandName'
    }, {
      title: 'Package',
      dataIndex: null,
      key: 'package',
      render: (text, record) => <span>{record.activePackage.type}</span>
    }, {
      title: 'Subscription',
      dataIndex: null,
      key: 'subscription',
      render: (text, record) => {
        const packagePlanPrice = config.packagesPlans[record.activePackage.type.toLowerCase()].price[record.activePackage.period];
        return <span>{packagePlanPrice}$/{record.activePackage.period === 'Monthly' ? 'mo' : 'ye'}</span>;
      }
    }, {
      key: 'date',
      render: () => <span>06/12/2020</span>
    }
  ];

  const handleSearch = (value) => setFilter(value);
  const toggleCreateModalOpen = () => setCreateModalOpen(!isCreateBrandModalOpen);

  const onCreateBrand = (brand, cb) => {
    const actions = {
      onSuccess: () => {
        notification.success(`${brand.name} Brand Created`);
        cb();
      },
      onFailed: (message) => {
        notification.failed(message);
        cb();
      }
    };
    createBrand(brand, actions);
  };

  useEffect(() => {
    setDataSource(brands.filter((brand) => brand.name.toLowerCase().includes(filter.toLowerCase())));
  }, [brands, filter]);

  return (
    <section title='Brands'>
      <div className='d-flex justify-space-between mb-2'>
        <Search style={{ width: 250 }} placeholder='Search' onSearch={handleSearch} />
        <Button type='primary' onClick={() => setCreateModalOpen(true)}><PlusOutlined /> New brand</Button>
      </div>
      <Table
        className='brands-table'
        loading={dataLoading}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      {
        isCreateBrandModalOpen && (
          <CreateModal onClose={toggleCreateModalOpen} onCreate={onCreateBrand} />
        )
      }
    </section>
  );
};

const mapStateToProps = ({ loading }) => {
  return { dataLoading: loading };
};

export default connect(mapStateToProps, brandsActions)(BrandsSection);
