import React from 'react';
import BumpOptions from './BumpOptions'
import BumpOfferDesign from './BumpOfferDesign'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import common from 'components/common'
import "react-tabs/style/react-tabs.css";
// import './style.css'

const { Block ,TabTitle} = common
export default (props) => (
  <Tabs>
    <TabList>
      <Tab><TabTitle >Bump Options</TabTitle></Tab>
      <Tab><TabTitle>Bump Offer Template</TabTitle></Tab>
    </TabList>
    <TabPanel>
      <Block>
        <BumpOptions />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <BumpOfferDesign />
      </Block>
    </TabPanel>
  </Tabs>
);
