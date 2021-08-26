import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SearchInput } from 'components/common/Inputs';
import common from 'components/common';
import moment from 'moment';
import { Modal } from 'components/Modals';
import * as agencyActions from 'actions/agency';
import { notification } from 'libs';
import { includesIgnoreCase } from 'libs';
import clx from 'classnames';
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

  const onSubAccountRemoveAttempt = (agentId, { hasPassedTheAllowedDeletionPeriod, isRemovalPending }) => () => {

    if (isRemovalPending)
      return notification.failed('Your request to delete this Sub-Account is still pending');

    const payload = { id: agentId };
    if (hasPassedTheAllowedDeletionPeriod) {
      props.deleteSubAccount(payload, {
        onSuccess: () => {
          notification.success('Sub-Account deleted permanently');
        },
        onFailed: (message) => {
          notification.failed(message);
        }
      });
    } else {
      props.requestSubAccountDeletion(payload, {
        onSuccess: () => {
          notification.success('Sub Account removal has been requested, it will take 48 hours to be able to remove the Sub-Account permanently.');
        },
        onFailed: (message) => {
          notification.failed(message);
        }
      });
    }
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
      align: 'center',
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
      align: 'center',
      render: (_, { _id: id, active, accountStatus = {} }) => {
        const isRemovalRequested = Boolean(accountStatus.date);
        const hasPassedTheInterval = moment(accountStatus.date).add(2, 'days').isBefore();
        const hasPassedTheAllowedDeletionPeriod = isRemovalRequested && hasPassedTheInterval;
        const isRemovalPending = isRemovalRequested && !hasPassedTheInterval;

        const subAccountDeleteBtnClassNames = clx('ml-2', {
          'primary-btn': !hasPassedTheAllowedDeletionPeriod,
          'danger-btn': hasPassedTheAllowedDeletionPeriod,
          'awaiting-btn': !hasPassedTheAllowedDeletionPeriod && isRemovalRequested,
          'disabled': isRemovalPending
        });

        return (
          (
            <FlexBox flexStart center='h-center small-text'>
              <Button
                size='small'
                onClick={onUpdateSubAccountStatus(id, !active)}
                className={active ? 'green-color' : 'gray-bg'}
              >
                {active ? 'Deactivate' : 'Activate'}
              </Button>

              <Button
                className={subAccountDeleteBtnClassNames}
                onClick={onSubAccountRemoveAttempt(id, { isRemovalRequested, hasPassedTheAllowedDeletionPeriod, isRemovalPending })}
              >
                {isRemovalRequested ? (hasPassedTheAllowedDeletionPeriod ? 'Remove Permanently' : 'Removal is Pending') : 'Request a removal'}
              </Button>
            </FlexBox>
          )
        );
      }
    }
  ];
  return (
    <Page>
      <PageHeader>Sub Accounts</PageHeader>
      <PageContent>
        <FlexBox column className='white-bg p-3 soft-edges'>
          <FlexBox center='v-center' spaceBetween className='mb-2'>
            <SearchInput style={{ width: 250 }} placeholder='Search' onSearch={handleSearch} />
            <CreditsStatus credits={credits} />
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
    </Page>
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
