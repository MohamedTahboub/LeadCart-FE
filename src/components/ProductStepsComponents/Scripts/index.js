import React from 'react';
import OnFooter from './OnFooter'
// import AfterPurchasing from './AfterPurchasing'
import Advanced from './Advanced'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import common from 'components/common'
import "react-tabs/style/react-tabs.css";
import './style.css'

const { Block ,TabTitle} = common
export default (props) => (
  <Tabs>
    <TabList>
      <Tab><TabTitle>Pixels</TabTitle></Tab>
      <Tab><TabTitle>Advance Setting</TabTitle></Tab>
    </TabList>
    <TabPanel>
      <Block>
        <OnFooter />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <Advanced />
      </Block>
    </TabPanel>
  </Tabs>
);
