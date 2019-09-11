import React, { useEffect, useState } from 'react';
import { Chart, MiniChart } from 'components/LeadCartCharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateOptions from 'data/dateOptions';
import chartsDummyData, { getChartsFeed } from 'data/dashboardChartsData.js';
import { ChartTypeCard, ChartsSettingsModal } from './components';
import { reshapeFeed } from './helpers';
import * as dashboardActions from 'actions/dashboard'
import dashboardSettings from 'data/dashboardSettings'

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
  filtersLabels,
  activities,
  settings,
  getDashboardChartsData,
  ...props
}) => {
  const [filterKeys, setFilterKeys] = useState({ date: 'all' });
  const [activeType, setActiveType] = useState('refunds');
  const [chartsFeed, setChartsFeed] = useState({ activities: { refunds: [] }, sums: {} });
  const [updatingCharts, setUpdatingCharts] = useState(false)

  const [showChartsSettingsModal, setShowChartsSettingsModal] = useState(false);

  const onOpenChartsSettingsModal = () => {
    setShowChartsSettingsModal(true);
  };
  const onCloseChartsSettingModal = () => {
    setShowChartsSettingsModal(false);
  };


  useEffect(() => {
    // getChartsFeed(
    //   filterKeys,
    //   {
    //     onSuccess: (feed) => {

    //     },
    //     onFailed: () => {

    //     }
    //   }
    // );

    setChartsFeed(reshapeFeed(activities));
    console.log('updates -------------charts')
    // userPilot routes listener
    // const unlisten = props.history.listen((location, action) => {
    //   if (window.userpilot) window.userpilot.reload();
    // });
    console.log('Settings',settings)
  }, [activities,settings]);

  const onChange = ({ target: { name, value } }) => {
    const filters = { ...filterKeys, [name]: value }
    setFilterKeys(filters);

    setUpdatingCharts(true)
    getDashboardChartsData(
      filters,
      {
        onSuccess: (feed) => {
          setChartsFeed(reshapeFeed(feed));
          setUpdatingCharts(false)
        },
        onFailed: (message) => {
          setUpdatingCharts(false)

        }
      }
    );
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
                    options={filtersLabels}
                    value={filterKeys.product}
                    defaultValue='All Products'
                    target='name'
                    name='product'
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
                  <i
                    role='presentation'
                    onClick={onOpenChartsSettingsModal}
                    className='fas fa-cog chart-setting-btn'
                  />
                  <ChartsSettingsModal
                    show={showChartsSettingsModal}
                    // settings={settings}
                    onClose={onCloseChartsSettingModal}
                  />
                </div>
                <div className='chart-header-cards'>
                  <ChartTypeCard
                    activeType={activeType}
                    label='Avg. daily rev'
                    data={chartsFeed.sums}
                    name='dailyAvg'
                    onClick={setActiveType}
                    prefix='$'
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Views'
                    data={chartsFeed.sums}
                    name='views'
                    prefix={<i className='fas fa-eye' />}
                    onClick={setActiveType}
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Sales'
                    data={chartsFeed.sums}
                    name='sales'
                    onClick={setActiveType}
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Cart Conversion'
                    data={chartsFeed.sums}
                    name='conversion'
                    suffix='%'
                    onClick={setActiveType}
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Refunds'
                    data={chartsFeed.sums}
                    name='refunds'
                    prefix='$'
                    onClick={setActiveType}
                    warning
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Refund Rate'
                    data={chartsFeed.sums}
                    name='refundRate'
                    suffix='%'
                    onClick={setActiveType}
                    warning
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Net Revenue'
                    data={chartsFeed.sums}
                    name='netRevenue'
                    prefix='$'
                    onClick={setActiveType}
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Cart Abandonments'
                    data={chartsFeed.sums}
                    name='cartAbandonments'
                    prefix='$'
                    onClick={setActiveType}
                  />
                  <ChartTypeCard
                    activeType={activeType}
                    label='Abandonments Rate'
                    data={chartsFeed.sums}
                    name='abandonmentsRate'
                    suffix='%'
                    onClick={setActiveType}
                  />
                </div>
                <div className='chart-body'>
                  <Chart
                    data={chartsFeed.activities[activeType]}
                    timelineFilter={filterKeys.date}
                    activeTypeValue={activeType}
                  />
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
  filtersLabels: PropTypes.arrayOf({}),
  activities: PropTypes.arrayOf({}),
  settings: PropTypes.objectOf({}),
  getDashboardChartsData: PropTypes.func.isRequired
};
Dashboard.defaultProps = {
  filtersLabels: [],
  activities: {},
  settings: dashboardSettings
};

const mapStateToProps = ({
  products: { products = [] } = {},
  dashboard: {
    activities,
    settings
  } = {}
}) => ({
  filtersLabels: products.map(({ _id: value, name: label }) => ({ label, value })),
  activities,
  settings
});


export default connect(mapStateToProps, dashboardActions)(Dashboard);
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
