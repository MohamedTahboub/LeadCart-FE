import React, { Component } from 'react';
import Tabel from 'components/common/Tabels';
import './style.css';
import common from 'components/common';
import { connect } from 'react-redux';

const { Avatar, MiniButton } = common;


class CustomerList extends Component {
  onExport = () => {
    const titles = 'ID,First Name,Last Name,Email Address,Phone Number\n';
    const convertToCSVFormat = this.props.customers
      .map(({
        _id: ID, firstName, lastName, email, phone = 'N/A'
      }) => `${ID},${firstName},${lastName},${email},${phone}`).join('\n');


    const download = document.createElement('a');

    download.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(titles + convertToCSVFormat)}`);
    download.setAttribute('download', 'Customers List.csv');
    download.click();
  }

  render () {
    return (
      <React.Fragment>
        <Tabel>
          <Tabel.Head>
            <Tabel.SmallCell />
            <Tabel.HeadCell>Name</Tabel.HeadCell>
            <Tabel.HeadCell>Email</Tabel.HeadCell>
            <Tabel.HeadCell>Life time</Tabel.HeadCell>
            <Tabel.HeadCell>recente charge</Tabel.HeadCell>
            <Tabel.HeadCell>client since</Tabel.HeadCell>
            <Tabel.HeadCell />
          </Tabel.Head>
          <Tabel.Body>
            {this.props.customers
              .map(({
                _id: id,
                firstName,
                lastName,
                email,
                phone,
                location,
                total_profite = { monthly_draft_persentage: 0, value: 0 },
                recente_charge = { monthly_draft_persentage: 0, value: 0 },
                joined_in = ''
              }) => (
                <Tabel.Row key={id}>
                  <Tabel.SmallCell>
                    <Avatar name={`${firstName} ${lastName}`} />
                  </Tabel.SmallCell>
                  <Tabel.Cell
                    mainContent={`${firstName} ${lastName}`}
                    subContent={location || 'un set'}
                  />
                  <Tabel.Cell
                    mainContent={email}
                    subContent={phone}
                  />
                  <Tabel.Cell
                    mainContent={total_profite.value}
                    subContent={
                      {
                        content: `${total_profite.monthly_draft_persentage}%`,
                        classes: total_profite.monthly_draft_persentage > 0 ? 'stock-up' : 'stock-down'
                      }}
                  />
                  <Tabel.Cell
                    mainContent={recente_charge.value}
                    subContent={
                      {
                        content: `${recente_charge.monthly_draft_persentage}%`,
                        classes: recente_charge.monthly_draft_persentage > 0 ? 'stock-up' : 'stock-down'
                      }}
                  />
                  <Tabel.Cell
                    mainContent={joined_in.split('/').slice(0, 2).join(' ')}
                    subContent={joined_in.split('/')[2]}
                  />
                  <Tabel.Cell>
                    <Tabel.RowControlls>
                      <MiniButton iconClass='fa-pen' />
                      <MiniButton classes='row-explor-btn' iconClass='fa-ellipsis-h' />
                    </Tabel.RowControlls>
                  </Tabel.Cell>
                </Tabel.Row>
              ))}

          </Tabel.Body>
        </Tabel>
        <span onClick={this.onExport} className='btn primary-color explort-csv-btn'>Explore.CSV</span>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ activities }) => ({
  customers: activities.customers.customers || []
});
export default connect(mapStateToProps)(CustomerList);
