import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Search } from 'components/Inputs';
import { Button } from 'components/Buttons';
import common from 'components/common';
import { Modal } from 'components/Modals';
import * as agencyActions from 'actions/agency';
import { notification } from 'libs';

import './style.css';

const {
  FlexBox,
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  InputRow
} = common;

const SubaccountsSection = ({ brands, subaccounts = [], dataLoading, ...props }) => {
  const [filter, setFilter] = useState('');
  const [dataSource, setDataSource] = useState(subaccounts);
  const [isCreateSubaccountModalVisible, setCreateSubaccountModalVisible] = useState(false);
  const [newSubaccountForm, setNewSubaccountForm] = useState({});

  const handleSubaccountFormChange = (event) => {
    const { target: { name, value } } = event;
    setNewSubaccountForm({ ...newSubaccountForm, [name]: value });
  };

  const toggleSubaccountModal = () => setCreateSubaccountModalVisible(!isCreateSubaccountModalVisible);

  const handleSearch = (value) => setFilter(value);

  const onCreateSubAccount = () => {
    props.onCreateSubAccount(
      newSubaccountForm,
      {
        onSuccess: () => {
          notification.success('Subaccount created');
          toggleSubaccountModal();
        },
        onFailed: (error) => notification.failed(error)
      }
    );
  };

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
            <Button type='primary' onClick={toggleSubaccountModal}><PlusOutlined /> New Sub Account</Button>
          </div>
          <Table
            loading={dataLoading}
            columns={columns}
            dataSource={dataSource.filter((column) => column.name.includes(filter))}
            pagination={false}
          />
        </FlexBox>
      </PageContent>
      {
        isCreateSubaccountModalVisible && (
          <Modal
            onClose={toggleSubaccountModal}
            isVisible={isCreateSubaccountModalVisible}
            className='sub-account-modal'
          >
            <form className='sub-account-form'>
              <MainTitle className='margin-b-40'>Create Sub-Accounts</MainTitle>
              <InputRow>
                <InputRow.Label>
                  First Name:
                </InputRow.Label>
                <InputRow.TextField
                  name='firstName'
                  onChange={handleSubaccountFormChange}
                  value={newSubaccountForm.firstName}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Last Name:
                </InputRow.Label>
                <InputRow.TextField
                  name='lastName'
                  onChange={handleSubaccountFormChange}
                  value={newSubaccountForm.lastName}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  SubDomain:
                </InputRow.Label>
                <InputRow.TextField
                  name='subDomain'
                  onChange={handleSubaccountFormChange}
                  value={newSubaccountForm.subDomain}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Email Address:
                </InputRow.Label>
                <InputRow.TextField
                  name='email'
                  onChange={handleSubaccountFormChange}
                  value={newSubaccountForm.email}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>

              <Button onClick={onCreateSubAccount} className='primary-color margin-with-float-right'>
                <i className='fas fa-plus' />
                {' '}
                Invite
              </Button>
            </form>
          </Modal>
        )
      }
    </Page>
  );

};

const mapStateToProps = ({ loading, brands }) => {
  return { dataLoading: loading, brands };
};

export default connect(mapStateToProps, agencyActions)(SubaccountsSection);
