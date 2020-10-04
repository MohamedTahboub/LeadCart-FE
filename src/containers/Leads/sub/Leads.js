import React from 'react';
import Table from 'components/common/Tables';
import './style.css';
import PropTypes from 'prop-types';
import moment from 'moment';


const OrderList = ({ list }) => (
  <Table>
    <Table.Head>
      <Table.HeadCell>Full Name</Table.HeadCell>
      <Table.HeadCell>Email</Table.HeadCell>
      <Table.HeadCell>Captured #</Table.HeadCell>
      <Table.HeadCell>Order Date</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {list.map((lead, orderInList) => {

        const { fullName, updatedAt, captureCount, email } = lead;
        return (
          <Table.Row orderInList={orderInList}>
            <Table.Cell mainContent={fullName} />
            <Table.Cell mainContent={email} />
            <Table.Cell mainContent={captureCount} />
            <Table.Cell mainContent={moment(updatedAt).format('MMM DD YYYY')} />
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);
OrderList.propTypes = { list: PropTypes.arrayOf(PropTypes.object) };
OrderList.defaultProps = { list: [] };
export default OrderList;
