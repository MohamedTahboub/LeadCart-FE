import React, { useState } from 'react';
import { connect } from 'react-redux'
import './style.css'
import { CustomerPanelModal } from './components';

import Tabel from 'components/common/Tabels';

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
        <MainTitle>Customers Lab</MainTitle>
      </PageHeader>
      <PageContent>
        <SubTabs
          defaultTab='Customers'
          tabs={{
            'Customers': (
              <Tabel>
                <Tabel.Head>
                  <Tabel.SmallCell />
                  <Tabel.HeadCell>Customer Name</Tabel.HeadCell>
                  <Tabel.HeadCell>Email</Tabel.HeadCell>
                  <Tabel.HeadCell>Phone Number</Tabel.HeadCell>
                  <Tabel.HeadCell>Orders</Tabel.HeadCell>
                  <Tabel.HeadCell>Life time Charges</Tabel.HeadCell>
                  <Tabel.HeadCell>Expand</Tabel.HeadCell>
                </Tabel.Head>
                <Tabel.Body>
                  {customers
                    .map((customer, orderInList) => {
                      const {
                        firstName,
                        lastName,
                        email,
                        lifeTimeCharges,
                        phoneNumber,
                        orders = []
                      } = customer
                      return (
                        <Tabel.Row key={email} orderInList={orderInList}>
                          <Tabel.SmallCell>
                            <Avatar name={`${firstName} ${lastName}`} />
                          </Tabel.SmallCell>
                          <Tabel.Cell mainContent={`${firstName} ${lastName}`} />
                          <Tabel.Cell mainContent={email} />
                          <Tabel.Cell mainContent={phoneNumber} />
                          <Tabel.Cell mainContent={orders.length} />
                          <Tabel.Cell mainContent={`${lifeTimeCharges} $`} />
                          <Tabel.Cell mainContent={(
                            <MiniButton onClick={() => showCustomerPanel(customer)}>
                              <i className="fas fa-ellipsis-h" />
                            </MiniButton>
                          )} />
                        </Tabel.Row>
                      )
                    })}

                </Tabel.Body>
              </Tabel>
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
