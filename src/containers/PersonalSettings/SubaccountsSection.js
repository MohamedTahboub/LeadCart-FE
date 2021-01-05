import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Search } from 'components/Inputs';
import common from 'components/common';
import { Modal } from 'components/Modals';
import * as agencyActions from 'actions/agency';
import { notification } from 'libs';
import { includesIgnoreCase } from 'libs';
import './style.css';

import { CreditsStatus } from './common';
const hasSubAccountsAccess = (credits) => {
  return credits > 0;
};

const {
  FlexBox,
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  InputRow,
  SmallButton,
  Button
} = common;

const SubAccountsSection = ({
  credits,
  subAccounts = [],
  dataLoading,
  history,
  packageType,
  ...props
}) => {

  const [filter, setFilter] = useState('');
  const [dataSource, setDataSource] = useState(subAccounts);
  const [isCreateSubAccountModalVisible, setCreateSubAccountModalVisible] = useState(false);
  const [newSubAccountForm, setNewSubAccountForm] = useState({});

  const handleSubAccountFormChange = (event) => {
    const { target: { name, value } } = event;
    setNewSubAccountForm({ ...newSubAccountForm, [name]: value });
  };

  useEffect(() => {
    if (!hasSubAccountsAccess(credits)) return history.push('/');
    //eslint-disable-next-line
  }, [history, packageType]);


  const toggleSubAccountModal = () => setCreateSubAccountModalVisible(!isCreateSubAccountModalVisible);

  const handleSearch = (value) => setFilter(value);

  const onCreateSubAccount = (e) => {
    e.preventDefault();
    props.onCreateSubAccount(
      newSubAccountForm,
      {
        onSuccess: () => {
          notification.success('Sub-Account Created');
          toggleSubAccountModal();
        },
        onFailed: (error) => notification.failed(error)
      }
    );
  };

  useEffect(() => {
    setDataSource(subAccounts
      .filter(({ email, firstName, lastName }) =>
        includesIgnoreCase(`${email} ${firstName} ${lastName}`, filter)));
  }, [subAccounts, filter]);


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
    <Fragment>
      <PageContent>
        <FlexBox column className='white-bg p-3 soft-edges'>
          <FlexBox center='v-center' spaceBetween className='mb-2'>
            <Search style={{ width: 250 }} placeholder='Search' onSearch={handleSearch} />
            <CreditsStatus credits={credits}/>
            <FlexBox flexEnd>
              <Button className='primary-color' onClick={toggleSubAccountModal}><PlusOutlined /> New Sub Account</Button>
            </FlexBox>
          </FlexBox>
          <Table
            loading={dataLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          />
        </FlexBox>

      </PageContent>
      {
        isCreateSubAccountModalVisible && (
          <Modal
            onClose={toggleSubAccountModal}
            isVisible={isCreateSubAccountModalVisible}
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
                  onChange={handleSubAccountFormChange}
                  value={newSubAccountForm.firstName}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Last Name:
                </InputRow.Label>
                <InputRow.TextField
                  name='lastName'
                  onChange={handleSubAccountFormChange}
                  value={newSubAccountForm.lastName}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Brand Name:
                </InputRow.Label>
                <InputRow.TextField
                  name='brandName'
                  onChange={handleSubAccountFormChange}
                  value={newSubAccountForm.brandName}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Brand SubDomain:
                </InputRow.Label>
                <InputRow.TextField
                  name='subDomain'
                  onChange={handleSubAccountFormChange}
                  value={newSubAccountForm.subDomain}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Email Address:
                </InputRow.Label>
                <InputRow.TextField
                  name='email'
                  onChange={handleSubAccountFormChange}
                  value={newSubAccountForm.email}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>

              <FlexBox flexEnd>
                <Button type='submit' className='primary-color'>
                  <i className='fas fa-plus' />
                  Invite
                </Button>
              </FlexBox>
            </form>
          </Modal>
        )
      }
    </Fragment>
  );

};

const mapStateToProps = ({
  redemption: { credits = 0 } = {},
  loading,
  agency: { subAccounts = [] } = {},
  user: { user: { packageType } }
}) => {
  return {
    dataLoading: loading,
    subAccounts,
    packageType,
    credits
  };
};

export default connect(mapStateToProps, agencyActions)(SubAccountsSection);
