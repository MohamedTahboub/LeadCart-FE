import React from 'react';
import common from 'components/common';
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
      <div
        data-tip='this means any changes to the product from this funnel will overwrite the product'
        className='tiny-text aligned-center'
      >
        Product Already Used in another funnel
      </div>
      <div>

        <FlexBox flex center='h-center' className={selectBtnClasses}>
          <span>
            Select & Ignore
          </span>
        </FlexBox>
      </div>
    </FlexBox>
  );
};
const Product = ({
  active,
  name,
  isUsed,
  onSelect,
  id: productId,
  nodeId,
  thumbnail
}) => {
  const classes = clx(
    'node-settings-product-img',
    'card-style',
    'funnel-product-card',
    'relative-element',
    {
      overrideWarring: isUsed,
      active
    }
  );

  const style = { backgroundImage: `linear-gradient(to bottom, #fff 2%, transparent 95%), url(${thumbnail})` };

  const onProductSelect = () => {
    onSelect(nodeId, productId);
  };

  return (
    <FlexBox className='node-settings-product' column>

      <FlexBox
        style={style}
        className={classes}
        onClick={onProductSelect}
      >
        <ActiveBadge show={active} />
        <OverrideSelect onClick={onProductSelect} show={false} />
      </FlexBox>
      <div className='node-settings-product-text'>
        {name}
      </div>
    </FlexBox>
  );
};

Product.propTypes = {};

export default Product;
