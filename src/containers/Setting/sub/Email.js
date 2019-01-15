import React, { Component } from 'react';
import common from 'components/common';
import EmailFooterModal from 'components/EmailFooterModal';

const {
  InputRow, MainBlock, SmallButton, EditButton
} = common;

class Email extends Component {
  state = {
    showEmailFooterModal: false
  }

  onToggleEmailFooterModal = () => {
    const { showEmailFooterModal } = this.state;
    this.setState({
      showEmailFooterModal: !showEmailFooterModal
    });
  }

  render () {
    const {
      state: { showEmailFooterModal }
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
          <InputRow margin='30'>
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
          </InputRow>
        </MainBlock>

        <MainBlock title='Orders Emails'>
          <InputRow>
            <InputRow.Label>Order Receipt</InputRow.Label>
            <InputRow.Note
              content='Test the system email sent to customer when any new order is placed.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Refund Order</InputRow.Label>
            <InputRow.Note
              content='Test the system email sent to customer when any order item is refunded.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Cancel Subscription</InputRow.Label>
            <InputRow.Note
              content='Test the system email sent to customer when any recurring subscription is canceled.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Refund Subscription</InputRow.Label>
            <InputRow.Note
              content='Test the system email sent to customer when any subscription charge is refunded.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Subscription Charge Receipt</InputRow.Label>
            <InputRow.Note
              content='Test the email sent to customers when their subscription charges.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
        </MainBlock>
        <MainBlock title='Dunning Emails'>
          <InputRow>
            <InputRow.Label>Default Dunning</InputRow.Label>
            <InputRow.Note
              content='Test the default dunning email sent to customer when any subscription payment fails. This can be overridden by customizing the individual dunning steps below.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Dunning Step 1</InputRow.Label>
            <InputRow.Note
              content='Test the dunning email sent to customer when any subscription payment fails for the first time.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Dunning Step 2</InputRow.Label>
            <InputRow.Note
              content='Test the dunning email sent to customer when any subscription payment fails for the 2nd time.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Dunning Step 3</InputRow.Label>
            <InputRow.Note
              content='Test the dunning email sent to customer when any subscription payment fails for the 3rd time.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>
          <InputRow>
            <InputRow.Label>Dunning Step 4</InputRow.Label>
            <InputRow.Note
              content='Test the dunning email sent to customer when any subscription payment fails for the 4th time.'
            >
              <SmallButton classes={['primary-color wide-element']}>Test</SmallButton>
            </InputRow.Note>
          </InputRow>

        </MainBlock>
      </React.Fragment>
    );
  }
}


export default Email;
