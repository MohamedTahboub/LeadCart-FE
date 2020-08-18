import React from 'react';
import checkoutIcon from 'assets/images/icons/checkout.svg';
// import pageFunnelIcon from 'assets/images/icons/pageFunnel.svg';
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
      image={popUpCheckoutIcon}
      onClick={onSelect('upsell')}
      label='Upsell/Downsell'
    />
    <CategoryCard
      image={thankyouPageImage}
      label='Thank You Page'
      onClick={onSelect('thankyoupage')}
    />
    <CategoryCard
      image={checkoutIcon}
      onClick={onSelect('opt-in')}
      label='Opt-In Page'
    />
  </div>
);

ProductCategories.propTypes = {};

export default ProductCategories;
