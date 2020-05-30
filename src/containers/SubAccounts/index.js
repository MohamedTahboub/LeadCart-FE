import React, { useEffect, useState } from 'react';
import common from 'components/common';
import Table from 'components/common/Tables';
import { Modal } from 'components/Modals';
import * as agencyActions from 'actions/agency';
import { notification } from 'libs';
import { connect } from 'react-redux';
import './style.css';
const {
  MainTitle,
  MiniButton,
  SmallButton,
  Button,
  Dialog,
  InputRow,
  Page,
  PageHeader,
  PageContent
} = common;

const Agency = ({
  packageType,
  subAccounts,
  history,
  ...props
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [account, setAccount] = useState({});


  const toggleModal = () => {
    setShowCreateModal((show) => {
      if (!show) setAccount({});
      return !show;
    });
  };

  const onChange = ({ target: { name, value } }) => {
    setAccount({
      ...account,
      [name]: value
    });
  };

  const onCreateSubAccount = () => {
    props.onCreateSubAccount(
      account,
      {
        onSuccess: () => {
          toggleModal();
        },
        onFailed: () => {

        }
      }
    );
  };

  // componentDidUpdate = () => {
  //   const { subAccountModel: { email } } = this.state;
  //   if (this.props.subAccounts.find((sub) => sub.email === email)) {
  //     setTimeout(() => {
  //       this.setState({
  //         subAccountModel: {}, isModalVisable: false
  //       });
  //     }, 350);
  //   }
  // }

  // componentDidMount() {
  //   const { packageType, history } = this.props;
  //   if (packageType !== 'Agency') history.push('/');
  // }

  // const showDeleteModal = (id) => {
  //   setShowDeleteModal(id);
  // };

  const onDeleteSubAccount = () => {
    // const { deleteModal } = this.state;
    props.deleteSubAccount({ id: showDeleteModal }, {
      onSuccess: () => {
        notification.success('subaccount deleted successfully');
        setShowDeleteModal();
      },
      onFailed: (message) => {
        notification.failed(message);

      }
    });
  };

  useEffect(() => {
    if (packageType !== 'Agency') return history.push('/');
  }, [subAccounts, packageType, history]);

  // const toggleWarningModal = () => setShowWarningModal(show => !show)


  // const {
  //   subAccountModel, isModalVisable, deleteModal, isShowWarringDialog
  // } = this.state;

  const onUpdateSubAccountStatus = (agentId, active) => () => {
    props.changeSubAccountStatus({ agentId, active });
  };

  return (
    <Page>
      <PageHeader>
        <MainTitle>Sub-Accounts</MainTitle>
        <Button
          key='subAccountModal'
          onClick={toggleModal}
          className='primary-color'
        >
          <i className='fas fa-plus' />
          New Sub Account
        </Button>
      </PageHeader>
      <PageContent>
        <Table>
          <Table.Head>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>Email Address</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {subAccounts.map((agent, orderInList) => {
              if (!agent || agent === null) agent = {};
              const {
                firstName = 'not set',
                lastName = 'not set',
                email,
                active,
                _id: id
              } = agent;
              return (
                <Table.Row key={id} orderInList={orderInList} className='member-table-row'>
                  <Table.Cell mainContent={firstName} />
                  <Table.Cell mainContent={lastName} />
                  <Table.Cell mainContent={email} />
                  <Table.Cell>
                    <SmallButton
                      onClick={onUpdateSubAccountStatus(id, !active)}
                      className={active ? 'green-color' : 'gray-bg'}
                    >
                      {active ? 'Active' : 'Inactive'}
                    </SmallButton>
                  </Table.Cell>
                  <MiniButton
                    toolTip='Delete'
                    className='table-row-delete-btn'
                    iconClass='fa-trash-alt'
                    onClick={() => setShowDeleteModal(id)}
                  />
                </Table.Row>
              );
            })}
          </Table.Body>
          {showDeleteModal && (
            <Dialog
              title='Delete Sub-Account'
              description='Are you sure you want to delete this Sub-Account?'
              show
              onClose={() => setShowDeleteModal('')}
              confirmBtnText='Delete'
              onConfirm={() => onDeleteSubAccount(showDeleteModal)}
            />
          )}
        </Table>
      </PageContent>
      {
        showCreateModal && (
          <Modal
            onClose={toggleModal}
            isVisible={showCreateModal}
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
                  onChange={onChange}
                  value={account.firstName}
                  // error={errors.firstName}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Last Name:
                </InputRow.Label>
                <InputRow.TextField
                  name='lastName'
                  onChange={onChange}
                  value={account.lastName}
                  // error={errors.lastName}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  SubDomain:
                </InputRow.Label>
                <InputRow.TextField
                  name='subDomain'
                  onChange={onChange}
                  value={account.subDomain}
                  // error={errors.subDomain}
                  className='margin-left-30 reset-font-size'
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Email Address:
                </InputRow.Label>
                <InputRow.TextField
                  name='email'
                  onChange={onChange}
                  value={account.email}
                  // error={errors.email}
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

/*
{errors.message && <span className='error-message'>{errors.message}</span>}

<Dialog
onClose={this.hideWarringDialog}
show={isShowWarringDialog}
confirmBtnText='Ok'
confirmBtnClass='primary-color'
confirmBtnIcon={null}
hideCancelBtn
title='Oops, we are so sorry for that!'
description={(
<WarningMessage>
{property('subAccounts.createSubAccount.warning')}
</WarningMessage>
)}
onConfirm={this.hideWarringDialog}
/>
*/
Agency.defaultProps = { subAccounts: [] };

const mapStateToProps = ({ user: { user: { packageType } }, agency: { subAccounts, errors } }) => ({
  packageType,
  subAccounts,
  errors
});
export default connect(mapStateToProps, agencyActions)(Agency);
