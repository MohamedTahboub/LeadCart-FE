import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import clx from 'classnames';

import { CustomerPanelModal } from './components';
import { getPriceWithCurrency } from 'libs';
import Table, { withPagination } from 'components/common/Tables';
import * as customersActions from 'actions/customers';
import { checkObject } from 'helpers/common';
import common from 'components/common';
import { FlexBox } from '../../components/common/boxes';

import './style.css';
import { getDynamicPaginationOptions } from 'components/common/Tables/Pagination';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  MiniButton,
  Avatar,
  InputRow
} = common;

const { TextField } = InputRow;
const initialPaginationProps = { eachPageLimit: 10 };
const CustomerTable = withPagination(({ data: filteredCustomers, showPanel, activeCustomer, toggleCustomerPanel, defaultBrandCurrency }) => {

  return (
    <Table className={clx('customer-lab-table', { 'widget-open': showPanel })}>
      <Table.Head >
        <Table.SmallCell />
        <Table.HeadCell nowrap>Customer Name</Table.HeadCell>
        <Table.HeadCell nowrap className={clx('d-md-none', { 'd-none': showPanel })}>Email</Table.HeadCell>
        <Table.HeadCell nowrap className={clx('d-md-none', { 'd-none': showPanel })}>Phone Number</Table.HeadCell>
        <Table.HeadCell nowrap>Orders</Table.HeadCell>
        <Table.HeadCell nowrap>Life Time Charges</Table.HeadCell>
        <Table.HeadCell nowrap>History</Table.HeadCell>
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
                <Table.Row
                  key={email}
                  noMinWidth
                  // orderInList={orderInList}s
                  className={clx('order-table-row', { 'active-row': activeCustomer.email === email })}
                >
                  <Table.SmallCell>
                    <Avatar name={`${firstName} ${lastName}`} />
                  </Table.SmallCell>
                  <Table.Cell mainContent={`${firstName} ${lastName}`} />
                  <Table.Cell className={clx('d-md-none', { 'd-none': showPanel })} mainContent={email} />
                  <Table.Cell className={clx('d-md-none', { 'd-none': showPanel })} mainContent={phoneNumber} />
                  <Table.Cell mainContent={(
                    <FlexBox center='v-center'>
                      <span className='bold-text mr-2'>{orders.length}</span>
                      <FiBox className='gray-text' />
                    </FlexBox>
                  )}
                  />
                  <Table.Cell mainContent={getPriceWithCurrency(lifeTimeCharges, defaultBrandCurrency)} />
                  <Table.Cell mainContent={(
                    <MiniButton onClick={() => toggleCustomerPanel(customer)}>
                      {(showPanel && activeCustomer.email === email) ? <MdClose /> : <FaEllipsisH />}
                    </MiniButton>
                  )}
                  />
                </Table.Row>
              );
            })}
      </Table.Body>
    </Table>
  );
});

const CustomersLab = ({ customers, orderRefund, defaultBrandCurrency }) => {

  const [showPanel, setShowPanel] = useState(false);
  const [activeCustomer, setCustomer] = useState({});
  const [filterValue, setFilter] = useState('');
  const pageContentRef = useRef(null);

  const onSearchChange = ({ target: { value } }) => setFilter(value);
  const toggleCustomerPanel = (customer = {}) => {
    setCustomer((activeCustomer = {}) => {
      if (activeCustomer.email === customer.email) {
        setShowPanel(false);
        return {};
      } else {
        setShowPanel(true);
        return customer;
      }
    });
  };

  useEffect(() => {
    const customer = customers.find((customer) => activeCustomer.email === customer.email);
    if (customer) setCustomer(customer);
    //eslint-disable-next-line
  }, [customers]);


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

  const customerTableProps = { data: filteredCustomers, showPanel, activeCustomer, toggleCustomerPanel, defaultBrandCurrency };
  const paginationOptions = getDynamicPaginationOptions(pageContentRef, { unitHeight: 80, ignoreSize: 156 }, initialPaginationProps);

  return (
    <Page>
      <PageHeader withRefreshBtn >
        <MainTitle>
          <div className='d-flex align-center justify-content-start'>
            Customers
            <TextField
              className='ml-3'
              onChange={onSearchChange}
              value={filterValue}
              name='customer'
              placeholder='Search customers'
            />
          </div>
        </MainTitle>
      </PageHeader>

      <PageContent ref={pageContentRef} className='d-flex overflow-x-hidden overflow-y-scroll py-0 mt--8px' style={{ marginTop: -8 }}>
        <CustomerTable {...customerTableProps} paginationOptions={paginationOptions}/>
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

const mapStateToProps = ({
  customers: { list },
  settings: { generalModel: { currency: defaultBrandCurrency = 'USD' } = {} } = {}
}) => ({ customers: list, defaultBrandCurrency });

export default connect(mapStateToProps, customersActions)(CustomersLab);
