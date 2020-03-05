import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { AiOutlineMobile, AiOutlineHistory } from 'react-icons/ai';
import { MdDesktopWindows, MdTabletMac } from 'react-icons/md';

import { useContext } from '../../actions';

const {
  Button,
  FlexBox,
  Title,
  EditableField
} = common;

const ResponsiveSizesOptions = ({ onChange, activeDisplay = 'desktop' }) => {
  const commonClasses = 'margin-h-5 large-text gray-text animate item-clickable';


  const isActive = (mode) => `${mode === activeDisplay ? 'active' : ''}`;

  return (
    <FlexBox>
      <MdDesktopWindows
        className={`${commonClasses} ${isActive('desktop')}`}
        onClick={onChange('desktop')}
        data-tip='Preview on Desktop Mode'
      />
      <MdTabletMac
        onClick={onChange('tablet')}
        className={`${commonClasses} ${isActive('tablet')}`}
        data-tip='Preview on Tablet Size Mode'
      />
      <AiOutlineMobile
        onClick={onChange('mobile')}
        className={`${commonClasses} ${isActive('mobile')}`}
        data-tip='Preview on Mobile Mode'
      />
    </FlexBox>
  );
};


const Header = ({ history, props }) => {
  const {
    state: {
      displayMode,
      standAlone,
      product: {
        name: productName,
        sections = [],
        // maxSectionsOrder
      } = {},
      funnel: {
        url: funnelUrl,
        name: funnelName
      } = {}
    },
    actions
  } = useContext();

  const goToProducts = () => {
    if (standAlone) history.push('/products');
    else history.push(`/funnels/${funnelUrl}`);
  };

  const onDisplayModeChange = (displayMode) => () => {
    actions.updateDisplayMode(displayMode);
  };
  return (
    <FlexBox column>

      <FlexBox className='white-bg padding-v-5 gray-border-top' center='v-center' spaceBetween wrappable>
        <FlexBox center='v-center' className='min-width-250 '>
          <Button
            onClick={goToProducts}
            className='light-btn icon-btn margin-left-20'
          >
            <IoIosArrowRoundBack />
          </Button>
          <Title>{`Back To ${standAlone ? 'Products' : 'Funnel'}`}</Title>
        </FlexBox>
        <FlexBox center='h-center'>
          {
            !standAlone && (
              <Title>
                Funnel(
                {funnelName}
                )
              </Title>
            )
          }
        </FlexBox>

        <FlexBox center='v-center' flexEnd className='margin-right-20 min-width-250 '>
          <ResponsiveSizesOptions
            onChange={onDisplayModeChange}
            activeDisplay={displayMode}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox className='white-bg padding-v-5 lightgray-border-top lightgray-border-bottom' center='v-center' spaceBetween wrappable>
        <FlexBox center='v-center' className='min-width-250 ' />
        <FlexBox>
          <EditableField
            className='large-text dashed-text aligned-center-text lightgray-border-color outline-style-none'
            name='name'
            defaultValue='Product Name'
            // onChange={onNameChange}
            value={productName}
            max={50}
          />
        </FlexBox>

        <FlexBox center='v-center' className='min-width-250 padding-right-20' flexEnd>
          <Button
            // onClick={onSave}
            data-tip='Undo'
            className='light-btn'
          >
            <AiOutlineHistory className='mirror' />
          </Button>
          <Button
            // onClick={onSave}
            data-tip='ReDo'
            className='light-btn margin-h-5'
          >
            <AiOutlineHistory />
          </Button>
          <Button
            // onClick={onSave}
            className='light-btn'
          >
            <i className='fas fa-save font-size-11' />
            {`Save ${standAlone ? '' : 'and Back to Funnel'}`}
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

Header.propTypes = {

};

export default Header;
