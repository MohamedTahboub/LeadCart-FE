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
import { includesIgnoreCase } from 'libs';

import './style.css';

const hasAgencyAccess = (packageType) => {
  return !!['Premium', 'Agency'].includes(packageType);
};

const {
  FlexBox,
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  InputRow,
  SmallButton
} = common;

const SubaccountsSection = ({
  subaccounts = [],
  dataLoading,
  history,
  packageType,
  ...props
}) => {

  const [filter, setFilter] = useState('');
  const [dataSource, setDataSource] = useState(subaccounts);
  const [isCreateSubaccountModalVisible, setCreateSubaccountModalVisible] = useState(false);
  const [newSubaccountForm, setNewSubaccountForm] = useState({});

  const handleSubaccountFormChange = (event) => {
    const { target: { name, value } } = event;
    setNewSubaccountForm({ ...newSubaccountForm, [name]: value });
  };

  useEffect(() => {
    if (!hasAgencyAccess(packageType)) return history.push('/');
  }, [history, packageType]);


  const toggleSubaccountModal = () => setCreateSubaccountModalVisible(!isCreateSubaccountModalVisible);

  const handleSearch = (value) => setFilter(value);

  const onCreateSubAccount = (e) => {
    e.preventDefault();
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
    setDataSource(subaccounts
      .filter(({ email, firstName, lastName }) =>
        includesIgnoreCase(`${email} ${firstName} ${lastName}`, filter)));
  }, [subaccounts, filter]);


  const onUpdateSubAccountStatus = (agentId, active) => () => {
    props.changeSubAccountStatus({ agentId, active });
  };

  const columns = [
    {
      title: 'Account Owner',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (firstName, { lastName }) => (
        <span>{`${firstName} ${lastName}`}</span>
      )
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => <span>{email}</span>
    }, {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Tag
          color={active ? '#4DA1FF' : 'lightgray'}
        >
          {`${active ? 'ACTIVE' : 'INACTIVE'}`}
        </Tag>
      )
    }, {
      title: 'Controls',
      dataIndex: null,
      key: 'controls',
      render: (_, { _id: id, active }) => (
        <FlexBox flexStart>
          <SmallButton
            onClick={onUpdateSubAccountStatus(id, !active)}
            className={active ? 'green-color' : 'gray-bg'}
          >
            {active ? 'Deactivate' : 'Activate'}
          </SmallButton>
        </FlexBox>
      )
    }
  ];
  return (
    <Page>
      <PageHeader>Sub Accounts</PageHeader>
      <PageContent>
        <FlexBox column className='white-bg p-3 soft-edges'>
          <div className='d-flex justify-space-between mb-2'>
            <Search style={{ width: 250 }} placeholder='Search' onSearch={handleSearch} />
            <Button type='primary' onClick={toggleSubaccountModal}><PlusOutlined /> New Sub Account</Button>
          </div>
          <Table
            loading={dataLoading}
            columns={columns}
            dataSource={dataSource}
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
            <form className='sub-account-form' onSubmit={onCreateSubAccount}>
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

              <Button type='submit' className='primary-color margin-with-float-right'>
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

const mapStateToProps = ({
  loading,
  agency: { subAccounts: subaccounts = [] } = {},
  user: { user: { packageType } }
}) => {
  return {
    dataLoading: loading,
    subaccounts,
    packageType
  };
};

export default connect(mapStateToProps, agencyActions)(SubaccountsSection);
