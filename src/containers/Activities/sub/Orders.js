import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import './style.css';
import customersList from 'data/customers';

const { Avatar, SmallButton, MainTitle } = common;


const onExport = (orders) => {
  const titles = 'Name,Email Adress,Phone Number,Product Name,Processor,Quantity,Price,Type\n';
  const convertToCSVFormat = orders
    .map(({
      firstName,
      lastName,
      email,
      phoneNumber,
      productName,
      paymentType,
      paymentMethod,
      price,
    }) => `${firstName} ${lastName},${email},${phoneNumber},${productName},${paymentMethod},${1},${price},${paymentType}`).join('\n');


  const download = document.createElement('a');

  download.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(titles + convertToCSVFormat)}`);
  download.setAttribute('download', 'Orders List.csv');
  download.click();
};

const OrderList = (props) => (
  <Tabel>
    <Tabel.Head>
      <Tabel.SmallCell />
      <Tabel.HeadCell>Name</Tabel.HeadCell>
      <Tabel.HeadCell>Email</Tabel.HeadCell>
      <Tabel.HeadCell>Product Name</Tabel.HeadCell>
      <Tabel.HeadCell>Processor</Tabel.HeadCell>
      <Tabel.HeadCell>Quantity</Tabel.HeadCell>
      <Tabel.HeadCell>Type</Tabel.HeadCell>
    </Tabel.Head>
    <Tabel.Body>
      {props.orders.map(({
        firstName,
        lastName,
        email,
        phoneNumber,
        productName,
        paymentType,
        paymentMethod,
        price,
      }, orderInList) => (
          <Tabel.Row orderInList={orderInList}>
            <Tabel.SmallCell>
              <Avatar name={`${firstName} ${lastName}`} />
            </Tabel.SmallCell>
            <Tabel.Cell mainContent={`${firstName} ${lastName}`} />
            <Tabel.Cell mainContent={email} subContent={phoneNumber} />
            <Tabel.Cell mainContent={productName} />
            <Tabel.Cell mainContent={paymentMethod} />
            <Tabel.Cell mainContent={`${1} Unit`} subContent={price} />
            <Tabel.Cell mainContent={paymentType} />

          </Tabel.Row>
        ))}
    </Tabel.Body>
  </Tabel>
);

const mapStateToProps = ({ activities }) => ({
  orders: activities.orders.orders || []
});
export default connect(mapStateToProps)(OrderList);
