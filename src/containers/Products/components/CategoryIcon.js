import React from 'react';
import ReactTooltip from 'rc-tooltip';

import { GrAnnounce, GrCart, GrLineChart } from 'react-icons/gr';
import { BiMailSend } from 'react-icons/bi';

const Icon = ({ Icon, tooltipTitle }) => (
  <ReactTooltip overlay={tooltipTitle} placement='top' mouseEnterDelay={0.3}>
    <Icon
      data-tip='Checkout Product'
      data-type='info'
      role='presentation'
      className='product-card-type-icon'
    />
  </ReactTooltip>
);


const CategoryIcon = ({ category }) => {
  const isThankyouPage = category === 'thankyoupage';
  const isCheckoutProduct = category === 'checkout';
  const isUpsellProduct = category === 'upsell';
  const isOptInProduct = category === 'opt-in';

  return (
    <span>
      {isCheckoutProduct && <Icon Icon={GrCart} tooltipTitle='Checkout Product'/>}
      {isUpsellProduct && <Icon Icon={GrLineChart} tooltipTitle='Upsell Product'/>}
      {isThankyouPage && <Icon Icon={GrAnnounce} tooltipTitle='Thank you Page'/>}
      {isOptInProduct && <Icon Icon={BiMailSend} tooltipTitle='Opt-in Page'/>}
    </span>
  );
};

export default CategoryIcon;
