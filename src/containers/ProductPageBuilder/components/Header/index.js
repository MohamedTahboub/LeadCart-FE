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

const ResponsiveSizesOptions = () => {
  const commonClasses = 'margin-h-5 large-text gray-text animate item-clickable';

  return (
    <FlexBox>
      <MdDesktopWindows className={`${commonClasses} active`} />
      <MdTabletMac className={commonClasses} />
      <AiOutlineMobile className={commonClasses} />
    </FlexBox>
  );
};


const Header = ({ history, props }) => {
  const {
    state: {
      standAlone,
      product: {
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
                Explored Through Funnel(
                {funnelName}
)
              </Title>
            )
          }
        </FlexBox>

        <FlexBox center='v-center' flexEnd className='margin-right-20 min-width-250 '>
          <ResponsiveSizesOptions />
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
            // value={funnel.name}
            max={50}
          />
        </FlexBox>

        <FlexBox center='v-center' className='min-width-250 padding-right-20' flexEnd>
          <Button
            // onClick={onSave}
            className='light-btn'
          >
            <AiOutlineHistory className='mirror' />
          </Button>
          <Button
            // onClick={onSave}
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
