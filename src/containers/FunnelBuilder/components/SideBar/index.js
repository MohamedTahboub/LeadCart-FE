import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import pageFunnelImage from 'assets/images/funnels/PageFunnel.png';
import checkoutPageImage from 'assets/images/funnels/checkoutPage.png';
import upsellPageImage from 'assets/images/funnels/upsellPage.png';
import thankyouPageImage from 'assets/images/funnels/thankyouPage.png';
import './style.css';
// import Sidebars from './Bar';
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

const SideBar = (props) =>
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
  (
    <SideMenu open>
      <Tabs active='funnelBlocks' className='padding-v-10 padding-h-10'>
        <Tab id='funnelBlocks' title='Funnel Blocks'>
          <GrabbableBlock
            demoImage={pageFunnelImage}
            title='Funnel Page'
            description='Funnel Step that will hold a one page Funnel product'
          />
          <GrabbableBlock
            demoImage={checkoutPageImage}
            title='Checkout Page'
            description='Funnel Step that will hold a one page Funnel product'
          />
          <GrabbableBlock
            demoImage={upsellPageImage}
            title='Upsell/Downsell Page'
            description='Funnel Step that will hold a one page Funnel product'
          />
          <GrabbableBlock
            demoImage={thankyouPageImage}
            title='Thankyou Page'
            description='Funnel Step that will hold a one page Funnel product'
          />
        </Tab>
        <Tab id='funnelSettings' title='Settings'>
          <SettingMenu
            {...props}
          />
        </Tab>
      </Tabs>
    </SideMenu>


  )
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
