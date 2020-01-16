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
  GrabbableBlock,
  // SettingMenu
} from './components';
import SettingMenu from './Menu';
const {
  SideMenu,
  Tabs,
  Tab
} = common;

const SideBar = (props) => {
  // const elementRef = useRef(null);
  // const [activeMenuItem, setActiveMenuItem] = useState('');
  // const [open, setOpen] = useState(false);


  // const onOpen = () => {
  //   setOpen(true);
  //   if (props.onSidebarChange) props.onSidebarChange(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  //   if (props.onSidebarChange) props.onSidebarChange(false);
  // };

  // const onActivateMenuItem = (item) => {
  //   if (item === activeMenuItem) {
  //     if (open) {
  //       onClose();
  //       return setActiveMenuItem('');
  //     }

  //     onOpen();
  //   } else {
  //     onOpen();
  //   }

  //   setActiveMenuItem(item);
  // };

  const onDrag = (node, elementRef, e) => {
    node.id = ids.generate();
    e.dataTransfer.setData('dropedElement', JSON.stringify(node));

    const {
      left,
      top,
      width,
      height
    } = elementRef.current.getBoundingClientRect();

    const shiftX = e.clientX - left;
    const shiftY = e.clientY - top;
    e.dataTransfer.setData('shift', JSON.stringify({
      shiftX, shiftY, width, height
    }));
  };


  return (
    <SideMenu open>
      <Tabs active='funnelBlocks' className='padding-v-10 padding-h-10'>
        <Tab id='funnelBlocks' title='Funnel Blocks'>
          <GrabbableBlock
            demoImage={pageFunnelImage}
            title='Funnel Page'
            description='Funnel Step that will hold a one page Funnel product'
            draggable={false}
            onDragStart={(elementRef, e) => onDrag(funnelNodes.onePageFunnel, elementRef, e)}
          />
          <GrabbableBlock
            demoImage={checkoutPageImage}
            title='Checkout Page'
            description='Funnel Step that will hold Checkout product'
            draggable
            onDragStart={(elementRef, e) => onDrag(funnelNodes.checkoutPage, elementRef, e)}
          />
          <GrabbableBlock
            demoImage={upsellPageImage}
            title='Upsell/Downsell Page'
            description='Funnel Step that will hold a Upsell/Downsell product'
            draggable
            onDragStart={(elementRef, e) => onDrag(funnelNodes.upsellPage, elementRef, e)}
          />
          <GrabbableBlock
            demoImage={thankyouPageImage}
            title='Thankyou Page'
            description='Funnel Step that will hold Thankyou Page'
            draggable
            onDragStart={(elementRef, e) => onDrag(funnelNodes.thankYouPage, elementRef, e)}
          />
        </Tab>
        <Tab id='funnelSettings' title='Settings'>
          <SettingMenu
            {...props}
          />
        </Tab>
      </Tabs>
    </SideMenu>


  );
}
  ;
/*
    <Sidebars
      {...props}
      active={activeMenuItem}
      onClick={onActivateMenuItem}
    />

    <div className={`side-menu-container ${open ? 'open' : ''}`}>
      <SettingMenu
        // activeMenu={activeMenuItem}
        {...props}
      />
    </div>
    </div >

*/
SideBar.propTypes = {

};

export default SideBar;
