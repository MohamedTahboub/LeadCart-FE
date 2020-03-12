import React, { Component } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  InputRow,
  Button,
  FlexBoxesContainer
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
          [name]: value,
          error: ''
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
      const { error, ...passwords } = this.state.passwordsModel;
      this.props.onChangeAccountPassword(
        passwords,
        {
          onSuccess: () => {
            this.setState({ passwordsModel: {} });
          },
          onFailed: (message) => {
            this.setState({ passwordsModel: { error: message } });
          }
        }
      );
    }

    onChangeAccountDetails = () => {
      const { firstName, lastName } = this.state.detailsModel;

      this.props.onChangeAccountDetails({ firstName, lastName });
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
        passwordsModel: { error: PwdError = '' },
      } = this.props;
      return (
        <Page>
          <PageHeader>
            <MainTitle>Account</MainTitle>
          </PageHeader>
          <PageContent>
            <FlexBoxesContainer>
              <SmallFormContainer onSubmit={this.onChangeAccountDetails} title='profile'>

                <InputRow className='account-form-input'>
                  <InputRow.Label error={errors.firstName}>First Name</InputRow.Label>
                  <InputRow.TextField
                    name='firstName'
                    value={user.firstName}
                    onChange={this.onDetailsFieldsChange}
                    error={errors.firstName}
                  />
                </InputRow>
                <InputRow className='account-form-input'>
                  <InputRow.Label error={errors.lastName}>Last Name</InputRow.Label>
                  <InputRow.TextField
                    name='lastName'
                    value={user.lastName}
                    onChange={this.onDetailsFieldsChange}
                    error={errors.lastName}
                  />
                </InputRow>
                <InputRow className='account-form-input'>
                  <InputRow.Label error={errors.email}>Email</InputRow.Label>
                  <InputRow.TextField
                    disabled
                    name='email'
                    value={user.email}
                  />
                </InputRow>
              </SmallFormContainer>
              <SmallFormContainer onSubmit={this.onChangePassword} title='Password'>
                <InputRow className='account-form-input'>
                  <InputRow.Label>Current Password</InputRow.Label>
                  <InputRow.TextField
                    type='password'
                    name='currentPassword'
                    onChange={this.onPasswordsFieldsChange}
                    error={errors.currentPassword}
                  />
                </InputRow>
                <InputRow className='account-form-input'>
                  <InputRow.Label>New Password</InputRow.Label>
                  <InputRow.TextField
                    error={errors.newPassword}
                    type='password'
                    name='newPassword'
                    onChange={this.onPasswordsFieldsChange}
                  />
                </InputRow>
                <InputRow className='account-form-input'>
                  <InputRow.Label>Confirm Password</InputRow.Label>
                  <InputRow.TextField
                    error={errors.newPasswordConfirmation}
                    type='password'
                    name='newPasswordConfirmation'
                    onChange={this.onPasswordsFieldsChange}
                  />
                </InputRow>
                {PwdError && <div className='error-message'>{PwdError}</div>}
              </SmallFormContainer>

            </FlexBoxesContainer>
          </PageContent>
        </Page>
      );
    }
}
const mapStateToProps = ({ account, user: { user } }) => ({
  user,
  passwordsModel: account.passwordsModel || {},
  detailsModel: account.detailsModel || {}
});
export default connect(mapStateToProps, accountActions)(Account);
