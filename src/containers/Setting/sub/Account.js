import React, { Component } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';

const {
  InputRow,
  MainBlock,
  Button,
  FlexBoxesContainer,
  MainTitle
} = common;


const SmallFormContainer = ({
  children, title, onSubmit, props
}) => (
  <div className='small-form-container'>
    {title && <MainTitle>{title}</MainTitle>}
    <div className='small-form-content'>
      {children}
    </div>
    {onSubmit && (
      <div className='small-form-controlls'>
        <Button onClick={onSubmit} className=' primary-color'>
          Update
        </Button>
      </div>
    )}
  </div>
);
class Account extends Component {
  state = {
    passwordsModel: {},
    detailsModel: {}
  }

  onPasswordsFieldsChange = ({ target: { value, name } }) => {
    this.setState({
      passwordsModel: {
        ...this.state.passwordsModel,
        [name]: value
      }
    });
  }

  onDetailsFieldsChange = ({ target: { value, name } }) => {
    this.setState({
      detailsModel: {
        ...this.state.detailsModel,
        [name]: value
      }
    });
  }

  onChangePassword = () => {
    this.props.onChangeAccounPassword(this.state.passwordsModel);
  }

  onChangeAccountDetails = () => {
    this.props.onChangeAccountDetails(this.state.detailsModel);
  }

  componentDidMount = () => {
    const { firstName, lastName, email } = this.props.user;
    this.setState({
      detailsModel: { firstName, lastName, email }
    });
  }

  render () {
    const {
      user,
      detailsModel: { errors = {} },
      passwordsModel: {
        currentPassword, newPassword, newPasswordConfirmation, pwd_errors
      }
    } = this.props;
    return (

      <React.Fragment>
        <FlexBoxesContainer className='small-forms-container'>
          <SmallFormContainer onSubmit={this.onChangeAccountDetails} title='profile'>

            <InputRow>
              <InputRow.Label error={errors.firstName}>First Name</InputRow.Label>
              <InputRow.SmallInput name='firstName' value={user.firstName} onChange={this.onDetailsFieldsChange} error={errors.firstName}></InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label error={errors.lastName}>Last Name</InputRow.Label>
              <InputRow.SmallInput name='lastName' value={user.lastName} onChange={this.onDetailsFieldsChange} error={errors.lastName}></InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label error={errors.email}>Email</InputRow.Label>
              <InputRow.SmallInput name='email' value={user.email} onChange={this.onDetailsFieldsChange} error={errors.email}></InputRow.SmallInput>
            </InputRow>
          </SmallFormContainer>
          <SmallFormContainer onSubmit={this.onChangePassword} title='Password'>
            <InputRow>
              <InputRow.Label>Current Password</InputRow.Label>
              <InputRow.SmallInput
                type='password'
                name='currentPassword' onChange={this.onPasswordsFieldsChange}
                error={errors.currentPassword}
              >
              </InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>New Password</InputRow.Label>
              <InputRow.SmallInput
                error={errors.newPassword}
                type='password' name='newPassword' onChange={this.onPasswordsFieldsChange}
              >
              </InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Confirm Password</InputRow.Label>
              <InputRow.SmallInput
                error={errors.newPasswordConfirmation}
                type='password' name='newPasswordConfirmation' onChange={this.onPasswordsFieldsChange}
              >
              </InputRow.SmallInput>
            </InputRow>
          </SmallFormContainer>
          <SmallFormContainer title='Account Deactivation'>
            <InputRow>
              <InputRow.Label>Deactivate the account</InputRow.Label>
              <Button
                className='warning-btn'
                onClick={this.deactivateAccount}
              >
Deactivate

              </Button>
            </InputRow>
          </SmallFormContainer>
        </FlexBoxesContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ account, user: { user } }) => ({
  user,
  passwordsModel: account.passwordsModel || {},
  detailsModel: account.detailsModel || {}
});
export default connect(mapStateToProps, accountActions)(Account);
