import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import pageFunnelImage from 'assets/images/funnels/PageFunnel.png';
import checkoutPageImage from 'assets/images/funnels/checkoutPage.png';
import upsellPageImage from 'assets/images/funnels/upsellPage.png';
import thankyouPageImage from 'assets/images/funnels/thankyouPage.png';
import './style.css';
import funnelNodes from 'data/funnelBasicSteps';
// import Sidebars from './Bar';
import ids from 'shortid';
import {
  GrabbableBlock
  // SettingMenu
} from './components';
import SettingMenu from './Menu';
const {
  SideMenu,
  Tabs,
  EditableField,
  FlexBox,
  Tab
} = common;

const SideBar = ({
  funnel,
  onChange,
  ...props
}) => {
  const onDrag = ({
    data = {},
    ref,
    event,
    demoImage
  }) => {
    const payload = { category: data.category, elementId: ids.generate() };
    event.dataTransfer.setData('dropedElement', JSON.stringify(payload));
    const img = document.createElement('img');
    img.src = demoImage;
    event.dataTransfer.setDragImage(img, 140, 100);

    const {
      left,
      top,
      width,
      height
    } = ref.current.getBoundingClientRect();

    const shiftX = event.clientX - left;
    const shiftY = event.clientY - top;
    event.dataTransfer.setData('shift', JSON.stringify({ shiftX, shiftY, width, height }));
  };

  const onNameChange = ({ target: { name, value } }) => {
    onChange({ name, value });
  };

  return (
    <SideMenu open>
      <FlexBox className='margin-top-20 margin-v-10'>
        <EditableField
          className='large-text dashed-text aligned-center-text lightgray-border-color'
          name='name'
          defaultValue='Funnel Name'
          onChange={onNameChange}
          value={funnel.name}
          max={50}
        />
      </FlexBox>
      <Tabs active='funnelBlocks' className='padding-v-10 padding-h-10'>
        <Tab id='funnelBlocks' title='Funnel Blocks'>
          <GrabbableBlock
            demoImage={pageFunnelImage}
            title='Funnel Page'
            description='Funnel Step that will hold a one page Funnel product'
            disabled
            draggable={false}
            onDragStart={onDrag}
            data={funnelNodes.onePageFunnel}
          />
          <GrabbableBlock
            demoImage={checkoutPageImage}
            title='Checkout Page'
            description='Funnel Step that will hold Checkout product'
            onDragStart={onDrag}
            data={funnelNodes.checkoutPage}
          />
          <GrabbableBlock
            demoImage={upsellPageImage}
            title='Upsell/Downsell Page'
            description='Funnel Step that will hold a Upsell/Downsell product'
            onDragStart={onDrag}
            data={funnelNodes.upsellPage}
          />
          <GrabbableBlock
            demoImage={thankyouPageImage}
            title='Thankyou Page'
            description='Funnel Step that will hold Thankyou Page'
            onDragStart={onDrag}
            data={funnelNodes.thankYouPage}
          />
        </Tab>
        <Tab id='funnelSettings' title='Settings'>
          <SettingMenu
            {...props}
            onChange={onChange}
            funnel={funnel}
          />
        </Tab>
      </Tabs>
    </SideMenu>


  );
};
SideBar.propTypes = {};

export default SideBar;
