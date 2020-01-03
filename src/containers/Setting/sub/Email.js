import React, { Fragment, useState, useEffect } from 'react';
import common from 'components/common';
import EmailFooterModal from 'components/EmailFooterModal';
import { connect } from 'react-redux';
import { testEmailTypes } from 'constantsTypes';
import * as emailsActions from 'actions/emails';
import * as flashMessagesActions from 'actions/flashMessage';
import * as yup from 'yup';

const {
  InputRow, MainBlock, SmallButton, EditButton
} = common;


const EmailTestButton = ({
  type,
  className = '',
  testingType,
  disabled,
  loading,
  onClick,
  ...props
}) => {
  const classNames = `${className} primary-color wide-element ${(type === testingType && loading) ? ' spinner' : ''} ${disabled ? 'test-disabled' : ''}`;

  return (
    <SmallButton
      className={classNames}
      onClick={!disabled && onClick.bind(this, type)}
    >
      Test
    </SmallButton>
  );
};

const Email = ({
  isPremium,
  ...props
}) => {
  const [showFooterModal, setFooterModal] = useState(false);
  const [testType, setTestType] = useState({});
  const [sourceEmail, setSourceEmail] = useState(props.sourceEmail);
  const [errors, setErrors] = useState({});
  const [versifying, setVersifying] = useState(false);
  const onToggleFooterModal = () => {
    setFooterModal(!showFooterModal);
  };

  const onSourceEmailChange = ({ target: { value } }) => {
    setSourceEmail(value);
    setErrors({ sourceEmail: '' });
  };


  const onEmailVerify = async () => {
    const schema = yup.string().email().required();

    if (!(await schema.isValid(sourceEmail))) return setErrors({ sourceEmail: 'invalid email address' });
    setVersifying(true);
    props.verifyEmailSource({ email: sourceEmail }, {
      onSuccess: () => {setVersifying(false);},
      onFailed: () => {setVersifying(false);}
    });
  };

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
    });
  };

  useEffect(() => {
    setSourceEmail(props.sourceEmail);
  }, [props.sourceEmail]);

  const updateEmailLogo = (emailLogo) => {
    props.updateEmailFooter(
      {
        emailLogo
      }, {
        onSuccess: () => {
          props.showFlashMessage({
            type: 'success',
            message: 'Brand logo on Email Header Successfully Updated'
          });
        },
        onFailed: (error) => {
          props.showFlashMessage({
            type: 'failed',
            message: 'Failed To Update the Brand Email Header Logo'
          });
        }
      }
    );
  };
  const { testing, emailTestType } = testType;
  // const isThisEmailVerified = sourceEmail === props.sourceEmail && props.emailVerificationStatus === 1
  return (
    <Fragment>
      <MainBlock title='Email Settings'>
        <InputRow>
          <InputRow.Label
            notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
          >
            Brand Email Logo:

          </InputRow.Label>
          <InputRow.AddImage
            value={props.emailLogo}
            subLabel='Logo'
            source='brand_email_logo'
            name='emailLogo'
            onUploaded={updateEmailLogo}
          >
            Brand Logo
          </InputRow.AddImage>
        </InputRow>
        <InputRow margin='45'>
          <InputRow.Label>Email Footer</InputRow.Label>
          <InputRow.Note
            content='Create the email footer that will be placed at the bottom of every email sent to your customers. Include contact information so your customers can reach out if they need help.'
          >
            <EditButton
              onClick={onToggleFooterModal}
            >
              Edit

            </EditButton>
            {showFooterModal && (
              <EmailFooterModal
                onClose={onToggleFooterModal}
                isVisible={showFooterModal}
              />
            )}
          </InputRow.Note>
        </InputRow>
        {isPremium && (<InputRow>
          <InputRow.Label
            error={errors.sourceEmail}
            notes='This Email represents the sender,  the from or the source email that your customers gonna get the emails from, in order to do that you have to verify the identity of your email address'
          >
            Source(From) Email

          </InputRow.Label>
          <InputRow.Note
            content={(
              <InputRow.TextField
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
        )}
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
      </MainBlock>
      <MainBlock title='Orders Emails'>
        <InputRow>
          <InputRow.Label>Order Receipt</InputRow.Label>
          <InputRow.Note
            content='Test the system email sent to customer when any new order is placed.'
          >
            <EmailTestButton
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
              loading={testing}
              type={testEmailTypes.subscription_charge_receipt}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>
      </MainBlock>
      {isPremium && (<MainBlock title='Dunning Emails'>
        <InputRow>
          <InputRow.Label>Default Dunning</InputRow.Label>
          <InputRow.Note
            content='Test the default dunning email sent to customer when any subscription payment fails. This can be overridden by customizing the individual dunning steps below.'
          >
            <EmailTestButton
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
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
              disabled={!props.companyAddress}
              loading={testing}
              type={testEmailTypes.dunning_4}
              testingType={emailTestType}
              onClick={onEmailTest}
            />
          </InputRow.Note>
        </InputRow>

                     </MainBlock>
      )}
    </Fragment>
  );
};

const mapStatToProps = ({
  user: {
    user: {
      level,
      activePackage = {}
    } = {}
  },
  emails: {
    settings: {
      emailLogo,
      companyAddress,
      sourceEmail,
      emailVerificationStatus
    } = {}
  } = {}
}) => {
  let isPremium = activePackage.type === 'Premium';

  if (level >= 4) isPremium = true;

  return {
    emailLogo,
    companyAddress,
    isPremium,
    sourceEmail,
    emailVerificationStatus
  };
};
export default connect(mapStatToProps, { ...emailsActions, ...flashMessagesActions })(Email);

