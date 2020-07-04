import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import common from '../../../components/common';

const { Button } = common;

const Action = ({ label, onRefund, ...props }) => (
  <Button
    className='order-refund-btn'
    onClick={onRefund}
    {...props}
  >
    {label}
  </Button>
);

const getInitActions = ({ payment, offers, productName }) => {
  const {
    paymentType,
    paymentRefunded,
    subscriptionRefunded,
    subscriptionCanceled
  } = payment;
  const action = {
    id: 1,
    label: paymentType === 'Onetime'
      ? paymentRefunded ? `${productName} Refunded` : `Refund (${productName})`
      : subscriptionRefunded ? `Subscription Canceled(${productName})` : `Refund Subscription(${productName})`,
    target: 'product',
    disabled: paymentType === 'Onetime' ? paymentRefunded : subscriptionRefunded
  };
  const actions = [action];

  // for Split and Subscription types
  if (paymentType !== 'Onetime') {
    actions.push({
      id: 2,
      label: `Cancel Subscription (${productName})`,
      cancel: true,
      disabled: subscriptionCanceled
    });
  }

  offers.forEach((offer, ix) => {
    if (offer.price) {
      const { offerPaymentRefunded } = payment;
      const offerAction = {
        id: 3 + ix,
        label: offerPaymentRefunded ? `Offer (${offer.name}) Refunded` : `Refund Offer(${offer.name})`,
        target: 'offer',
        targetId: offer.id,
        disabled: offerPaymentRefunded
      };
      actions.push(offerAction);
    }
  });
  console.log({ actions });
  return actions;
};


const ProductActions = ({
  payment = {},
  offers = [],
  productName,
  productId,
  orderId,
  ...props
}) => {
  console.log({ offers });

  const initActions = getInitActions({ payment, offers, productName });

  const [loading, setLoading] = useState({});
  const [actions, setActions] = useState(initActions);

  useEffect(() => {
    const actions = getInitActions({ payment, offers, productName });
    setActions(actions);

    return () => {
      setActions([]);
      setLoading({});
    };
  }, [payment, offers]);

  const onRefund = ({ cancel, target, id, targetId }) => () => {
    let productOrOfferId = productId;
    if (target === 'offer') productOrOfferId = targetId;
    setLoading((loading) => ({ ...loading, [id]: true }));
    props.onRefund({
      orderId,
      productId: productOrOfferId,
      target,
      cancel
    }, {
      onSuccess: () => {
        setLoading((loading) => ({ ...loading, [id]: false }));
        actionRefunded(id);
      },
      onFailed: () => {
        setLoading((loading) => ({ ...loading, [id]: false }));
      }
    });
  };

  const actionRefunded = (id) => {
    setActions((actions) => {
      return actions.map((action) => {
        if (action.id === id)
          action.disabled = true;
        return action;
      });
    });
  };

  return (
    <div className='order-product-action'>
      {actions.map((action) => (
        <Action key={action.id} {...action} onRefund={onRefund(action)} onprogress={loading[action.id]} />
      ))}
    </div>
  );
};

ProductActions.propTypes = { payment: PropTypes.objectOf };
ProductActions.defaultProps = { payment: {} };

export default ProductActions;
