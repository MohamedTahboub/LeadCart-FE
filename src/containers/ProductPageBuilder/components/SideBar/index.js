import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ReactTooltip from 'react-tooltip';
import { BaseCard } from './components';

const {
  SideMenu,
  Tabs,
  EditableField,
  FlexBox,
  Tab,
  Card
} = common;

const SideBar = (props) => (
  <SideMenu open>
    <Tabs active='elements' className='padding-h-10'>
      <Tab id='elements' title='Elements'>
        <FlexBox wrappable overflow='y' className='max-height-75vh'>
          <BaseCard
            draggable
            name='Text'
            className='text-bg element-card'
            data-tip='Add Text Element'
          />
          <BaseCard
            draggable
            name='Text'
            className='image-bg element-card'
            data-tip='Add Image Element'
          />
          <BaseCard
            draggable
            name='Text'
            className='video-bg element-card'
            data-tip='Add Video Element'
          />
          <BaseCard
            draggable
            name='Text'
            className='layout-bg element-card'
            data-tip='Add Layout Section'
          />
        </FlexBox>
      </Tab>
      <Tab id='sections' title='Sections'>
        <FlexBox
          wrappable
          overflow='y'
          center='v-center'
          className='max-height-75vh'
        >
          <BaseCard
            draggable
            name='Text'
            className='bump-offer-bg section-card'
            data-tip='Bump Offer Section'
          />
          <BaseCard
            draggable
            name='Text'
            className='shipping-bg section-card'
            data-tip='Shipping Form'
          />
          <BaseCard
            draggable
            name='Text'
            className='coupons-bg section-card'
            data-tip='Coupon Section'
          />
          <BaseCard
            draggable
            name='Text'
            className='testimonials-bg section-card'
            data-tip='Testimonial Section'
          />
          <BaseCard
            draggable
            name='Text'
            className='guarantee-bg section-card'
            data-tip='Guarantee Badges'
          />

          <BaseCard
            draggable
            name='Text'
            className='features-bg section-card'
            data-tip='Features List Section'
          />

          <BaseCard
            draggable
            name='Text'
            className='termsAndConditions-bg section-card'
            data-tip='Terms And Conditions Section'
          />
        </FlexBox>

      </Tab>
      <Tab id='widgets' title='Widgets'>
        <FlexBox
          wrappable
          overflow='y'
          center='v-center'
          className='max-height-75vh'
        >
          <BaseCard
            draggable
            name='Text'
            className='guarantee-badge-bg widget-card'
            data-tip='Progress Bar'
          />

          <BaseCard
            draggable
            name='Text'
            className='countdown-bg widget-card'
            data-tip='CountDown timer'
          />

          <BaseCard
            draggable
            name='Text'
            className='termsAndConditions-bg widget-card'
            data-tip='Badge Widget'
          />
        </FlexBox>
      </Tab>
    </Tabs>
    <ReactTooltip delayShow={400} />
  </SideMenu>
);

SideBar.propTypes = {

};

export default SideBar;
