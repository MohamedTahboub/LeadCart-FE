import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const { FlexBox, Note } = common;

const subscriptionEvents = ['SUBSCRIPTION_CANCELLED', 'SUBSCRIPTION_PAYMENT_FAILED'];

const CopyIcon = ({ text }) => (
  <CopyToClipboard text={text}>
    <span className='copy-icon'>
      <i className='fas fa-copy' />
    </span>
  </CopyToClipboard>
);


const InstructionRow = ({ copy, children }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <FlexBox center='v-center'>
      <span className='mr-2'>{children}</span>
      <span onClick={onCopy}>
        <CopyIcon text={copy} />
        {copied && (
          <span className='bold-text ml-3'>Copied!</span>
        )}
      </span>
    </FlexBox>
  );
};

const SubscriptionsHooksNotes = ({
  triggerEvent,
  isPaypalConnected
}) => {

  const isSubscriptionType = subscriptionEvents.includes(triggerEvent);
  const isSubscriptionTypeWithPaypal = isPaypalConnected && isSubscriptionType;

  if (!isSubscriptionTypeWithPaypal) return null;
  return (
    <FlexBox flexStart flex>
      <Note
        showOnce
        // referenceLink='https://help.leadcart.io'
        className='mx-auto p-3'
      >
        <strong className='mx-1'>Important:</strong>
                Please make sure that you add the following webhooks to your Paypal account,
                this action won't trigger in leadcart if they were not setup right!
        <br />
        <div className='bold-text'>In your Paypal account add the following webhooks:</div>
        <InstructionRow copy='https://app.leadcart.io/api/webhooks/paypal/subscription/dunning'>
                    Billing Subscription Payment failed hook URL
        </InstructionRow>
        <InstructionRow copy='https://app.leadcart.io/api/webhooks/paypal/subscription/cancel'>
                    Billing Subscription Cancelled hook URL
        </InstructionRow>
      </Note>
    </FlexBox>
  );
};

SubscriptionsHooksNotes.propTypes = {};

export default SubscriptionsHooksNotes;
