import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import { notification } from 'libs';
import { offlinePaymentLogo } from 'data/importBrands';
import { OfflinePaymentForm, PaymentRow } from './components';

const { FlexBox, InputRow, Button, LayoutSwitch } = common;

const defaultOfflinePayment = {
  name: 'Offline Payment Method',
  notes: 'Notes for your customers',
  logo: offlinePaymentLogo
};

const OfflinePaymentModal = ({ integrations = [], addOfflinePaymentMethod, removeOfflinePaymentMethod, ...props }) => {
  const [activePayment, setActivePayment] = useState();
  const [loading, setLoading] = useState(false);

  const offlinePaymentsList = integrations.filter(({ key }) => key === 'lc_offlinepayment');

  const canCreateNewOfflinePayment = offlinePaymentsList.length < 3;

  const onCreateNewPayment = () => {
    if (!canCreateNewOfflinePayment)
      return notification.failed('You can create more than 3 offline payments');

    addOfflinePaymentMethod && addOfflinePaymentMethod(defaultOfflinePayment, {
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

  const onRemoveOfflinePayment = (integrationId) => {
    removeOfflinePaymentMethod({ integrationId }, {
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
            // onDelete={}
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
      {!hasActivePayment && (
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
