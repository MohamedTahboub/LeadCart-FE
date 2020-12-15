import React, { useState } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import { notification } from 'libs';
import { offlinePaymentLogo } from 'data/importBrands';
import { OfflinePaymentForm, PaymentRow } from './components';

const { FlexBox, Button, LayoutSwitch } = common;

const getDefaultOfflinePayment = (length) => ({
  name: `Offline Payment Method #${length}`,
  notes: 'Notes for your customers',
  logo: offlinePaymentLogo
});

const OfflinePaymentModal = ({ integrations = [], addOfflinePaymentMethod, removeOfflinePaymentMethod, ...props }) => {
  const [activePayment, setActivePayment] = useState();
  const [loading, setLoading] = useState(false);

  const offlinePaymentsList = integrations.filter(({ key }) => key === 'lc_offlinepayment');

  const canCreateNewOfflinePayment = offlinePaymentsList.length < 3;

  const onCreateNewPayment = () => {
    if (!canCreateNewOfflinePayment)
      return notification.failed('You can create more than 3 offline payments');

    addOfflinePaymentMethod && addOfflinePaymentMethod(getDefaultOfflinePayment(offlinePaymentsList.length), {
      onSuccess: () => {
        notification.success('Created Successfully');
        setLoading(false);
      },
      onFailed: (msg) => {
        notification.failed(msg);
        setLoading(false);
      }
    });
  };

  const onRemoveOfflinePayment = (integrationId, name) => {
    removeOfflinePaymentMethod({ integrationId, methodName: name }, {
      onSuccess: () => {
        notification.success('Removed Successfully');
        setLoading(false);
      },
      onFailed: (msg) => {
        notification.failed(msg);
        setLoading(false);
      }
    });
  };

  const onPaymentSelect = (id) => {
    setActivePayment(id);
  };

  const onCloseFormMode = (id) => {
    setActivePayment();
  };


  const hasActivePayment = Boolean(activePayment);
  const showCanCreateBtn = !hasActivePayment && canCreateNewOfflinePayment;

  return (
    <FlexBox column flex>
      <FlexBox flex>
        <FlexBox column flex={!hasActivePayment}>
          {offlinePaymentsList.map((payment) => (
            <PaymentRow
              {...payment}
              active={activePayment === payment._id}
              isFormMode={hasActivePayment}
              onRemoveOfflinePayment={onRemoveOfflinePayment}
              onSelect={onPaymentSelect}
            />
          ))}
        </FlexBox>
        {hasActivePayment && (
          <FlexBox flex className='payment-form-content'>
            <LayoutSwitch active={activePayment}>
              {offlinePaymentsList.map((payment) => (
                <OfflinePaymentForm key={payment._id} id={payment._id} service={payment} onCloseFormMode={onCloseFormMode}>
                  {payment.name}
                </OfflinePaymentForm>
              ))}
            </LayoutSwitch>
          </FlexBox>
        )}
      </FlexBox>
      {showCanCreateBtn && (
        <FlexBox flex center='h-center'>
          <Button onprogress={loading} onClick={onCreateNewPayment}>
            + Create New
          </Button>
        </FlexBox>
      )}
    </FlexBox>
  );
};

OfflinePaymentModal.propTypes = {};
const passedProps = ({ integrations = [] }) => ({ integrations });
export default connect(passedProps, integrationsActions)(OfflinePaymentModal);
