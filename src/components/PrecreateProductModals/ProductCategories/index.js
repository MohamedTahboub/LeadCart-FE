import React from 'react';
import checkoutIcon from 'assets/images/icons/checkout.svg';
import pageFunnelIcon from 'assets/images/icons/pageFunnel.svg';
import popUpCheckoutIcon from 'assets/images/icons/popUpCheckout.svg';
import thankyouPageImage from 'assets/images/funnels/thankyouPage.png';
import { CategoryCard } from 'components/common/Cards';

import './style.css';

const ProductCategories = ({ onSelect }) => (
  <div className='categories-cards-container'>
    <CategoryCard
      image={checkoutIcon}
      onClick={onSelect('checkout')}
      label='Checkout'
    />
    <CategoryCard
      image={checkoutIcon}
      label='Two Step Checkout'
      // className='disabled'
      onClick={onSelect('checkout')}
    />
    <CategoryCard
      image={popUpCheckoutIcon}
      onClick={onSelect('upsell')}
      label='Upsell/Downsell'
    // className='disabled'
    />
    <CategoryCard
      image={thankyouPageImage}
      label='One Page Funnel'
      // className='disabled'
      onClick={onSelect('thankyoupage')}
    />
  </div>
);

ProductCategories.propTypes = {
};

export default ProductCategories;
