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

  const onDrag = ({
    data = {},
    ref,
    event,
    demoImage
  }) => {
    data.id = ids.generate();
    event.dataTransfer.setData('dropedElement', JSON.stringify(data));
    const img = document.createElement('img');
    img.src = demoImage;
    event.dataTransfer.setDragImage(img, 100, 70);

    const {
      left,
      top,
      width,
      height
    } = ref.current.getBoundingClientRect();

    const shiftX = event.clientX - left;
    const shiftY = event.clientY - top;
    event.dataTransfer.setData('shift', JSON.stringify({
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
          />
        </Tab>
      </Tabs>
    </SideMenu>


  );
};
SideBar.propTypes = {

};

export default SideBar;
