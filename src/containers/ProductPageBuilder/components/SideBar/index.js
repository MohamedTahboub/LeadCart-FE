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

const SideBar = (props) =>
// const [collapsesState, setCollapsesState] = useState(['1', '2']);

// const onChange = (openedKeys) => {
//   let opens = openedKeys;

//   if (openedKeys.length === 3) opens = openedKeys.filter((key) => key !== openedKeys[1]);

//   setCollapsesState(opens);
// };

  // const isLastCollapseOpened = collapsesState.length === 1 && collapsesState.includes('3');
  (
    <SideMenu open>
      <Collapse activeKey={['1', '2', '3']}>
        <Panel header='Native Sections' key='1'>
          <FlexBox wrappable overflow='y' className='max-height-75vh'>
            <BaseCard
              type='heading'
              className='heading-bg element-card'
              data-tip='Add Heading'
            />
            <BaseCard
              type='text'
              className='text-bg element-card'
              data-tip='Add text Element'
            />
            <BaseCard
              type='button'
              className='button-bg element-card'
              data-tip='Button Element'
            />
            <BaseCard
              type='image'
              className='image-bg element-card'
              data-tip='Add Image Element'
            />
            <BaseCard
              type='video'
              className='video-bg element-card'
              data-tip='Add Video Element'
            />
            <BaseCard
              type='spacer'
              className='layout-bg element-card'
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
              className='guarantee-badge-bg widget-card'
              data-tip='Guarantee Widget'
            />

            <BaseCard
              type='countDownWidget'
              className='countdown-bg widget-card'
              data-tip='CountDown Timer'
            />

            <BaseCard
              type='progressbarWidget'
              className='progressbar-bg widget-card'
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
              type='bumpOffer'
              className='bump-offer-bg section-card'
              data-tip='Bump Offer Section'
            />
            <BaseCard
              type='couponSection'
              className='coupons-bg section-card'
              data-tip='Coupon Section'
            />
            <BaseCard
              type='testimonialsSection'
              className='testimonials-bg section-card'
              data-tip='Testimonial Section'
            />
            <BaseCard
              type='featuresSection'
              className='features-bg section-card'
              data-tip='Features List Section'
            />
          </FlexBox>
        </Panel>
        <ReactTooltip delayShow={200} />
      </Collapse>
    </SideMenu>
  )
  ;

// <BaseCard
// type='shippingDetails'
// className='shipping-bg section-card'
// data-tip='Shipping Form'
// />
SideBar.propTypes = {

};

export default SideBar;
