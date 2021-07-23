import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Subscriptions from './sub/Subscriptions';
import { exportOrdersToCsv } from 'libs';
import './style.css';
import { notification } from 'libs';
import common from 'components/common';
import moment from 'moment';
import Orders from './sub/Orders';
import { getDynamicPaginationOptions } from 'components/common/Tables/Pagination';
import { FlexBox } from 'components/common/boxes';
import TextField from 'components/common/Inputs/TextField';
import useSearch from 'libs/hooks/useSearch';


const searchTargets = [
  'customer.firstName',
  'customer.lastName',
  'customer.email',
  'orderNumber',
  'products.0.name'
];
const getSubscriptionsList = (orders) =>
  orders.reduce((subs, { products = [], ...order }) => {
    const subscriptionProducts = products
      .filter(({ payment = {} }) => payment.paymentType === 'Subscription')
      .map((product) => ({ ...order, product }));
    return [...subs, ...subscriptionProducts];
  }, []);


const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  SubTabs,
  Button
} = common;

const initialPaginationProps = { eachPageLimit: 8 };
const Transactions = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('Orders');
  const [downloading, setDownloading] = useState(false);
  const isOrdersActive = activeTab === 'Orders';

  const [results, onSearch, searchKey] = useSearch(orders, { targets: searchTargets });
  const orderedList = results.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));
  const subscriptions = getSubscriptionsList(orderedList);
  const pageContentRef = useRef(null);


  const onExportToCSV = () => {
    const dataRows = exportOrdersToCsv(orders, { paymentType: isOrdersActive ? 'Onetime' : 'Subscription' });

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
      if (orders.length) {
        onExportToCSV();
        return notification.success('CSV report for transactions recorder downloaded');
      }
      notification.failed('There are not enough records to be downloaded');
    }, 1200);
  };

  const paginationOptions = getDynamicPaginationOptions(pageContentRef, { unitHeight: 80, ignoreSize: 250 }, initialPaginationProps);
  const onSearchChange = (e) => onSearch(e.target?.value);
  const renderSearchBar = (
    <FlexBox flexEnd flex >
      <TextField
        className='ml-3'
        onChange={(onSearchChange)}
        value={searchKey}
        placeholder={`Search in ${isOrdersActive ? 'Orders' : 'Subscriptions'}`}
        style={{ width: '360px', borderRadius: 4, height: 28, fontSize: 14 }}
      />
    </FlexBox>
  );

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
      <PageContent ref={pageContentRef}>
        <SubTabs
          defaultTab='Orders'
          onTabChange={setActiveTab}
          headSuffix={renderSearchBar}
          tabs={{
            Orders: <Orders data={orderedList} paginationOptions={paginationOptions} />,
            Subscriptions: <Subscriptions data={subscriptions} paginationOptions={paginationOptions} />
          }}
        />
      </PageContent>
    </Page>
  );
};


const mapStateToProps = ({ orders = [] }) => ({ orders });
Transactions.propTypes = {
  orders: PropTypes.array,
  subscriptions: PropTypes.array
};
Transactions.defaultProps = {
  orders: [],
  subscriptions: []
};
export default connect(mapStateToProps)(Transactions);
