import React from 'react';
import Table from 'components/common/Tables';
import './style.css';
import PropTypes from 'prop-types';
import moment from 'moment';


const AbandonmentList = ({ list }) => (
  <Table>
    <Table.Head>
      <Table.HeadCell>Email</Table.HeadCell>
      <Table.HeadCell>Name</Table.HeadCell>
      <Table.HeadCell>Abandonment times</Table.HeadCell>
      <Table.HeadCell>Captured At</Table.HeadCell>
      <Table.HeadCell>Status</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {list.map((prospect) => {

        const { email, history = [], firstName = '', lastName = '', potential, date } = prospect;

        const fullName = (firstName || lastName) ? `${firstName}${lastName ? (` ${lastName}`) : ''}` : 'Unavailable';
        return (
          <Table.Row className='parent-hover'>
            <Table.Cell mainContent={email} />
            <Table.Cell mainContent={fullName} />
            <Table.Cell mainContent={history.length} />
            <Table.Cell mainContent={moment(date).format('MMM DD YYYY')} />
            <Table.Cell mainContent={`${!potential ? 'Pending' : 'Confirmed Prospect'}`} />
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);
AbandonmentList.propTypes = { list: PropTypes.arrayOf(PropTypes.object) };
AbandonmentList.defaultProps = { list: [] };
export default AbandonmentList;
