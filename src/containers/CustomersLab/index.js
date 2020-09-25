import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { FaEllipsisH } from 'react-icons/fa';
import clx from 'classnames';

import { CustomerPanelModal } from './components';
import { getPriceWithCurrency } from 'libs';
import Table from 'components/common/Tables';
import * as customersActions from 'actions/customers';
import { checkObject } from 'helpers/common';
import common from 'components/common';
import './style.css';
import { FlexBox } from '../../components/common/boxes';
import { FiBox } from 'react-icons/fi';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  MiniButton,
  Avatar,
  InputRow
} = common;

const CustomersLab = ({ customers, orderRefund, defaultBrandCurrency }) => {

  const [showPanel, setShowPanel] = useState(false);
  const [activeCustomer, setCustomer] = useState({});
  const [filterValue, setFilter] = useState('');

  const onSearchChange = (filterValue) => setFilter(filterValue);
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
    customers.find((customer) => {
      if (activeCustomer.email === customer.email) {
        setCustomer(customer);
        return true;
      }
      return false;
    });
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

  return (
    <Page>
      <PageHeader withRefreshBtn>
        <MainTitle>
          <div className='d-flex align-center justify-content-start'>
            Customers
            <InputRow.SearchInput className='ml-3' placeholder='Search customers' onSearch={onSearchChange} />
          </div>
        </MainTitle>
      </PageHeader>
      <PageContent className='d-flex overflow-x-hidden overflow-y-scroll py-0 mt--28px'>
        <Table className={clx('customer-lab-table', { 'widget-open': showPanel })}>
          <Table.Head>
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
                      orderInList={orderInList}
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
