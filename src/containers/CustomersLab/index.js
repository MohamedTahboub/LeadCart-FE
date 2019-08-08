import React, { useState } from 'react';
import { connect } from 'react-redux'
import './style.css'
import { CustomerPanelModal } from './components';
import { RoundTow } from 'libs';
import Table from 'components/common/Tables';

import common from 'components/common'

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  SubTabs,
  MiniButton,
  Avatar
} = common


const CustomersLab = ({ customers }) => {

  const [showPanel, setShowPanel] = useState(false)
  const [activeCustomer, setCustomer] = useState({})

  const showCustomerPanel = customer => {
    setShowPanel(true);
    setCustomer(customer)
  }

  const hideCustomerPanel = customer => {
    setShowPanel(false);
    setCustomer(customer)
  }

  return (
    <Page>
      <PageHeader>
        <MainTitle>Customers</MainTitle>
      </PageHeader>
      <PageContent>
        <SubTabs
          defaultTab='Customers'
          tabs={{
            'Customers': (
              <Table>
                <Table.Head>
                  <Table.SmallCell />
                  <Table.HeadCell>Customer Name</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Phone Number</Table.HeadCell>
                  <Table.HeadCell>Orders</Table.HeadCell>
                  <Table.HeadCell>Life time Charges</Table.HeadCell>
                  <Table.HeadCell>Expand</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {customers
                    .map((customer, orderInList) => {
                      const {
                        firstName,
                        lastName,
                        email,
                        lifeTimeCharges=0,
                        phoneNumber='N/A',
                        orders = []
                      } = customer
                      return (
                        <Table.Row key={email} orderInList={orderInList}>
                          <Table.SmallCell>
                            <Avatar name={`${firstName} ${lastName}`} />
                          </Table.SmallCell>
                          <Table.Cell mainContent={`${firstName} ${lastName}`} />
                          <Table.Cell mainContent={email} />
                          <Table.Cell mainContent={phoneNumber} />
                          <Table.Cell mainContent={orders.length} />
                          <Table.Cell mainContent={`$ ${RoundTow(lifeTimeCharges)}`} />
                          <Table.Cell mainContent={(
                            <MiniButton onClick={() => showCustomerPanel(customer)}>
                              <i className="fas fa-ellipsis-h" />
                            </MiniButton>
                          )} />
                        </Table.Row>
                      )
                    })}

                </Table.Body>
              </Table>
            ),
          }}
        />
      </PageContent>
      {showPanel && (
        <CustomerPanelModal
          isVisible={showPanel}
          onClose={hideCustomerPanel}
          customer={activeCustomer}
        />
      )}
    </Page>
  );
}

// CustomerList.propTypes = {
//   customers: PropType.array.default([])
// }

const mapStateToProps = ({ customers: { list } }) => ({
  customers: list
});

export default connect(mapStateToProps)(CustomersLab);
