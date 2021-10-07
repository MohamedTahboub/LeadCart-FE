import React from 'react';
import Table from 'components/common/Tables';
import './style.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MiniButton } from 'components/common/Buttons';
import Tooltip from 'components/common/Tooltip';
import { HiOutlineArchive } from 'react-icons/hi';
import { MdUnarchive } from 'react-icons/md';


const OrderList = ({ list, onShowArchivingModal, isArchived, onUnArchivedLead }) => (
  <Table>
    <Table.Head>
      <Table.HeadCell>Full Name</Table.HeadCell>
      <Table.HeadCell>Email</Table.HeadCell>
      <Table.HeadCell>Captured #</Table.HeadCell>
      <Table.HeadCell>Order Date</Table.HeadCell>
      <Table.HeadCell/>
    </Table.Head>
    <Table.Body>
      {list.map((lead, orderInList) => {

        const { fullName, updatedAt, captureCount, email } = lead;
        return (
          <Table.Row orderInList={orderInList} className='parent-hover'>
            <Table.Cell mainContent={fullName} />
            <Table.Cell mainContent={email} />
            <Table.Cell mainContent={captureCount} />
            <Table.Cell mainContent={moment(updatedAt).format('MMM DD YYYY')} />
            <Table.Cell mainContent={(
              <MiniButton onClick={() => isArchived ? onUnArchivedLead(lead) : onShowArchivingModal(lead)} className='show-on-parent-hover'>
                <Tooltip text={isArchived ? 'Restore' : 'Archive'} placement='top' delay={0.5}>
                  {isArchived ? (
                    <MdUnarchive color='currentColor' size={16} />
                  ) : (
                    <HiOutlineArchive color='currentColor' size={16} />
                  )}
                </Tooltip>
              </MiniButton>
            )}
            />
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);
OrderList.propTypes = { list: PropTypes.arrayOf(PropTypes.object) };
OrderList.defaultProps = { list: [] };
export default OrderList;
