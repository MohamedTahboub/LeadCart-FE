import React, { useState } from 'react';
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
  Card,
  Collapse
} = common;

const { Panel } = Collapse;

const SideBar = (props) => (
  <SideMenu open>
    <Collapse activeKey={['1', '2', '3']}>
      <Panel header='Native Sections' key='1'>
        <FlexBox wrappable overflow='y' className='max-height-75vh'>
          <BaseCard
            type='heading'
            className='heading-bg'
            data-tip='Add Heading'
          />
          <BaseCard
            type='text'
            className='text-bg'
            data-tip='Add text Element'
          />
          <BaseCard
            type='button'
            className='button-bg'
            data-tip='Button Element'
          />
          <BaseCard
            type='image'
            className='image-bg'
            data-tip='Add Image Element'
          />
          <BaseCard
            type='video'
            className='video-bg'
            data-tip='Add Video Element'
          />
          <BaseCard
            type='spacer'
            className='spacer-bg'
            data-tip='Spacer'
          />
        </FlexBox>
      </Panel>

      <Panel header='Handy Widgets' key='2'>
        <FlexBox
          wrappable
          overflow='y'
          center='v-center'
          className='max-height-75vh'
        >

          <BaseCard
            type='guaranteeWidget'
            className='guarantee-badge-bg'
            data-tip='Guarantee Widget'
          />
          <BaseCard
            type='countDownWidget'
            className='countdown-bg'
            data-tip='CountDown Timer'
          />

          <BaseCard
            type='progressbarWidget'
            className='progressbar-bg'
            data-tip='Progress Bar'
          />
        </FlexBox>
      </Panel>

      <Panel header='Custom Sections' key='3'>
        <FlexBox
          wrappable
          overflow='y'
          center='v-center'
          className='max-height-75vh'
        >
          <BaseCard
            type='figure'
            className='figure-section-bg'
            data-tip='Figure Widget'
          />
          <BaseCard
            type='bumpOffer'
            className='bump-offer-bg'
            data-tip='Bump Offer Section'
          />
          <BaseCard
            type='testimonialsSection'
            className='testimonials-bg'
            data-tip='Testimonial Section'
          />
          <BaseCard
            type='featuresSection'
            className='features-bg'
            data-tip='Features List Section'
          />
          <BaseCard
            type='code'
            className='code-section-bg'
            data-tip='Code Section'
          />
        </FlexBox>
      </Panel>
    </Collapse>
  </SideMenu>
)
  ;

// <BaseCard
// type='shippingDetails'
// className='shipping-bg'
// data-tip='Shipping Form'
// />
SideBar.propTypes = {};

export default SideBar;
