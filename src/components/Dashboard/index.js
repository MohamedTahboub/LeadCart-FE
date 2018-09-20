import React from 'react';
import {LineChart} from 'components/LeadCartCharts'

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
                <menu className='menu-container' >
                    <span className='menu-item'>Profit</span>
                    <span className='menu-item'>LTV</span>
                    <span className='menu-item'>Refunds</span>
                    <span className='menu-item'>Orders</span>
                    <span className='menu-item'>Page Views</span>
                    <span className='menu-item'>Conversion Rate</span>
                    <span className='menu-item'>Monthly Recurring Revenue</span>
                    <span className='menu-item'>Active Subsicriptions</span>
                    <span className='menu-item'>Churn Rate</span>
                </menu>
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
                    <div className='insight-box section-box'>
                        <div className='insight-details'>
                            <span className='insight-title'>page views</span>
                            <span className='insight-value'>1579</span>
                        </div>
                        <span className='insight-icon'>
                            <i className="fas fa-eye"></i>
                        </span>
                    </div>

                    <div className='insight-box section-box'>
                        <div className='insight-details'>
                            <span className='insight-title'>active subscriptions</span>
                            <span className='insight-value'>37</span>
                        </div>
                        <span className='insight-icon'>
                            <i className="fas fa-user"></i>
                        </span>
                    </div>

                    <div className='insight-box section-box'>
                        <div className='insight-details'>
                            <span className='insight-title'>open payments</span>
                            <span className='insight-value'>$4500.00</span>
                        </div>
                        <span className='insight-icon'>
                            <i className="fas fa-wallet"></i>
                        </span>
                    </div>

                    <div className='insight-box section-box'>
                        <div className='insight-details'>
                            <span className='insight-title'>open invoices</span>
                            <span className='insight-value'>5</span>
                        </div>
                        <span className='insight-icon'>
                            <i className="fas fa-file-invoice-dollar"></i>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    </div>
);