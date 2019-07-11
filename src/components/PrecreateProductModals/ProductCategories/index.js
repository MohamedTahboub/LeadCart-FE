import React from 'react';
import checkoutIcon from 'assets/images/icons/checkout.svg';
import pageFunnelIcon from 'assets/images/icons/pageFunnel.svg';
import popUpCheckoutIcon from 'assets/images/icons/popUpCheckout.svg';
import { CategoryCard } from 'components/common/Cards';

import './style.css';

const ProductCategories = ({ onSelect }) => (
  <div className='categories-cards-container'>
    <CategoryCard
      image={pageFunnelIcon}
      label='One Page Funnel'
      className='disabled'
    />
    <CategoryCard
      image={checkoutIcon}
      onClick={onSelect}
      label='One Step Checkout'
    />
    <CategoryCard
      image={checkoutIcon}
      label='Two Step Checkout'
      className='disabled'
    />
    <CategoryCard
      image={popUpCheckoutIcon}
      label='Upsell/Downsell'
      className='disabled'
    />
  </div>
);

ProductCategories.propTypes = {
};

export default ProductCategories;
