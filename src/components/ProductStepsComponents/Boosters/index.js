import React, { Component, Fragment } from 'react';
import Collapsible from 'components/Collapsible';
import Testimonials from './Testimonials';
import CheckoutBtn from './CheckoutBtn';
import Garantee from './Garantee';
import Features from './Features';
import TermsAndConditions from './TermsAndConditions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import common from 'components/common'
import './style.css'

const { Block ,TabTitle} = common
export default (props) => (
  <Tabs>
    <TabList>
      <Tab><TabTitle>Guarantee Message</TabTitle></Tab>
      <Tab><TabTitle>Product Features</TabTitle></Tab>
      <Tab><TabTitle>Product Testimonials</TabTitle></Tab>
      <Tab><TabTitle>Checkout Button</TabTitle></Tab>
      <Tab><TabTitle>Terms & Conditions</TabTitle></Tab>
    </TabList>
    <TabPanel>
      <Block>
        <Garantee />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <Features />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <Testimonials />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <CheckoutBtn />
      </Block>
    </TabPanel>
    <TabPanel>
      <Block>
        <TermsAndConditions />
      </Block>
    </TabPanel>
  </Tabs>
);