import React from 'react';
import ProductDetails from './Details'
import ProductPrice from './ProductPrice'
import ProductTags from './ProductTags'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import common from 'components/common'
import "react-tabs/style/react-tabs.css";
import './style.css'

const { Block ,TabTitle} = common
export default (props) => (
  <Tabs>
    <TabList>
      <Tab><TabTitle error>Product Details</TabTitle></Tab>
      <Tab><TabTitle>Product Pricing</TabTitle></Tab>
      <Tab><TabTitle>Product Tags</TabTitle></Tab>
    </TabList>
    <TabPanel>
      <Block>
        <ProductDetails />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <ProductPrice />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <ProductTags />
      </Block>
    </TabPanel>
  </Tabs>
);
