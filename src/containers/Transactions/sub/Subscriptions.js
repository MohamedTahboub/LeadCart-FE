import React from 'react';
import common from 'components/common';
import Table, { withPagination } from 'components/common/Tables';
import './style.css';
import { RoundTow, getCurrencySymbol } from 'libs';
import PropTypes from 'prop-types';
import ids from 'shortid';
import moment from 'moment';
const { Avatar } = common;

const SubscriptionsList = ({ data: subscriptions }) => (
  <Table>
    <Table.Head>
      <Table.SmallCell />
      <Table.HeadCell>Subscriber Name</Table.HeadCell>
      <Table.HeadCell>Email</Table.HeadCell>
      <Table.HeadCell>Phone Number</Table.HeadCell>
      <Table.HeadCell>Subscriptions</Table.HeadCell>
      <Table.HeadCell>Subscriptions Fees</Table.HeadCell>
      <Table.HeadCell>Created Date</Table.HeadCell>
      <Table.HeadCell>Last Update</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {subscriptions.map(({
        _id,
        customer: {
          firstName,
          lastName,
          email,
          phoneNumber
        },
        product: {
          name: productName,
          price: {
            amount: subscriptionFee = 0,
            currency = 'USD'
          } = {}
        } = {},
        createdAt,
        updatedAt
      }, orderInList) => (
        <Table.Row orderInList={orderInList} key={ids.generate()}>
          <Table.SmallCell>
            <Avatar name={`${firstName} ${lastName}`} />
          </Table.SmallCell>
          <Table.Cell mainContent={`${firstName} ${lastName}`} />
          <Table.Cell mainContent={email} />
          <Table.Cell mainContent={phoneNumber} />
          <Table.Cell mainContent={productName} />
          <Table.Cell mainContent={`${getCurrencySymbol(currency)} ${RoundTow(subscriptionFee)}`} />
          <Table.Cell mainContent={moment(createdAt).format('MMM DD YYYY')} />
          <Table.Cell mainContent={moment(updatedAt).format('MMM DD YYYY')} />
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

SubscriptionsList.propTypes = { subscriptions: PropTypes.arrayOf(PropTypes.object) };
SubscriptionsList.defaultProps = { subscriptions: [] };
export default withPagination(SubscriptionsList);
