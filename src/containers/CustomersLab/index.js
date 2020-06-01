import React, { useState } from 'react';
import { connect } from 'react-redux';
import './style.css';
import { CustomerPanelModal } from './components';
import { RoundTow } from 'libs';
import Table from 'components/common/Tables';
import * as customersActions from 'actions/customers';
import { checkObject } from 'helpers/common';
import clx from 'classnames';

import common from 'components/common';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  SubTabs,
  MiniButton,
  Avatar,
  InputRow
} = common;


const CustomersLab = ({ customers, orderRefund }) => {

  const [showPanel, setShowPanel] = useState(false);
  const [activeCustomer, setCustomer] = useState({});
  const [filterValue, setFilter] = useState('');

  const onSearchChange = (filterValue) => setFilter(filterValue);

  const showCustomerPanel = (customer) => {
    setShowPanel(true);
    setCustomer(customer);
  };

  const hideCustomerPanel = (customer) => {
    setShowPanel(false);
    setCustomer(customer);
  };

  const filteredCustomers = customers.filter((customer) => {
    return checkObject(customer)
      .atKeys(['firstName', 'lastName', 'email'])
      .joinKeys(['firstName', 'lastName'])
      .containing(filterValue);
  });

  return (
    <Page>
      <PageHeader withRefreshBtn >
        <MainTitle>
          <div className='d-flex align-center justify-content-start'>
          Customers
            <InputRow.SearchInput className='ml-3' placeholder='Search customers' onSearch={onSearchChange}/>
          </div>
        </MainTitle>
      </PageHeader>
      <PageContent className='d-flex overflow-x-hidden overflow-y-scroll py-0'>
        <Table className={clx('customer-lab-table', { 'widget-open': showPanel })}>
          <Table.Head>
            <Table.SmallCell />
            <Table.HeadCell>Customer Name</Table.HeadCell>
            <Table.HeadCell className={clx('d-md-none', { 'd-none': showPanel })}>Email</Table.HeadCell>
            <Table.HeadCell className={clx('d-md-none', { 'd-none': showPanel })}>Phone Number</Table.HeadCell>
            <Table.HeadCell>Orders</Table.HeadCell>
            <Table.HeadCell>Life Time Charges</Table.HeadCell>
            <Table.HeadCell>History</Table.HeadCell>
          </Table.Head>
          <Table.Body className='customers-table-body'>
            {
              filteredCustomers
                .map((customer, orderInList) => {
                  const {
                    firstName,
                    lastName,
                    email,
                    lifeTimeCharges = 0,
                    phoneNumber = 'N/A',
                    orders = []
                  } = customer;
                  return (
                    <Table.Row key={email} orderInList={orderInList}>
                      <Table.SmallCell>
                        <Avatar name={`${firstName} ${lastName}`} />
                      </Table.SmallCell>
                      <Table.Cell mainContent={`${firstName} ${lastName}`} />
                      <Table.Cell className={clx('d-md-none', { 'd-none': showPanel })} mainContent={email} />
                      <Table.Cell className={clx('d-md-none', { 'd-none': showPanel })} mainContent={phoneNumber} />
                      <Table.Cell mainContent={orders.length} />
                      <Table.Cell mainContent={`$ ${RoundTow(lifeTimeCharges)}`} />
                      <Table.Cell mainContent={(
                        <MiniButton onClick={() => showCustomerPanel(customer)}>
                          <i className='fas fa-ellipsis-h' />
                        </MiniButton>
                      )}
                      />
                    </Table.Row>
                  );
                })}
          </Table.Body>
        </Table>
        <CustomerPanelModal
          isVisible={showPanel}
          onClose={hideCustomerPanel}
          customer={activeCustomer}
          onOrderRefund={orderRefund}
        />
      </PageContent>
    </Page>
  );
};

// CustomerList.propTypes = {
//   customers: PropType.array.default([])
// }

const mapStateToProps = ({ customers: { list } }) => ({ customers: list });

export default connect(mapStateToProps, customersActions)(CustomersLab);
