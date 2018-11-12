import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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
    { title: 'Genral Setting', sub: '/settings/genral' },
    { title: 'Marketplace', sub: '/settings/marketplace' },
    { title: 'Email', sub: '/settings/email' },
    { title: 'Team Members', sub: '/settings/team' },
    { title: 'Account', sub: '/settings/account' },
    { title: 'Billing', sub: '/settings/billing' }
]

class Setting extends Component {
    render() {
        return (
            <div key={Date.now()} className='setting-details-page'>
                <FlexBoxesContainer classes={['space-between-elements']}>
                    <MainTitle >Settings</MainTitle>
                    <Button classes=' primary-color'>
                        Save Changes
                    </Button>
                </FlexBoxesContainer>
                <TabsNavigator
                    tabs={newProductTabs}
                    history={this.props.history} />
                <Switch>
                    <Route path='/settings/marketplace' component={MarketPlace} />
                    <Route exact path='/settings/email' component={Email} />
                    <Route exact path='/settings/team' component={TeamMembers} />
                    <Route exact path='/settings/account' component={Account} />
                    <Route exact path='/settings/billing' component={Billing} />
                    <Route path='/settings' component={GenralSetting} />
                </Switch>

            </div> 
        );
    }
}


export default Setting;