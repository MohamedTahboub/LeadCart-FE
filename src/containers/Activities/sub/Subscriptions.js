import React from 'react';
import Chart from 'components/LeadCartCharts/chart';
import { connect } from 'react-redux';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import './style.css';
import customersList from 'data/customers';

const { Avatar, SmallButton, MainTitle } = common;


const onExport = (subscriptions) => {
  const titles = 'Subscriber Name,Email Address,Phone Number,Subscriptions Number,Subscribed Products\n';
  const convertToCSVFormat = subscriptions
    .map(({
      firstName,
      lastName,
      email,
      phoneNumber,
      subScriptedTo
    }) => `${firstName} ${lastName},${email},${phoneNumber},${subScriptedTo.length},${subScriptedTo.map((p) => p.name).join(' ')}`).join('\n');


  const download = document.createElement('a');

  download.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(titles + convertToCSVFormat)}`);
  download.setAttribute('download', 'Subscriptions List.csv');
  download.click();
};


const SubscriptionsList = (props) => (
  <React.Fragment>
    <MainTitle>Subscriptions List</MainTitle>
    <Tabel>
      <Tabel.Head>
        <Tabel.SmallCell />
        <Tabel.HeadCell>Subscriber Name</Tabel.HeadCell>
        <Tabel.HeadCell>Email</Tabel.HeadCell>
        <Tabel.HeadCell>Phone Number</Tabel.HeadCell>
        <Tabel.HeadCell>Subscriptions</Tabel.HeadCell>
      </Tabel.Head>
      <Tabel.Body>
        {props.subscriptions.map(({
          firstName,
          lastName,
          email,
          phoneNumber,
          subScriptedTo
        }) => (
          <Tabel.Row>
            <Tabel.SmallCell>
              <Avatar name={`${firstName} ${lastName}`} />
            </Tabel.SmallCell>
            <Tabel.Cell mainContent={`${firstName} ${lastName}`} />
            <Tabel.Cell mainContent={email} />
            <Tabel.Cell mainContent={phoneNumber} />
            <Tabel.Cell mainContent={subScriptedTo.length} />
          </Tabel.Row>
        ))}
      </Tabel.Body>
    </Tabel>

    <span onClick={onExport.bind(this, props.subscriptions)} className='btn primary-color explort-csv-btn'>Explore.CSV</span>
  </React.Fragment>
);

const mapStateToProps = ({ activities }) => ({
  subscriptions: activities.subscriptions.subscriptions || []
});
export default connect(mapStateToProps)(SubscriptionsList);


/*
 <MainTitle>Subscriptions scheduled to be canceled</MainTitle>
    <Tabel>
      <Tabel.Head>
        <Tabel.SmallCell />
        <Tabel.HeadCell>Subscription ID</Tabel.HeadCell>
        <Tabel.HeadCell>Custome Name</Tabel.HeadCell>
        <Tabel.HeadCell>Email</Tabel.HeadCell>
        <Tabel.HeadCell>Subscription Name</Tabel.HeadCell>
        <Tabel.HeadCell>Subscription Price</Tabel.HeadCell>
        <Tabel.HeadCell>Cancel On</Tabel.HeadCell>
      </Tabel.Head>
      <Tabel.Body>
        <Tabel.Row>
          <Tabel.SmallCell>
            <Avatar name='Nimesil' />
          </Tabel.SmallCell>
          <Tabel.Cell
            mainContent='#25783'
          />
          <Tabel.Cell
            mainContent='Vincent Vega'
          />
          <Tabel.Cell
            mainContent='vincent@gmail.com'
          />
          <Tabel.Cell>
            <SmallButton classes='purple-color'>Advanced</SmallButton>
          </Tabel.Cell>
          <Tabel.Cell mainContent='$199/month'></Tabel.Cell>
          <Tabel.Cell mainContent='21 Jun 2018'></Tabel.Cell>
        </Tabel.Row>
      </Tabel.Body>
    </Tabel>

*/
