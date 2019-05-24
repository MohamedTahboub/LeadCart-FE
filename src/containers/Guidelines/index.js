import React from 'react';
import dashImage from 'assets/images/dashboardImage.svg';
import common from 'components/common';

import './style.css';

const {
  Page,
  PageContent
} = common;

const goToPage = (ref, history) => history.push(ref);

const GuidlineBoxes = ({ history }) => (
  <Page>
    <div className='guidlines-container'>
      <div className='guidlines-boxies-container'>
        <div className='guidline-box'>
          <span className='guidline-number'>
            STEP 1
          </span>
          <span className='guidline-title'>
            Setup your settings
          </span>
          <span className='guildline-description'>
            Take a minute to customize your receipts, upload your logo, and more.
          </span>
          <span onClick={() => goToPage('/settings/brand', history)} className='guidline-action-btn btn primary-color'>
            Edit settings
          </span>
        </div>
        <div className='guidline-box'>
          <span className='guidline-number'>
            STEP 2
          </span>
          <span className='guidline-title'>
            Connect a processor
          </span>
          <span className='guildline-description'>
            Connect with an existing payment processor or let us create for you.
          </span>
          <span onClick={() => goToPage('/settings/integrations', history)} className='guidline-action-btn btn primary-color'>
            Add payment
          </span>
        </div>
        <div className='guidline-box'>
          <span className='guidline-number'>
            STEP 3
          </span>
          <span className='guidline-title'>
            Create a product
          </span>
          <span className='guildline-description'>
            Seturp your first Leadcart product plan and checkout page in seconds!
          </span>
          <span onClick={() => goToPage('/products', history)} className='guidline-action-btn btn primary-color'>
            Add product
          </span>
        </div>
      </div>
      <img src={dashImage} alt='background' className='dashboard-wall-image' />
    </div>
  </Page>
);

export default GuidlineBoxes;
