import React, { Component } from 'react';

import CustomerList from './sub/CustomerList'
import Orders from './sub/Orders'
import Subscriptions from './sub/Subscriptions'

import './style.css'
// import ProductDetailes from './sub/ProductDetails'

import common from 'components/common'

const { MainTitle , TabsNavigator } = common
/* temp component tp represent the empty tap */
const EmptyTab = props =>(
    <div className="nothing">...in progress</div>
)
const activitiesTabs = [
    { title: 'Customer list', hash: 'customers' },
    { title: 'Orders', hash: 'orders' },
    { title: 'Subscriptions', hash: 'subscriptions' }
]



const ActiveTabe = ({ tabName, ...props }) => {
    switch (tabName) {
        case 'customers': return <CustomerList />
        case 'orders': return <Orders />
        case 'subscriptions': return <Subscriptions />
        default: return <EmptyTab />
    }
}


class Activities extends Component {
    render() {
        const tabName = this.props.history.location.hash.slice(1) 
        return (
            <div className='products-details-page'>
                <MainTitle>Activities</MainTitle>
                <TabsNavigator
                    tabs={activitiesTabs}
                    history={this.props.history} />
                <ActiveTabe tabName={tabName} />

            </div>
        );
    }
}

export default Activities;