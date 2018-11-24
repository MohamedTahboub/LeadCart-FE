import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import './style.css';
import customersList from 'data/customers';

const { Avatar, SmallButton, MainTitle } = common;


const onExport = (orders) => {
  const titles = 'Name,Email,Phone,Location,Total Profite,Date of join\n';
  const convertToCSVFormat = orders
    .map(({
      name, contact: { email, phone }, location, total_profite: { value: total }, joined_in
    }) => `${name},${email},${phone},${location},${total},${joined_in}`).join('\n');


  const download = document.createElement('a');

  download.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(titles + convertToCSVFormat)}`);
  download.setAttribute('download', 'Orders List.csv');
  download.click();
};

const OrderList = (props) => (
  <React.Fragment>
    <MainTitle>Order List</MainTitle>
    <Tabel>
      <Tabel.Head>
        <Tabel.SmallCell />
        <Tabel.HeadCell>Name</Tabel.HeadCell>
        <Tabel.HeadCell>Email</Tabel.HeadCell>
        <Tabel.HeadCell>Status</Tabel.HeadCell>
        <Tabel.HeadCell>Processor</Tabel.HeadCell>
        <Tabel.HeadCell>Quantity</Tabel.HeadCell>
        <Tabel.HeadCell>Coupon</Tabel.HeadCell>
        <Tabel.HeadCell>Type</Tabel.HeadCell>
        <Tabel.HeadCell>Order Date</Tabel.HeadCell>
      </Tabel.Head>
      <Tabel.Body>
        {props.orders.map(({
          name, email, status, processor, quality, coupon, type, orderDate
        }) => (
          <Tabel.Row>
            <Tabel.SmallCell>
              <Avatar name={name} />
            </Tabel.SmallCell>
            <Tabel.Cell
              mainContent={name}
            />
            <Tabel.Cell
              mainContent={email}
            />
            <Tabel.Cell>
              <SmallButton classes='green-color'>Active</SmallButton>
            </Tabel.Cell>

            <Tabel.Cell mainContent={status}></Tabel.Cell>
            <Tabel.Cell mainContent={processor}></Tabel.Cell>
            <Tabel.Cell mainContent={quality}></Tabel.Cell>
            <Tabel.Cell mainContent={coupon}></Tabel.Cell>
            <Tabel.Cell mainContent={orderDate}></Tabel.Cell>
          </Tabel.Row>
        ))}
      </Tabel.Body>
    </Tabel>
    <span onClick={onExport.bind(this, props.orders)} className='btn primary-color explort-csv-btn'>Explore.CSV</span>
  </React.Fragment>
);

const mapStateToProps = ({ activities }) => ({
  orders: activities.orders.orders || []
});
export default connect(mapStateToProps)(OrderList);
