import React, { Component } from 'react';
import common from 'components/common';
import Table from 'components/common/Tables';
import { Modal } from 'components/Modals';
import * as agencyActions from 'actions/agency';
import { connect } from 'react-redux';
import Dialog from 'components/common/Dialog';
import './style.css';
const {
  MainTitle,
  MiniButton,
  SmallButton,
  Button,
  InputRow,
  Page,
  PageHeader,
  PageContent,
} = common;

const AddNewButton = ({ onClick, ...props }) => (
  <Button onClick={onClick} className='primary-color'>
    <i className='fas fa-plus' />
    {' '}
    New Sub Account
  </Button>
);

class Agency extends Component {
  state = {
    isModalVisable: false, subAccountModel: {}, created: false, deleteModal: ''
  }

  toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

  onFieldChange = ({ target: { name, value } }) => {
    this.setState({
      subAccountModel: {
        ...this.state.subAccountModel,
        [name]: value
      }
    });
  }

  createSubAccount = () => {
    this.props.onCreateSubAccount(this.state.subAccountModel);
  }

  componentDidUpdate = () => {
    const { subAccountModel: { email } } = this.state;
    if (this.props.subAccounts.find((sub) => sub.email === email)) {
      setTimeout(() => {
        this.setState({
          subAccountModel: {}, isModalVisable: false
        });
      }, 350);
    }
  }

  componentDidMount () {
    const { packageType, history } = this.props;
    if (packageType !== 'Agency') history.push('/');
  }

  showDeleteModal = (id) => {
    this.setState({ deleteModal: id });
  }

  onDeleteSubAccount = () => {
    const { deleteModal } = this.state;
    this.props.deleteSubAccount({
      id: deleteModal
    }, {
      onSuccess: () => {
        this.setState({ deleteModal: '' });
      },
      onFailed: (message) => {
      }
    });
  }

  render () {
    const { errors, subAccounts = [] } = this.props;

    const { subAccountModel, deleteModal } = this.state;
    return (
      <Page>
        <PageHeader>
          <MainTitle>Sub-Accounts</MainTitle>
          <AddNewButton key='subAccountModal' onClick={this.toggleModal} />
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
              {this.props.subAccounts.map((agent, orderInList) => {
                if (!agent || agent === null) agent = {};
                const {
                  firstName,
                  lastName,
                  email,
                  active,
                  _id: id
                } = agent;
                return (
                  <Table.Row key={id} orderInList={orderInList} className='member-table-row'>
                    <Table.Cell
                      mainContent={firstName || 'not set'}
                    />
                    <Table.Cell
                      mainContent={lastName || 'not set'}
                    />
                    <Table.Cell
                      mainContent={email}
                    />
                    <Table.Cell>
                      <SmallButton
                        onClick={this.props.changeSubAccountStatus.bind(this, { agentId: id, active: !active })}
                        className={active ? 'green-color' : 'gray-color'}
                      >
                        {active ? 'Active' : 'Inactive'}
                      </SmallButton>
                    </Table.Cell>
                    <MiniButton
                      toolTip='Delete'
                      className='table-row-delete-btn'
                      iconClass='fa-trash-alt'
                      onClick={() => this.showDeleteModal(id)}
                    />
                  </Table.Row>
                );
              })}
            </Table.Body>
            {deleteModal && (
              <Dialog
                title='Delete Sub-Account'
                description='Are you sure you want to delete this Sub-Account?'
                show
                onClose={() => this.showDeleteModal('')}
                confirmBtnText='Delete'
                onConfirm={() => this.onDeleteSubAccount(deleteModal)}
              />
            )}
          </Table>
        </PageContent>
        {this.state.isModalVisable && (
          <Modal onClose={this.toggleModal} isVisible={this.state.isModalVisable}>
            <MainTitle className='margin-b-40'>Create Sub-Accounts</MainTitle>
            <InputRow>
              <InputRow.Label error={errors.firstName}>First Name:</InputRow.Label>
              <InputRow.SmallInput
                name='firstName'
                onChange={this.onFieldChange}
                value={subAccountModel.firstName}
                error={errors.firstName}
                className='margin-left-30 reset-font-size'
              />
            </InputRow>
            <InputRow>
              <InputRow.Label error={errors.lastName}>Last Name:</InputRow.Label>
              <InputRow.SmallInput
                name='lastName'
                onChange={this.onFieldChange}
                value={subAccountModel.lastName}
                error={errors.lastName}
                className='margin-left-30 reset-font-size'
              />
            </InputRow>
            <InputRow>
              <InputRow.Label error={errors.subDomain}>SubDomain:</InputRow.Label>
              <InputRow.SmallInput
                name='subDomain'
                onChange={this.onFieldChange}
                value={subAccountModel.subDomain}
                error={errors.subDomain}
                className='margin-left-30 reset-font-size'
              />
            </InputRow>
            <InputRow>
              <InputRow.Label error={errors.email}>Email Address:</InputRow.Label>
              <InputRow.SmallInput
                name='email'
                onChange={this.onFieldChange}
                value={subAccountModel.email}
                error={errors.email}
                className='margin-left-30 reset-font-size'
              />
            </InputRow>

            {errors.message && <span className='error-message'>{errors.message}</span>}
            <Button onClick={this.createSubAccount} className='primary-color margin-with-float-right'>
              <i className='fas fa-plus' />
              {' '}
              Invite
            </Button>
          </Modal>
        )}
      </Page>
    );
  }
}

const mapStateToProps = ({ user: { user: { packageType } }, agency: { subAccounts, errors } }) => ({
  packageType,
  subAccounts,
  errors
});
export default connect(mapStateToProps, agencyActions)(Agency);
