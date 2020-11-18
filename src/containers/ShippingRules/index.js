import React from 'react';
import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';
import { Page, PageContent } from '../../components/common/Layout';
import ShippingRules from './main.js';

import './style.css';


const Setting = () => {
  return (
    <Page key='settings' className='setting-details-page'>
      <PageContent className='test-width'>
        <ShippingRules />
      </PageContent>
    </Page>
  );
};

const mapStateToProps = ({ brands, user }) => ({ brands, user });

export default connect(mapStateToProps, settingsActions)(Setting);
