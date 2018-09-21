import React from 'react';


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
        </div>
    </div>
);