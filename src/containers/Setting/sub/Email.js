import React, { Component } from 'react';
import common from 'components/common';
import EmailFooterModal from 'components/EmailFooterModal';

const {
  InputRow, MainBlock, SmallButton, EditButton
} = common;


const EmailTestButton = ({
  type, testingType, loading, onClick, ...props
}) => {
  let classes = ['primary-color wide-element'];
  classes += type === testingType && loading ? ' spinner' : '';
  return (
    <SmallButton
      classes={classes}
      onClick={onClick.bind(this, type)}
    >
      Test
    </SmallButton>
  );
};
class Email extends Component {
  state = {
    showEmailFooterModal: false,
    testing: false,
    emailTestType: ''
  }

  onToggleEmailFooterModal = () => {
    const { showEmailFooterModal } = this.state;
    this.setState({
      showEmailFooterModal: !showEmailFooterModal
    });
  }

  onEmailTest = (type) => {
    this.setState({
      testing: true,
      emailTestType: type
    });
  }

  render () {
    const {
      state: { showEmailFooterModal, testing, emailTestType }
    } = this;
    return (
      <React.Fragment>
        <MainBlock title='Email Settings'>
          <InputRow>
            <InputRow.Label>Email Footer</InputRow.Label>
            <InputRow.Note
              content='Create the email footer that will be placed at the bottom of every email sent to your customers. Include contact information so your customers can reach out if they need help.'
            >
              <EditButton
                onClick={this.onToggleEmailFooterModal}
              >
                Edit

              </EditButton>
              <EmailFooterModal
                onClose={this.onToggleEmailFooterModal}
                isVisible={showEmailFooterModal}
              />
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label
              notes='This Email represents the sender,  the from or the source email that your customers gonna get the emails from, in order to do that you have to verify the identity of your email address'
            >
              Source(From) Email

            </InputRow.Label>
            <InputRow.Note
              content={(
                <InputRow.SmallInput type='email'>

                </InputRow.SmallInput>)}
            >
              <SmallButton
                classes="primary-color"
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
                type='orderRecipt'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='refundOrder'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='cancelSubscription'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='refundSubscription'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='subscriptionChargeReceipt'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='defaultDunning'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='dunning1'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='dunning2'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='dunning3'
                testingType={emailTestType}
                onClick={this.onEmailTest}
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
                type='dunning4'
                testingType={emailTestType}
                onClick={this.onEmailTest}
              />
            </InputRow.Note>
          </InputRow>

        </MainBlock>
      </React.Fragment>
    );
  }
}


export default Email;

