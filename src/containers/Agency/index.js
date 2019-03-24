import React, { Component } from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import { Modal } from 'components/Modals';
import * as agencyActions from 'actions/agency';
import { connect } from 'react-redux';
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

  componentDidMount() {
    const { level, history } = this.props;
    if (level !== 3) history.push('/');
  }

  render() {
    const { errors, subAccounts = [] } = this.props;
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
              {this.props.subAccounts.map(({
                firstName, lastName, email, active, _id: id
              }, orderInList) => (
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
                      {active
                        ? <SmallButton className='green-color'>Active</SmallButton>
                        : <SmallButton className='gray-color'>Inactive</SmallButton>
                      }
                    </Tabel.Cell>
                  </Tabel.Row>
                ))}
            </Tabel.Body>
          </Tabel>
        </PageContent>
        <Modal onClose={this.toggleModal} isVisible={this.state.isModalVisable}>
          <MainTitle>Create Sub-Accounts</MainTitle>
          <InputRow>
            <InputRow.SmallInput name='firstName' onChange={this.onFieldChange} error={errors.firstName}>First Name</InputRow.SmallInput>
            <InputRow.SmallInput name='lastName' onChange={this.onFieldChange} error={errors.lastName} className='margin-left-30 reset-font-size'>Last Name</InputRow.SmallInput>
          </InputRow>
          <InputRow>
            <InputRow.NormalInput name='email' onChange={this.onFieldChange} error={errors.email}>Email address</InputRow.NormalInput>
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

const mapStateToProps = ({ user: { user: { level } }, agency: { subAccounts, errors } }) => ({
  level,
  subAccounts,
  errors
});
export default connect(mapStateToProps, agencyActions)(Agency);
