import React, { useEffect } from 'react';
import Chart from 'components/LeadCartCharts/Chart';
import { Menu, Link } from 'components/common/MainMenu';
import InsightBadge from 'components/common/InsightBadge';
import './style.css';

import common from 'components/common';
const {
  MainTitle,
  Title,
  Page,
  PageHeader,
  PageContent,
  SubTabs
} = common;

export default (props) => {

  useEffect(() => {
    const unlisten = props.history.listen((location, action) => {
      if (window.userpilot)
        window.userpilot.reload()
    });
    return () => {
    };
  }, []);

  return (
    <Page>
      <PageHeader>
        <MainTitle>Dashboard</MainTitle>
        <Title>Sales Overview</Title>
      </PageHeader>
      <PageContent>
        <div className='dashboard-page'>
          <div className='dashboar-content-holder'>
            <div className='dashboard-sidebar'>
              <span className='btn btn-primary'>Gross Sales</span>
              <Menu>
                <Link>Profit</Link>
                <Link>LTV</Link>
                <Link>Refunds</Link>
                <Link>Orders</Link>
                <Link>Page Views</Link>
                <Link>Conversion Rate</Link>
                <Link>Monthly Recurring Revenue</Link>
                <Link>Active Subsicriptions</Link>
                <Link>Churn Rate</Link>
              </Menu>
            </div>
            {/* Chart previews section */}
            <div className='dashboard-content'>

              <div className='chart-preview section-box'>
                <div className='chart-head'>
                  <span className='chart-title'>gross sales</span>
                  <span className='chart-total-profite'>
                    <span className='chart-profit-value'>
                      $102 387.00
                  </span>
                    <span className='stock-up'>17.4%</span>
                  </span>
                </div>

                <div className='chart-body'>
                  <Chart />
                </div>
              </div>

              {/* overview insights section */}
              <div className='overview-insights-container'>
                <InsightBadge title='page views' value={1579} icon={<i className='fas fa-eye' />} />
                <InsightBadge title='active subscriptions' value={37} icon={<i className='fas fa-user' />} />
                <InsightBadge title='open payments' value='$4500.00' icon={<i className='fas fa-wallet' />} />
                <InsightBadge title='open invoices' value={5} icon={<i className='fas fa-file-invoice-dollar' />} />
              </div>
            </div>
          </div>
        </div>
        <div className='dashboard-temp-data-message'>
          Note: This is dummy data. It will be updated once you have live transactions.
      </div>
      </PageContent>
    </Page>
  )
}


/*
  <div className='chart-head-child'>
                  <div className='chart-preview-options'>
                    <span className='chart-option'>day</span>
                    <span className='chart-option'>week</span>
                    <span className='chart-option'>month</span>
                    <span className='chart-option'>year</span>
                  </div>
                </div>

*/
