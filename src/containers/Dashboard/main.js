import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getChartPreviewCardDescription, getDateValueReferences } from 'libs';
import * as dashboardActions from 'actions/dashboard';
import { ChartTypeCard, ChartsSettingsModal } from './components';
import { Chart, MiniChart } from 'components/LeadCartCharts';
import { reshapeFeed } from './helpers';
import common from 'components/common';
import dashboardSettings from 'data/dashboardSettings';
import dateOptions from 'data/dateOptions';
import chartCardData from './chartCardData';
import './style.css';


const { MainTitle, Page, PageHeader, PageContent, InputRow, InsightBadge } = common;
const { SearchInput } = InputRow;

const Dashboard = ({
  filtersLabels,
  activities,
  settings,
  getDashboardChartsData,
  defaultCurrency
}) => {
  const [filterKeys, setFilterKeys] = useState({ date: 'weekToDate' });
  const [activeType, setActiveType] = useState('views');
  const [chartsFeed, setChartsFeed] = useState({ activities: { refunds: [] }, sums: {} });
  const [updatingCharts, setUpdatingCharts] = useState(false);
  const [showChartsSettingsModal, setShowChartsSettingsModal] = useState(false);


  const onOpenChartsSettingsModal = () => {
    setShowChartsSettingsModal(true);
  };

  const onCloseChartsSettingModal = () => {
    setShowChartsSettingsModal(false);
  };


  useEffect(() => {
    setChartsFeed(reshapeFeed(activities, getDateValueReferences(filterKeys.date)));
  }, [activities, filterKeys.date, settings]);

  const onChange = ({ target: { name, value: currentValue } }) => {
    let value = currentValue;
    if (value === 'all') value = undefined;
    const filters = { ...filterKeys, [name]: value };
    setFilterKeys(filters);

    setUpdatingCharts(true);

    getDashboardChartsData(
      constructFilters(filters),
      {
        onSuccess: (feed) => {
          setChartsFeed(reshapeFeed(feed));
          setUpdatingCharts(false);
        },
        onFailed: (message) => {
          setUpdatingCharts(false);

        }
      }
    );
  };

  const constructFilters = (filters) => {
    if (filters.product === 'all')
      filters.product = undefined;

    return {
      productId: filters.product,
      category: filters.category,
      date: getDateValueReferences(filters.date)
    };
  };

  return (
    <Page>
      <PageHeader withRefreshBtn data={{ chartsFilters: constructFilters(filterKeys) }}>
        <MainTitle>Sales Overview</MainTitle>
      </PageHeader>

      <PageContent>
        <div className='dashboard-page'>
          <div className='dashboar-content-holder'>
            <div className='dashboard-content'>
              <div className='chart-preview section-box'>
                <div className='chart-head'>
                  <SearchInput
                    className='chart-select-filter'
                    options={filtersLabels}
                    value={filterKeys.product}
                    defaultValue='All Products'
                    target='name'
                    name='product'
                    disabled={updatingCharts}
                    onChange={onChange}
                  />
                  <SearchInput
                    className='chart-select-filter product-categories mx-2'
                    options={[
                      { label: 'All Products Categories', value: 'all' },
                      { label: 'Checkout Products', value: 'checkout' },
                      { label: 'Upsell/Downsell Products', value: 'upsell' }
                    ]}
                    value={filterKeys.category}
                    defaultValue={'all'}
                    // target='category'
                    name='category'
                    disabled={updatingCharts}
                    onChange={onChange}
                  />
                  <SearchInput
                    className='chart-select-filter'
                    options={dateOptions}
                    value={filterKeys.date}
                    defaultValue={dateOptions[0].label}
                    target='label'
                    name='date'
                    disabled={updatingCharts}
                    onChange={onChange}
                  />
                  {updatingCharts && <span className='spinner' />}
                  <i
                    role='presentation'
                    onClick={onOpenChartsSettingsModal}
                    className='fas fa-cog chart-setting-btn'
                  />
                  <ChartsSettingsModal
                    show={showChartsSettingsModal}
                    settings={settings}
                    onClose={onCloseChartsSettingModal}
                  />
                </div>

                <div className='chart-header-cards'>
                  {chartCardData.map((card) => (
                    <ChartTypeCard
                      activeType={activeType}
                      data={chartsFeed.sums}
                      onClick={setActiveType}
                      currency={defaultCurrency}
                      {...card}
                    />
                  ))}
                </div>

                <div className='chart-body'>
                  <Chart
                    data={chartsFeed.activities[activeType]}
                    timelineFilter={filterKeys.date}
                    activeTypeValue={activeType}
                    display={settings.displayMainChart}
                    currency={defaultCurrency}
                  />
                </div>
              </div>

              {/* overview insights section */}
              <div className='overview-insights-container'>

                {settings.defaultCardsSettings.sales.map((card) => (
                  <InsightBadge
                    key={card.value}
                    {...card}
                    activeType={activeType}
                    onClick={setActiveType}
                    title={card.label}
                    name={card.value}
                    description={getChartPreviewCardDescription(card.value)}
                    value={chartsFeed.sums[card.value]}
                    currency={defaultCurrency}
                    chart={(
                      <MiniChart data={chartsFeed.activities[card.value]} />
                    )}
                  />
                ))
                }

                {settings.defaultCardsSettings.refunds.map((card) => (
                  <InsightBadge
                    key={card.value}
                    {...card}
                    activeType={activeType}
                    onClick={setActiveType}
                    title={card.label}
                    name={card.value}
                    description={getChartPreviewCardDescription(card.value)}
                    value={chartsFeed.sums[card.value]}
                    chart={(
                      <MiniChart data={chartsFeed.activities[card.value]} />
                    )}
                  />
                ))}

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
  settings: { generalModel: { currency: defaultCurrency = 'USD' } = {} } = {},
  dashboard: {
    activities,
    settings = {}
  } = {}
}) => {
  const withDefaultSetting = !(settings.defaultCardsSettings && settings.defaultCardsSettings.sales.length);
  return {
    filtersLabels: [{ label: 'All Products', value: 'all' }, ...products.map(({ _id: value, name: label }) => ({ label, value }))],
    activities,
    settings: withDefaultSetting ? dashboardSettings : settings,
    defaultCurrency
  };
};

export default connect(mapStateToProps, dashboardActions)(Dashboard);
