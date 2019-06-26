import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import common from '../../../components/common';
import { connect } from 'react-redux'
import * as customersActions from '../../../actions/customer'

const { InputRow, Button } = common;

const OrderOptions = ({
  details = {},
  ...props
}) => {

  const {
    orderId,
    offer,
    currency,
    payment:{
      paymentType,
      paymentMethod,
      paymentRefunded,
      offerPaymentRefunded,
      subscriptionCanceled
    }={},
    product: {
      price: {
        amount: productPrice
      } = {},
    } = {}
  } = details

  const [refundState , setRefundState]=useState({
    paymentRefunded,
      offerPaymentRefunded,
      subscriptionCanceled
  })
  const [loading, setLoading] = useState({})
  const [unfoldOptions, setUnfoldOptions] = useState(true);

  const updateLoading = (element) => {
    setLoading({ ...loading, ...element })
  }
  const onRefund = (target = 'product') => {
    const loadingName = target === 'product' ? 'refundProduct' : 'refundOffer'

    const refundType = target === 'offer' ?
     'offerPaymentRefunded'
      : 
      paymentType === 'Onetime'  ? 'paymentRefunded' : 'subscriptionCanceled'
    updateLoading({ [loadingName]: true })
    props.orderRefund({
      orderId,
      target
    },
      {
        onSuccess: () => {
          updateLoading({ [loadingName]: false })
          setRefundState({
            ...refundState,
            [refundType]:true  
          })
        },
        onFailed: () => {
          updateLoading({ [loadingName]: false })
        }
      }
    )
  }


  const onResendReceiptEmail = () => {
    updateLoading({ resendReceipt: true })
    props.resendReceiptEmail({
      orderId
    },
      {
        onSuccess: () => {
          updateLoading({ resendReceipt: false })
        },
        onFailed: () => {
          updateLoading({ resendReceipt: false })
        }
      }
    )
  }
  const onResendFulfillmentEmail = () => {
    updateLoading({ resendFulfillment: true })
    props.resendFulfillmentEmail({
      orderId
    },
      {
        onSuccess: () => {
          updateLoading({ resendFulfillment: false })
        },
        onFailed: () => {
          updateLoading({ resendFulfillment: false })
        }
      }
    )
  }

  const notPaypal = paymentMethod !== 'Paypal'
  const notCOD = paymentMethod !== 'COD'
  const refundLabel = paymentType === 'Onetime' ? 'Refund' : 'Cancel Subscription' 
  const isRefundedOrCanceled =  paymentType === 'Onetime' ? refundState.paymentRefunded : refundState.subscriptionCanceled
  const isOfferPaymentRefunded = refundState.offerPaymentRefunded 

  return (
    <div>
      <div
        className={`more-order-options-btn ${unfoldOptions ? '' : 'open'}`}
        onClick={() => setUnfoldOptions(!unfoldOptions)}
      >
        <i className="fas fa-chevron-down" />
        {`show ${unfoldOptions ? 'more' : 'less'} options`}
      </div>
      <div className={`more-order-options ${unfoldOptions ? 'close' : 'open'}`}>
        {notCOD && (
          <InputRow className='order-more-option-row'>
          <InputRow.Label className='order-more-option-label'>{refundLabel}</InputRow.Label>
          <Button
            disabled={loading.refundProduct || isRefundedOrCanceled}
            className='primary-color more-order-options-btns'
            onClick={() => onRefund()}
            onprogress={loading.refundProduct}
          >
            {`Product ${currency}${productPrice}`}
          </Button>

          {(offer.price && notPaypal) && (<Button
            disabled={loading.refundOffer}
            className='primary-color more-order-options-btns'
            onClick={() => onRefund('offer')}
            onprogress={loading.refundOffer}
          >
            {`Refund Offer ${currency}${offer.price}`}
          </Button>
          )}
        </InputRow>
        )}
        <InputRow className='order-more-option-row'>
          <InputRow.Label className='order-more-option-label' >Resend Receipt Email</InputRow.Label>
          <Button
            disabled={loading.resendReceipt || isOfferPaymentRefunded}
            className='primary-color more-order-options-btns'
            onClick={onResendReceiptEmail}
            onprogress={loading.resendReceipt}
          >
            Send
          </Button>
        </InputRow>
        <InputRow className='order-more-option-row'>
          <InputRow.Label className='order-more-option-label' >Resend Fulfillment Email</InputRow.Label>
          <Button
            disabled={loading.resendFulfillment}
            className='primary-color more-order-options-btns'
            onClick={onResendFulfillmentEmail}
            onprogress={loading.resendFulfillment}
          >
            Send
        </Button>
        </InputRow>
      </div>
    </div>
  );
};

OrderOptions.propTypes = {

};


export default connect(null, customersActions)(OrderOptions);
