import React, { Component } from 'react';
import Tabel from 'components/common/Tabels';
import './style.css';
import common from 'components/common';
import { connect } from 'react-redux';

const { Avatar } = common;


class CustomerList extends Component {
  onExport = () => {
    const titles = 'ID,First Name,Last Name,Email Address,Phone Number,Life Time Charges\n';
    const convertToCSVFormat = this.props.customers
      .map(({ id, firstName, lastName, email, phone = 'N/A', lifeTimeCharge }) => (
        `${id},${firstName},${lastName},${email},${phone},${lifeTimeCharge}$`))
      .join('\n');

    const dataRows = titles + convertToCSVFormat

    this.props.onExport('Customers List.csv', dataRows)
  }

  render() {
    return (
      <React.Fragment>
        <Tabel>
          <Tabel.Head>
            <Tabel.SmallCell />
            <Tabel.HeadCell>First Name</Tabel.HeadCell>
            <Tabel.HeadCell>Last Name</Tabel.HeadCell>
            <Tabel.HeadCell>Email</Tabel.HeadCell>
            <Tabel.HeadCell>Phone Number</Tabel.HeadCell>
            <Tabel.HeadCell>Life time Charges</Tabel.HeadCell>
            <Tabel.HeadCell />
          </Tabel.Head>
          <Tabel.Body>
            {this.props.customers
              .map(({
                id,
                firstName,
                lastName,
                email,
                phoneNumber,
                lifeTimeCharge,
              }, orderInList) => (
                  <Tabel.Row key={id} orderInList={orderInList}>
                    <Tabel.SmallCell>
                      <Avatar name={`${firstName} ${lastName}`} />
                    </Tabel.SmallCell>
                    <Tabel.Cell mainContent={firstName} />
                    <Tabel.Cell mainContent={lastName} />
                    <Tabel.Cell mainContent={email} />
                    <Tabel.Cell mainContent={phoneNumber} />
                    <Tabel.Cell mainContent={lifeTimeCharge} />
                  </Tabel.Row>
                ))}

          </Tabel.Body>
        </Tabel>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ activities }) => ({
  customers: activities.customers.customers || []
});
export default connect(mapStateToProps)(CustomerList);
