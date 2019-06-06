import React from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import './style.css';
import { getCurrencySymbol, RoundTow } from 'libs';
import PropTypes from 'prop-types';
const { Avatar, SmallButton, MainTitle } = common;


const SubscriptionsList = ({ subscriptions }) => (
  <Tabel>
    <Tabel.Head>
      <Tabel.SmallCell />
      <Tabel.HeadCell>Subscriber Name</Tabel.HeadCell>
      <Tabel.HeadCell>Email</Tabel.HeadCell>
      <Tabel.HeadCell>Phone Number</Tabel.HeadCell>
      <Tabel.HeadCell>Subscriptions</Tabel.HeadCell>
      <Tabel.HeadCell>Subscriptions Fees</Tabel.HeadCell>
    </Tabel.Head>
    <Tabel.Body>
      {subscriptions.map(({
        customer: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        product: { name: productName, price: { amount: subscriptionFee = 0, currency = 'USD' } = {} } = {}
      }, orderInList) => (
        <Tabel.Row orderInList={orderInList}>
          <Tabel.SmallCell>
            <Avatar name={`${firstName} ${lastName}`} />
          </Tabel.SmallCell>
          <Tabel.Cell mainContent={`${firstName} ${lastName}`} />
          <Tabel.Cell mainContent={email} />
          <Tabel.Cell mainContent={phoneNumber} />
          <Tabel.Cell mainContent={productName} />
          <Tabel.Cell mainContent={`${getCurrencySymbol(currency)} ${RoundTow(subscriptionFee)}`} />
        </Tabel.Row>
      ))}
    </Tabel.Body>
  </Tabel>
);
SubscriptionsList.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.object)
};
SubscriptionsList.defaultProps = {
  subscriptions: []
};
export default SubscriptionsList;
