import React from 'react';

import Upsells from './sub/Upsells'
import Funnels from './sub/Funnels'

import './style.css'
// import ProductDetailes from './sub/ProductDetails'

import common from 'components/common'

const { TabsNavigator, Button } = common
/* temp component tp represent the empty tap */
const EmptyTab = props => (
    <div className="nothing">...in progress</div>
)
const UpsellsTabs = [
    { title: 'Upsells', hash: 'upsells' },
    { title: 'Funnels', hash: 'funnels' }
]



const ActiveTabe = ({ tabName, ...props }) => {
    switch (tabName) {
        case 'upsells': return <Upsells />
        case 'funnels': return <Funnels />
        default: return <EmptyTab />
    }
}


export default props => {
    const tabName = props.history.location.hash.slice(1)
    return (
        <React.Fragment>
            <Button classes='primary-color' >
                <i class="fas fa-plus"></i> New Upsells
            </Button>
            <TabsNavigator
                tabs={UpsellsTabs}
                history={props.history} />
            <ActiveTabe tabName={tabName} />
        </React.Fragment>
    );
}

