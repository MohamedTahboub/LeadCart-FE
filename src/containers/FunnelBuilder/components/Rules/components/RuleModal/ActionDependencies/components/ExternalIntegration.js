import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as IntegrationsActions from 'actions/integrations';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import common from 'components/common';

const { FlexBox, Spinners, Note } = common;
const { Loader } = Spinners;
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
const ExternalIntegration = ({ integrationId, metaData = {}, isPaypalConnected, triggerEvent, onChange, requirement, ...props }) => {

  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  const postActions = {
    onSuccess: (data) => {

      setState({
        ...data,
        options: Array.isArray(data.options) ? data.options.map(({ name: label, value }) => ({ label, value })) : []
      });
      setLoading(false);
    },
    onFailed: () => {
      setLoading(false);
    }
  };

  const getTheDependencies = () => {
    const details = {
      integration: integrationId,
      requirement
    };
    if (integrationId && requirement) {
      setLoading(true);
      props.getIntegrationActionRequirement(details, postActions);
    }
  };

  useEffect(getTheDependencies, [integrationId, requirement]);

  const _onChange = ({ value }) => onChange({
    target: {
      value,
      name: `action.metaData.${state.name}`
    }
  });

  const isSubscriptionType = subscriptionEvents.includes(triggerEvent);
  const isSubscriptionTypeWithPaypal = isPaypalConnected && isSubscriptionType;

  return (
    <FlexBox column flex>
      {loading ? (
        <FlexBox center='h-center'>
          <Loader
            loading={loading}
            size={20}
            color='gray'
            className='mt-3 mb-4'
          />
        </FlexBox>
      ) : (
        <FlexBox flexStart flex>
          <span className='large-text gray-text bold-text capitalized-text ml-2'>
            {requirement}
          </span>
        </FlexBox>
      )}
      {state.type && (
        <Select
          className='flex-item margin-h-10 min-width-400'
          options={state.options || []}
          defaultValue={metaData[state.name]}
          onChange={_onChange}
        />
      )}
      {isSubscriptionTypeWithPaypal && (
        <FlexBox flexStart flex>
          <Note
            showOnce
            // referenceLink='https://help.leadcart.io'
            className='mx-auto p-3'
          >
            <strong>Important:</strong>
                Please make sure that you add the following webhooks to your Paypal account,
            <br />
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
      )}
    </FlexBox>
  );
};

ExternalIntegration.propTypes = {};

export default connect(null, IntegrationsActions)(ExternalIntegration);
