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
            // draggable
            type='text'
            className='text-bg element-card'
            data-tip='Add text Element'
          />
          <BaseCard
            // draggable
            type='image'
            className='image-bg element-card'
            data-tip='Add Image Element'
          />
          <BaseCard
            // draggable
            type='video'
            className='video-bg element-card'
            data-tip='Add Video Element'
          />
          <BaseCard
            // draggable
            type='layout'
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
            // draggable
            type='bumpOffer'
            className='bump-offer-bg section-card'
            data-tip='Bump Offer Section'
          />
          <BaseCard
            // draggable
            type='shippingDetails'
            className='shipping-bg section-card'
            data-tip='Shipping Form'
          />
          <BaseCard
            // draggable
            type='couponSection'
            className='coupons-bg section-card'
            data-tip='Coupon Section'
          />
          <BaseCard
            // draggable
            type='testimonialsSection'
            className='testimonials-bg section-card'
            data-tip='Testimonial Section'
          />

          <BaseCard
            // draggable
            type='featuresSection'
            className='features-bg section-card'
            data-tip='Features List Section'
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
            // draggable
            type='guaranteeWidget'
            className='guarantee-badge-bg widget-card'
            data-tip='Guarantee Widget'
          />

          <BaseCard
            // draggable
            type='countDownWidget'
            className='countdown-bg widget-card'
            data-tip='CountDown Timer'
          />

          <BaseCard
            // draggable
            type='progressbarWidget'
            className='progressbar-bg widget-card'
            data-tip='Progress Bar'
          />
          <BaseCard
            // draggable
            type='bookmarkWidget'
            className='bookmark-badge-bg widget-card'
            data-tip='Page Badge '
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
