import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Avatar, Table } from 'antd';
import { Search } from 'components/Inputs';
import { Button } from 'components/Buttons';
import { NewBrandModal } from './components';
import { FaTrash } from 'react-icons/fa';
import Section from '../Section';
import config from 'config';
import { notification } from 'libs';
import * as brandsActions from 'actions/brands';
import { PlusOutlined } from '@ant-design/icons';
import { CreditsStatus } from '../common';
import moment from 'moment';

const getPackagePrice = (pkg = {}) => {
  const packageType = pkg.type && pkg.type.toLowerCase();
  const packageDetails = config.packagesPlans[packageType] || {};
  return packageDetails.price ? (packageDetails.price[pkg.period] || 0) : 0;
};

const BrandsSection = ({ brands, credits, dataLoading, createBrand, user }) => {
  const [dataSource, setDataSource] = useState(brands);
  const [filter, setFilter] = useState('');
  const [isCreateBrandModalOpen, setCreateModalOpen] = useState(false);
  const columns = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'brandAvatar',
      width: 52,
      render: (text, record = {}) => {
        const [name = ''] = record.name;
        if (record.logo) return <Avatar src={record.logo} />;
        else return <Avatar>{name}</Avatar>;
      }
    }, {
      title: 'Brand name',
      dataIndex: 'name',
      key: 'brandName'
    }, {
      title: 'Package',
      dataIndex: null,
      key: 'package',
      render: (text, record = {}) => <span>{record.activePackage && record.activePackage.type}</span>
    }, {
      title: 'Subscription',
      dataIndex: null,
      key: 'subscription',
      render: (text, record = {}) => {
        const activePackage = record.activePackage || {};
        const packagePlanPrice = getPackagePrice(activePackage);
        return <span>{packagePlanPrice}$/{activePackage.period === 'Monthly' ? 'mo' : 'ye'}</span>;
      }
    }, {
      key: 'date',
      render: (text, { createdAt } = {}) => (
        <span>{moment(createdAt).format('MMM DD YYYY')}</span>
      )
    }, {
      key: 'date',
      render: (text, { createdAt } = {}) => (
        <FaTrash
          color='tomato'
          className='item-clickable delete-link disabled-icon'
          data-tip='Brands Deletion is disabled temporarily'
        />
      )
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
    setDataSource(brands.filter(({ name = '' } = {}) => name.toLowerCase().includes(filter.toLowerCase())));
  }, [brands, filter]);

  return (
    <Section title='Brands'>
      <div className='d-flex justify-space-between mb-2'>
        <Search style={{ width: 250 }} placeholder='Search' onSearch={handleSearch} />
        <CreditsStatus credits={credits} />
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
          <NewBrandModal
            onClose={toggleCreateModalOpen}
            onCreate={onCreateBrand}
            credits={credits}
            user={user}
          />
        )
      }
    </Section>
  );
};

const mapStateToProps = ({ user: { user = {} } = {}, loading, redemption: { credits } = {} }) => {
  return { dataLoading: loading, credits, user };
};

export default connect(mapStateToProps, brandsActions)(BrandsSection);
