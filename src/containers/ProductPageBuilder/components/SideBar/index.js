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

const SideBar = (props) => {
  const [collapsesState, setCollapsesState] = useState(['1', '2']);

  const onChange = (openedKeys) => {
    let opens = openedKeys;

    if (openedKeys.length === 3) opens = openedKeys.filter((key) => key !== openedKeys[1]);

    setCollapsesState(opens);
  };

  const isLastCollapseOpened = collapsesState.length === 1 && collapsesState.includes('3');
  return (
    <SideMenu open>
      <Collapse activeKey={collapsesState} onChange={onChange}>
        <Panel header='Native Sections' key='1'>
          <FlexBox wrappable overflow='y' className='max-height-75vh'>
            <BaseCard
              type='text'
              className='text-bg element-card'
              data-tip='Add text Element'
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
              type='layout'
              className='layout-bg element-card'
              data-tip='Add Layout Section'
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
            <BaseCard
              type='productMarkWidget'
              className='bookmark-badge-bg widget-card'
              data-tip='Page Badge '
            />
          </FlexBox>
        </Panel>

        <Panel header='Custom Sections' key='3'>
          <FlexBox
            wrappable
            overflow='y'
            center='v-center h-center'
            className={`padding-v-10 ${isLastCollapseOpened ? 'scrolling-72vh' : 'scrolling-47vh'}`}
          >
            <BaseCard
              type='bumpOffer'
              className='bump-offer-bg section-card'
              data-tip='Bump Offer Section'
            />
            <BaseCard
              type='shippingDetails'
              className='shipping-bg section-card'
              data-tip='Shipping Form'
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

      </Collapse>
    </SideMenu>
  );
};

SideBar.propTypes = {

};

export default SideBar;
