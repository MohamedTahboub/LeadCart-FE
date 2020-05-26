import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import checkoutPageImage from 'assets/images/funnels/checkoutPage.png';
import clx from 'classnames';
import { IoMdCheckmark } from 'react-icons/io';
import { TiWarning } from 'react-icons/ti';
const { FlexBox } = common;


const ActiveBadge = ({ show }) => {


  return show ? (
    <FlexBox center='h-center' className='active-product-badge'>
      <IoMdCheckmark className='white-text active-check' />
    </FlexBox>
  ) : null;
};

const OverrideSelect = ({ show, onClick }) => {

  if (!show) return null;

  const selectBtnClasses = 'tinier-text gray-text light-btn soft-edges p-2 white-bg bold-text';
  return (
    <FlexBox onClick={onClick} column center='v-center h-center' className='product-override-select'>
      <TiWarning className='larger-text yellowish-color' />
      <div className='tiny-text aligned-center'>
        Product Already Used in another funnel
      </div>
      <div>

        <FlexBox flex center='h-center' className={selectBtnClasses}>
          <span>
            Select & Override
          </span>
        </FlexBox>
      </div>
    </FlexBox>
  );
};
const Product = ({
  image = checkoutPageImage,
  active,
  name,
  overrideWarring,
  onSelect,
  id: productId,
  nodeId,
  isConnected
}) => {


  const classes = clx(
    'card-style',
    'funnel-product-card',
    'relative-element',
    {
      overrideWarring,
      active
    }
  );

  const style = {
    backgroundImage: `linear-gradient(to bottom, #fff 5%, transparent 95%), url(${image})`,
    backgroundPosition: 'center',
    backgroundSize: '105% 105%',
    backgroundRepeat: 'no-repeat'
  };

  const onProductSelect = () => {
    onSelect(nodeId, productId);
  };

  return (
    <FlexBox
      style={style}
      className={classes}
      onClick={onProductSelect}
    >
      <ActiveBadge show={active} />
      <div className='tiny-text gray-text bold-text truncate p-2'>
        {name}
      </div>
      <OverrideSelect onClick={onProductSelect} show={isConnected} />
    </FlexBox>
  );
};

Product.propTypes = {};

export default Product;
