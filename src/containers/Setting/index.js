import React, { Component } from 'react';

import './style.css'
import GenralSetting from './sub/GenralSetting'
import MarketPlace from './sub/MarketPlace'
import Email from './sub/Email'
import TeamMembers from './sub/TeamMembers'
import Account from './sub/Account'
import Billing from './sub/Billing'

import common from 'components/common'
// import { Button } from '../../components/common/Buttons';

const { TabsNavigator, Button, MainTitle, FlexBoxesContainer } = common
/* temp component tp represent the empty tap */

const newProductTabs = [
    { title: 'Genral Setting', hash: 'genral' },
    { title: 'Marketplace', hash: 'marketplace' },
    { title: 'Email', hash: 'email' },
    { title: 'Team Members', hash: 'team' },
    { title: 'Account', hash: 'account' },
    { title: 'Billing', hash: 'billing' }
]


const ActiveTabe = ({ tabName, ...props }) => {
    switch (tabName) {
        case 'genral': return <GenralSetting />
        case 'marketplace': return <MarketPlace />
        case 'email': return <Email />
        case 'team': return <TeamMembers />
        case 'account': return <Account />
        case 'billing': return <Billing />
        default: return <GenralSetting />
    }
}


class NewProductDetailes extends Component {
    render() {
        const tabName = this.props.history.location.hash.slice(1)
        return (
            <div className='setting-details-page'>
                <FlexBoxesContainer classes={['space-between-elements']}>
                    <MainTitle >Settings</MainTitle>
                    <Button classes=' primary-color'>
                        Save Changes
                    </Button>
                </FlexBoxesContainer>
                <TabsNavigator
                    tabs={newProductTabs}
                    history={this.props.history} />
                <ActiveTabe tabName={tabName} />

            </div>
        );
    }
}

export default NewProductDetailes;