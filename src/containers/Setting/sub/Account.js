import React, { Component } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';

const {
  InputRow, MainBlock, Button, FlexBoxesContainer, MainTitle
} = common;


const SmallFormContainer = ({
  children, title, onSubmit, props
}) => (
  <div className='small-form-container'>
    {title && <MainTitle>{title}</MainTitle>}
    <div className='small-form-content'>
      {children}
    </div>
    <div className='small-form-controlls'>
      <Button onClick={onSubmit} classes=' primary-color'>
                    Update
      </Button>
    </div>
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

    render () {
      const {
        detailsModel: {
          firstName, lastName, email, errors = {}
        },
        passwordsModel: {
          currentPassword, newPassword, newPasswordConfirmation, pwd_errors
        }
      } = this.props;
      return (

        <React.Fragment>
          <MainBlock
            title='System Emails'
            blockHandel={(
              <Button classes='save-changes-btn'>
                            Save Changes

              </Button>
            )
            }
          >
            <InputRow>
              <InputRow.Label>New Order</InputRow.Label>
              <InputRow.Note
                content='This email is sent every time a customer buys a product.'
              >
                <InputRow.SwitchInput />
              </InputRow.Note>
            </InputRow>
            <InputRow>
              <InputRow.Label> Failed Charge</InputRow.Label>
              <InputRow.Note
                content="This email is sent each time a customer's subscription payment fails to charge."
              >
                <InputRow.SwitchInput />
              </InputRow.Note>
            </InputRow>
            <InputRow>
              <InputRow.Label>New Affiliate</InputRow.Label>
              <InputRow.Note
                content='This email is sent each time a new affiliate applies. If auto-approval is enabled, this will not be sent.'
              >
                <InputRow.SwitchInput />
              </InputRow.Note>
            </InputRow>
          </MainBlock>
          <FlexBoxesContainer>
            <SmallFormContainer onSubmit={this.onChangeAccountDetails} title='profile'>

              <InputRow>
                <InputRow.Label error={errors.firstName}>First Name</InputRow.Label>
                <InputRow.SmallInput name='firstName' onChange={this.onDetailsFieldsChange} error={errors.firstName}></InputRow.SmallInput>
              </InputRow>
              <InputRow>
                <InputRow.Label error={errors.lastName}>Last Name</InputRow.Label>
                <InputRow.SmallInput name='lastName' onChange={this.onDetailsFieldsChange} error={errors.lastName}></InputRow.SmallInput>
              </InputRow>
              <InputRow>
                <InputRow.Label error={errors.email}>Email</InputRow.Label>
                <InputRow.SmallInput name='email' onChange={this.onDetailsFieldsChange} error={errors.email}></InputRow.SmallInput>
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
          </FlexBoxesContainer>
        </React.Fragment>
      );
    }
}
const mapStateToProps = ({ account }) => ({
  passwordsModel: account.passwordsModel,
  detailsModel: account.detailsModel
});
export default connect(mapStateToProps, accountActions)(Account);
