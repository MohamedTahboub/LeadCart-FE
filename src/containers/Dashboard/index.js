import React, { useEffect, useState } from 'react';
import { Chart, MiniChart } from 'components/LeadCartCharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateOptions from 'data/dateOptions';
import chartsDummyData from 'data/dashboardChartsData.js';
import './style.css';

import common from 'components/common';

const {
  MainTitle,
  Title,
  Page,
  PageHeader,
  PageContent,
  InputRow,
  InsightBadge,
  SubTabs
} = common;

const Dashboard = ({
  products,
  ...props
}) => {
  const [filterKeys, setFilterKeys] = useState({});

  useEffect(() => {
    const unlisten = props.history.listen((location, action) => {
      if (window.userpilot) window.userpilot.reload();
    });
    return () => {

    };
  }, []);

  const onChange = (e) => {
    console.log(e);
  };

  return (
    <Page>
      <PageHeader withRefreshBtn>
        <MainTitle>Sales Overview</MainTitle>
      </PageHeader>
      <PageContent>
        <div className='dashboard-page'>
          <div className='dashboar-content-holder'>
            <div className='dashboard-content'>
              <div className='chart-preview section-box'>
                <div className='chart-head'>
                  <InputRow.SearchInput
                    className='chart-select-filter'
                    options={products}
                    value={filterKeys.product}
                    defaultValue='All Products'
                    target='name'
                    name='productId'
                    onChange={onChange}
                  />
                  <InputRow.SearchInput
                    className='chart-select-filter'
                    options={dateOptions}
                    value={filterKeys.date}
                    defaultValue={dateOptions[0].label}
                    target='label'
                    name='date'
                    onChange={onChange}
                  />
                  <i className='fas fa-cog chart-setting-btn' />
                </div>
                <div className='chart-header-cards'>
                  <div className='chart-preview-card'>
                    <div className='label'>Avg. daily rev</div>
                    <div className='value'>$32</div>
                  </div>
                  <div className='chart-preview-card'>
                    <div className='label'>Views</div>
                    <div className='value'>520</div>
                  </div>
                  <div className='chart-preview-card active'>
                    <div className='label'>Sales</div>
                    <div className='value'>131</div>
                  </div>
                  <div className='chart-preview-card'>
                    <div className='label'>Cart Conversion</div>
                    <div className='value'>%25.2</div>
                  </div>
                  <div className='chart-preview-card'>
                    <div className='label'>Refunds</div>
                    <div className='value warning'>$30</div>
                  </div>
                  <div className='chart-preview-card'>
                    <div className='label'>Refund Rate</div>
                    <div className='value warning'>%15.4</div>
                  </div>
                  <div className='chart-preview-card'>
                    <div className='label'>Net Revenue</div>
                    <div className='value'>$320</div>
                  </div>
                </div>
                <div className='chart-body'>
                  <Chart />
                </div>
              </div>
              {/* overview insights section */}
              <div className='overview-insights-container'>
                <InsightBadge
                  title='Gross Revenue'
                  value={1579}
                  icon={<i className='fas fa-eye' />}
                  chart={(
                    <MiniChart />
                  )}
                />
                <InsightBadge
                  title='Net Revenue'
                  value={37}
                  icon={<i className='fas fa-user' />}
                  chart={(
                    <MiniChart />
                  )}
                />
                <InsightBadge
                  title='Total Views'
                  value='$4500.00'
                  icon={<i className='fas fa-wallet' />}
                  chart={(
                    <MiniChart />
                  )}
                />
                <InsightBadge
                  title='Conversion Rate'
                  value='$4500.00'
                  icon={<i className='fas fa-wallet' />}
                  chart={(
                    <MiniChart />
                  )}
                />
                <InsightBadge
                  title='Total Refunds'
                  value='$4500.00'
                  icon={<i className='fas fa-wallet' />}
                  chart={(
                    <MiniChart />
                  )}
                />
                <InsightBadge
                  title='Total Transactions'
                  value='$4500.00'
                  icon={<i className='fas fa-wallet' />}
                  chart={(
                    <MiniChart />
                  )}
                />
                <InsightBadge
                  title='Total Customers'
                  value={5}
                  icon={<i className='fas fa-file-invoice-dollar' />}
                  chart={(
                    <MiniChart />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
};


Dashboard.propTypes = {
  products: PropTypes.arrayOf({})

};
Dashboard.defaultProps = {
  products: []
};
const mapStateToProps = ({
  products: {
    products = []
  }
}) => ({
  products: products.map(({
    _id,
    name
  }) => ({
    label: name,
    value: _id
  }))
});


export default connect(mapStateToProps)(Dashboard);
/*

                  <span className='chart-total-profite'>
                    <span className='chart-profit-value'>
                      $102 387.00
                    </span>
                    <span className='stock-up'>17.4%</span>
                  </span>

      <div className='dashboard-temp-data-message'>
        Note: This is dummy data. It will be updated once you have live transactions.
      </div>
  <div className='chart-head-child'>
                  <div className='chart-preview-options'>
                    <span className='chart-option'>day</span>
                    <span className='chart-option'>week</span>
                    <span className='chart-option'>month</span>
                    <span className='chart-option'>year</span>
                  </div>
                </div>

*/
