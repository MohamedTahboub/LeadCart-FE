import React from 'react';
import common from 'components/common';
import pageFunnelImage from 'assets/images/funnels/PageFunnel.png';
import checkoutPageImage from 'assets/images/funnels/checkoutPage.png';
import upsellPageImage from 'assets/images/funnels/upsellPage.png';
import thankyouPageImage from 'assets/images/funnels/thankyouPage.png';
import './style.css';
import funnelNodes from 'data/funnelBasicSteps';
import ids from 'shortid';
import { GrabbableBlock } from './components';
import SettingMenu from './Menu';


const {
  SideMenu,
  Tabs,
  EditableField,
  FlexBox,
  Tab,
  InputRow
} = common;
const { Toggle, AddImage } = InputRow;


const SideBar = ({
  funnel,
  onChange,
  ...props
}) => {

  const { marketPlace = {} } = funnel;

  const onDrag = ({
    data = {},
    ref,
    event,
    demoImage
  }) => {
    const payload = { category: data.category, elementId: ids.generate() };
    event.dataTransfer.setData('droppedElement', JSON.stringify(payload));
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

  const _onChange = ({ target: { name, value } }) => onChange({ name, value });

  const onImageChange = (image) => {
    onChange({
      name: 'marketPlace.cardImage',
      value: image
    });
  };


  return (
    <SideMenu open>
      <FlexBox className='margin-top-20 margin-v-10'>
        <EditableField
          className='large-text dashed-text aligned-center-text lightgray-border-color'
          name='name'
          defaultValue='Funnel Name'
          onChange={_onChange}
          value={funnel.name}
          max={50}
        />
      </FlexBox>
      <Tabs active='funnelBlocks' className='padding-v-10 padding-h-10 tabs-funnel'>
        <Tab id='funnelBlocks' title='Funnel Blocks'>
          <GrabbableBlock
            demoImage={pageFunnelImage}
            title='Opt-in Page'
            description='Funnel Step that will hold a one page Funnel product'
            disabled
            draggable={false}
            onDragStart={onDrag}
            data={funnelNodes.onePageFunnel}
            className='hide-element'
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

        <Tab id='marketPlace' title='MarketPlace'>
          <section className='tab__marketPlace__publish'>
            Publish
            <Toggle
              name='marketPlace.publish'
              value={marketPlace.publish}
              onToggle={onChange}
              beforeLabel='On'
              afterLabel='Off'
            />
          </section>

          <section className='tab__marketPlace__add-img'>
            <AddImage
              onUploaded={onImageChange}
              name='marketPlace.cardImage'
              subLabel='image_funnel'
              value={marketPlace.cardImage}
            >
              Add Image
            </AddImage>
          </section>

          <section className='tab__marketPlace__description'>
            Description :
            <textarea
              name='marketPlace.description'
              value={marketPlace.description}
              onChange={_onChange}
              placeholder='Funnel Description'
            />
          </section>
        </Tab>

      </Tabs>
    </SideMenu >


  );
};
SideBar.propTypes = {};

export default SideBar;
