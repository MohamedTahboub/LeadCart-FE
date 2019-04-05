import React, { Fragment, useState } from 'react';
import common from 'components/common';
import EmailFooterModal from 'components/EmailFooterModal';
import { connect } from 'react-redux';
import { testEmailTypes } from 'constantsTypes'
import * as emailsActions from 'actions/emails'
import * as yup from 'yup';

const {
  InputRow, MainBlock, SmallButton, EditButton
} = common;


const EmailTestButton = ({
  type, className = '', testingType, loading, onClick, ...props
}) => {
  const classNames = `${className} primary-color wide-element ${(type === testingType && loading) ? ' spinner' : ''}`;

  return (
    <SmallButton
      className={classNames}
      onClick={onClick.bind(this, type)}
    >
      Test
    </SmallButton>
  );
};
const Email = (props) => {

  const [showFooterModal, setFooterModal] = useState(false)
  const [testType, setTestType] = useState({})
  const [sourceEmail, setSourceEmail] = useState(props.sourceEmail)
  const [errors, setErrors] = useState({})
  const [versifying, setVersifying] = useState(false)
  const onToggleFooterModal = () => {
    setFooterModal(!showFooterModal)
  }

  const onSourceEmailChange = ({ target: { value } }) => {
    setSourceEmail(value)
    setErrors({ sourceEmail: '' })
  }


  const onEmailVerify = async () => {

    const schema = yup.string().email().required();

    if (!(await schema.isValid(sourceEmail)))
      return setErrors({ sourceEmail: 'invalid email address' })
    setVersifying(true)
    props.verifyEmailSource({ email: sourceEmail }, {
      onSuccess: () => { setVersifying(false) },
      onFailed: () => { setVersifying(false) }
    })
  }

  const onEmailTest = (type) => {
    setTestType({
      testing: true,
      emailTestType: type
    });
    props.testEmail({ type }, {
      onSuccess: () => {
        setTestType({
          testing: false,
          emailTestType: ''
        });
      },
      onFailed: () => {
        setTestType({
          testing: false,
          emailTestType: ''
        });
      }
    })
  }


  const { testing, emailTestType } = testType
  const isThisEmailVerified = sourceEmail === props.sourceEmail && props.emailVerificationStatus === 1
  return (
    <Fragment>
      <MainBlock title='Email Settings'>
        <InputRow>
          <InputRow.Label>Email Footer</InputRow.Label>
          <InputRow.Note
            content='Create the email footer that will be placed at the bottom of every email sent to your customers. Include contact information so your customers can reach out if they need help.'
          >
            <EditButton
              onClick={onToggleFooterModal}
            >
              Edit

              </EditButton>
            <EmailFooterModal
              onClose={onToggleFooterModal}
              isVisible={showFooterModal}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label
            error={errors.sourceEmail}
            notes='This Email represents the sender,  the from or the source email that your customers gonna get the emails from, in order to do that you have to verify the identity of your email address'
          >
            Source(From) Email

            </InputRow.Label>
          <InputRow.Note
            content={(
              <InputRow.SmallInput
                error={errors.sourceEmail}
                onChange={onSourceEmailChange}
                value={sourceEmail}
                type='email'
              />
            )}
          >
            <SmallButton
              onClick={onEmailVerify}
              className={`primary-color ${versifying ? 'spinner' : ''}`}
            >
              Verify
              </SmallButton>
          </InputRow.Note>
        </InputRow>
        {/* <InputRow margin='30'>
            <InputRow.Label
              notes='Send a receipt to your customers each time they are billed for their subscription.'
            >
              Enable Subscription Charge Receipts
            </InputRow.Label>
            <InputRow.SwitchInput value />
          </InputRow>
          <InputRow margin='30'>
            <InputRow.Label
              notes='Show a link in the Subscription Charge Receipt which lets your customers cancel their own subscription.'
            >
              Enable Self-Cancellation Link
            </InputRow.Label>
            <InputRow.SwitchInput value />
    </InputRow> */}
      </MainBlock>
      <MainBlock title='System Emails'>
        <InputRow>
          <InputRow.Label>New Order</InputRow.Label>
          <InputRow.Note
            content='This email is sent every time a customer buys a product.'
          >
            <InputRow.SwitchInput checked />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label> Failed Charge</InputRow.Label>
          <InputRow.Note
            content="This email is sent each time a customer's subscription payment fails to charge."
          >
            <InputRow.SwitchInput checked />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>New Affiliate</InputRow.Label>
          <InputRow.Note
            content='This email is sent each time a new affiliate applies. If auto-approval is enabled, this will not be sent.'
          >
            <InputRow.SwitchInput checked />
          </InputRow.Note>
        </InputRow>
      </MainBlock>
      <MainBlock title='Orders Emails'>
        <InputRow>
          <InputRow.Label>Order Receipt</InputRow.Label>
          <InputRow.Note
            content='Test the system email sent to customer when any new order is placed.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.order_receipt}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Refund Order</InputRow.Label>
          <InputRow.Note
            content='Test the system email sent to customer when any order item is refunded.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.refund_order}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Cancel Subscription</InputRow.Label>
          <InputRow.Note
            content='Test the system email sent to customer when any recurring subscription is canceled.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.cancel_subscription}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Refund Subscription</InputRow.Label>
          <InputRow.Note
            content='Test the system email sent to customer when any subscription charge is refunded.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.refund_subscription}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Subscription Charge Receipt</InputRow.Label>
          <InputRow.Note
            content='Test the email sent to customers when their subscription charges.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.subscription_charge_receipt}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
      </MainBlock>
      <MainBlock title='Dunning Emails'>
        <InputRow>
          <InputRow.Label>Default Dunning</InputRow.Label>
          <InputRow.Note
            content='Test the default dunning email sent to customer when any subscription payment fails. This can be overridden by customizing the individual dunning steps below.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.default_dunning}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Dunning Step 1</InputRow.Label>
          <InputRow.Note
            content='Test the dunning email sent to customer when any subscription payment fails for the first time.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.dunning_1}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Dunning Step 2</InputRow.Label>
          <InputRow.Note
            content='Test the dunning email sent to customer when any subscription payment fails for the 2nd time.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.dunning_2}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Dunning Step 3</InputRow.Label>
          <InputRow.Note
            content='Test the dunning email sent to customer when any subscription payment fails for the 3rd time.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.dunning_3}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
        <InputRow>
          <InputRow.Label>Dunning Step 4</InputRow.Label>
          <InputRow.Note
            content='Test the dunning email sent to customer when any subscription payment fails for the 4th time.'
          >
            <EmailTestButton
              loading={testing}
              type={testEmailTypes.dunning_4}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>

      </MainBlock>
    </Fragment>
  );
}

const mapStatToProps = ({
  emails: {
    sourceEmail,
    emailVerificationStatus
  }
}) => ({
  sourceEmail,
  emailVerificationStatus
});

export default connect(mapStatToProps, emailsActions)(Email);

