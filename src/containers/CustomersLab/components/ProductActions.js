import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as customersActions from 'actions/customers';
import common from '../../../components/common';


const { InputRow, Button } = common;

const Action = ({ label,onRefund, ...props }) => (
    <Button
        className='order-refund-btn'
        onClick={onRefund}
        {...props}
    >
        {label}
    </Button>
);

const ProductActions = ({ payment={},productName, ...props }) => {
    const {
        paymentType,
        paymentRefunded,
        subscriptionRefunded,
        subscriptionCanceled,
    } = payment
    const action = {
        label : paymentType === 'Onetime' 
         ? paymentRefunded ? `${productName} Refunded` : `Refund ${productName}` 
         : subscriptionRefunded ? `${productName} Sub Canceled` : `Cancel Sub to ${productName}`,
    }

    const [actions, setActions] = useState([action]);

    // console.log(payment)
    // useEffect(() => {
    //     const actions = [];

    //     setActions([action]);
    // }, []);


    const onRefund = ()=>{
        console.log(actions , payment)
    }


    return (
        <div className='order-product-action'>
            {actions.map((action) => (
                <Action {...action} onRefund={onRefund}/>
            ))}
        </div>
    );
};

ProductActions.propTypes = {
    payment: PropTypes.objectOf
};
ProductActions.defaultProps = {
    payment: {}
}

export default ProductActions;
