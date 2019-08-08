import React from 'react';
import common from 'components/common';
import Table from 'components/common/Tables';
import './style.css';
import { getCurrencySymbol, RoundTow } from 'libs';
import PropTypes from 'prop-types';
const { Avatar, SmallButton, MainTitle } = common;


const SubscriptionsList = ({ subscriptions }) => (
  <Table>
    <Table.Head>
      <Table.SmallCell />
      <Table.HeadCell>Subscriber Name</Table.HeadCell>
      <Table.HeadCell>Email</Table.HeadCell>
      <Table.HeadCell>Phone Number</Table.HeadCell>
      <Table.HeadCell>Subscriptions</Table.HeadCell>
      <Table.HeadCell>Subscriptions Fees</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {subscriptions.map(({
        customer: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        product: { name: productName, price: { amount: subscriptionFee = 0, currency = 'USD' } = {} } = {}
      }, orderInList) => (
        <Table.Row orderInList={orderInList}>
          <Table.SmallCell>
            <Avatar name={`${firstName} ${lastName}`} />
          </Table.SmallCell>
          <Table.Cell mainContent={`${firstName} ${lastName}`} />
          <Table.Cell mainContent={email} />
          <Table.Cell mainContent={phoneNumber} />
          <Table.Cell mainContent={productName} />
          <Table.Cell mainContent={`${getCurrencySymbol(currency)} ${RoundTow(subscriptionFee)}`} />
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);
SubscriptionsList.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.object)
};
SubscriptionsList.defaultProps = {
  subscriptions: []
};
export default SubscriptionsList;
