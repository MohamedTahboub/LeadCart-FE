import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Table from 'components/common/Tables';
import './style.css';

import { getCurrencySymbol, RoundTow } from 'libs';
import common from 'components/common';

const { Avatar, SmallButton, MainTitle } = common;


const PaymentTypeIcon = ({ type }) => {
    const icon = {
        Stripe: <i className='fas fa-credit-card' />,
        COD: <i className='fas fa-money-bill-alt' />,
        Paypal: <i className='fab fa-cc-paypal' />
    }[type];

    return icon || null;
};



const OrderRow = ({
    orderInList,
    orderNumber,
    customer: {
        firstName,
        lastName,
        email,
        phoneNumber
    } = {},
    products = [],
    product = {}, // deprecated - for backward compatibility
    paymentMethod,
    totalCharge = 0
}) => {

    // const [expand, setExpand] = useState(false);

    const checkoutProduct = products.find(p => p.category === 'checkout')

    return (
        <Table.Row orderInList={orderInList}>
            <Table.Cell mainContent={`#LC-${orderNumber}`} />
            <Table.Cell mainContent={checkoutProduct.name} />
            <Table.Cell
                mainContent={`${firstName} ${lastName}`}
                subContent={email}
            />
            <Table.Cell mainContent={`${RoundTow(totalCharge)}`} />
            <Table.Cell
                mainContent={<PaymentTypeIcon type={paymentMethod} />}
                subContent={paymentMethod}
            />
        </Table.Row>
    )
}

OrderRow.propTypes = {

}
//getCurrencySymbol(checkoutProduct && checkoutProduct.payment.currency)}
export default OrderRow
