import React, { Component } from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import { Modal } from 'components/Modals';
import * as agencyActions from 'actions/agency';
import { connect } from 'react-redux';
import './style.css';
const {
  MainTitle,
  SmallButton,
  Button,
  InputRow,
  Page,
  PageHeader,
  PageContent,
} = common;

const AddNewButton = ({ onClick, ...props }) => (
  <Button onClick={onClick} className='primary-color medium-add-btn explort-csv-btn'>
    <i className='fas fa-plus' />
    {' '}
    Add new
  </Button>
);

class Agency extends Component {
  state = { isModalVisable: false, subAccountModel: {}, created: false }

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

  render () {
    const { errors, subAccounts = [] } = this.props;

    const { subAccountModel } = this.state;
    return (
      <Page>
        <PageHeader>
          <MainTitle>Sub-Accounts</MainTitle>
          <AddNewButton key='subAccountModal' onClick={this.toggleModal} />
        </PageHeader>
        <PageContent>
          <Tabel>
            <Tabel.Head>
              <Tabel.HeadCell>First Name</Tabel.HeadCell>
              <Tabel.HeadCell>Last Name</Tabel.HeadCell>
              <Tabel.HeadCell>Email Address</Tabel.HeadCell>
              <Tabel.HeadCell>status</Tabel.HeadCell>
            </Tabel.Head>
            <Tabel.Body>
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
                  <Tabel.Row key={id} orderInList={orderInList}>
                    <Tabel.Cell
                      mainContent={firstName || 'not set'}
                    />
                    <Tabel.Cell
                      mainContent={lastName || 'not set'}
                    />
                    <Tabel.Cell
                      mainContent={email}
                    />
                    <Tabel.Cell>
                      <SmallButton className='green-color'>Active</SmallButton>
                    </Tabel.Cell>
                  </Tabel.Row>
                );
              })}
            </Tabel.Body>
          </Tabel>
        </PageContent>
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
