import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Subscriptions from './sub/Subscriptions'
import {  exportOrdersToCsv } from 'libs'
import './style.css'
// import ProductDetailes from './sub/ProductDetails'

import common from 'components/common'
import moment from 'moment';
import Orders from './sub/Orders'


const getSubscriptionsList = (orders) => orders.reduce((subs, { products = [], ...order }) => {
        const subscriptionProducts = products
            .filter(({ payment = {} }) => payment.paymentType === 'Subscription')
            .map(product => ({ ...order, product }))
        return [...subs, ...subscriptionProducts]
    }, []);


const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  SubTabs,
  Button
} = common;


const Transactions = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [downloading, setDownloading] = useState(false);

  const orderedList = orders.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));

  const subscriptions = getSubscriptionsList(orderedList);

  const onExportToCSV = () => {
    const dataRows = exportOrdersToCsv(orders, {
      paymentType: activeTab === 'Orders' && 'Subscription'
    });

    const fileName = `${activeTab}-${moment().format('MMM DD YYYY')}.csv`;
    
    const download = document.createElement('a');
    const fileHref = `data:text/csv;charset=utf-8,${encodeURIComponent(dataRows)}`;
    download.setAttribute('href', fileHref);
    download.setAttribute('download', fileName);
    download.click();
  };

  const onDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onExportToCSV();
    }, 1200);
  };

  return (
    <Page className='products-details-page'>
      <PageHeader>
        <MainTitle>Transactions</MainTitle>
        <Button
          onprogress={downloading}
          disabled={downloading}
          onClick={onDownloadReport}
          className='primary-color'
        >
                    Export csv
        </Button>
      </PageHeader>
      <PageContent>
        <SubTabs
          defaultTab='Orders'
          onTabChange={setActiveTab}
          tabs={{
            Orders: <Orders orders={orderedList} />,
            Subscriptions: <Subscriptions subscriptions={subscriptions} />,
          }}
        />
      </PageContent>
    </Page>
  );
};


const mapStateToProps = ({ orders = [] }) => ({
  orders
});
Transactions.propTypes = {
  orders: PropTypes.array,
  subscriptions: PropTypes.array
};
Transactions.defaultProps = {
  orders: [],
  subscriptions: []
};
export default connect(mapStateToProps)(Transactions);
