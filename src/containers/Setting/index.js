import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.css'
import GeneralSetting from './sub/GeneralSetting'
import Integrations from './sub/Integrations'
import Email from './sub/Email'
import TeamMembers from './sub/TeamMembers'
import Account from './sub/Account'
import Billing from './sub/Billing'
import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux'

import common from 'components/common'
import { Page , PageContent, PageHeader } from '../../components/common/Layout';
// import { Button } from '../../components/common/Buttons';
const { TabsNavigator, Button, MainTitle, FlexBoxesContainer } = common
/* temp component tp represent the empty tap */

const newProductTabs = [
    { title: 'Brands Setting', sub: '/settings/brand' },
    { title: 'Integrations', sub: '/settings/integrations' },
    { title: 'Email', sub: '/settings/email' },
    { title: 'Team Members', sub: '/settings/team' },
    { title: 'Account', sub: '/settings/account' },
    { title: 'Billing', sub: '/settings/billing' }
]

class Setting extends Component {
    onChangesSave = () => {
        const pageName = this.props.history.location.pathname.split('/')[2]

        switch (pageName) {
            case 'brand':
                return this.props.saveUserGeneralSettings()
            // case 'checkout':
            //     return this.props.updateProductCheckoutDesign()
            // case 'payments':
            //     return this.props.updateProductPayment()
            // case 'order':
            //     return this.props.updateProductOrderBump()
            // case 'advanced':
            //     return this.props.updateProductAdvanceSetting()
        }
    }

    render() {

        return (
            <Page key='settings' className='setting-details-page'>
                <PageHeader>
                    <MainTitle >Settings</MainTitle>
                    <Button onClick={this.onChangesSave} className=' primary-color'>
                        Save Changes
                    </Button>
                </PageHeader>

                <PageContent>
                    <TabsNavigator
                        tabs={newProductTabs}
                        history={this.props.history} />
                    <Switch>
                        <Route path='/settings/integrations' component={Integrations} />
                        <Route exact path='/settings/email' component={Email} />
                        <Route exact path='/settings/team' component={TeamMembers} />
                        <Route exact path='/settings/account' component={Account} />
                        <Route exact path='/settings/billing' component={Billing} />
                        <Route path='/settings' component={GeneralSetting} />
                    </Switch>

                </PageContent>
            </Page>
        );
    }
}


export default connect(null, settingsActions)(Setting);