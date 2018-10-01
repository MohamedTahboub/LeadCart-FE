import React from 'react';
import { LineChart } from 'components/LeadCartCharts'
import {Menu , Link } from 'components/common/MainMenu'
import InsightBadge from 'components/common/InsightBadge'
import './style.css'



export default props => (
    <div className='dashboard-page'>
        <div className='dashboard-head'>
            <span className='head-title'>Sales Overview</span>
            <span className='sub-title'>Dashboard</span>
        </div>
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
            {/* Chart previews section*/}
            <div className='dashboard-content'>

                <div className='chart-preview section-box'>
                    <div className='chart-head'>
                        <div className='chart-head-child'>
                            <span className='chart-title'>gross sales</span>
                            <span className='chart-total-profite'>
                                <span className='chart-profit-value'>
                                    $12 143.00
                                    </span>
                                <span className='stock-up'>12.4%</span>
                            </span>
                        </div>

                        <div className='chart-head-child'></div>

                        <div className='chart-head-child'>
                            <div className='chart-preview-options'>
                                <span className='chart-option'>day</span>
                                <span className='chart-option'>week</span>
                                <span className='chart-option'>month</span>
                                <span className='chart-option'>year</span>
                            </div>
                        </div>
                    </div>

                    <div className='chart-body'>
                        <LineChart />
                    </div>
                </div>

                {/* overview insights section*/}
                <div className='overview-insights-container'>
                    <InsightBadge title={'page views'} value={1579} icon={<i className="fas fa-eye"></i>} />
                    <InsightBadge title={'active subscriptions'} value={37} icon={<i className="fas fa-user"></i>} />
                    <InsightBadge title={'open payments'} value={'$4500.00'} icon={<i className="fas fa-wallet"></i>} />
                    <InsightBadge title={'open invoices'} value={5} icon={<i className="fas fa-file-invoice-dollar"></i>} />
                </div>
            </div>
        </div>
    </div>
);