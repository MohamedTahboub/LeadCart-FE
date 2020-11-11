import React from 'react';

import { SiMinutemailer } from 'react-icons/si';
import { GrAnnounce, GrCart, GrLineChart } from 'react-icons/gr';


const CategoryIcon = ({ category }) => {
  const isThankyouPage = category === 'thankyoupage';
  const isCheckoutProduct = category === 'checkout';
  const isUpsellProduct = category === 'upsell';
  const isOptInProduct = category === 'opt-in';


  return (
    <span>
      {isCheckoutProduct &&
        <GrCart
          data-tip='Checkout Product'
          data-type='info'
          role='presentation'
          className='product-card-type-icon'
        />
      }

      {isUpsellProduct &&
        <GrLineChart
          data-tip='Upsell Product'
          data-type='info'
          className='product-card-type-icon'
          role='presentation'
        />
      }

      {isThankyouPage &&
        <GrAnnounce
          data-tip='Thank you Page'
          data-type='info'
          role='presentation'
          className='product-card-type-icon'
        />
      }

      {isOptInProduct &&
        <SiMinutemailer
          data-tip='Opt-in Page'
          data-type='info'
          role='presentation'
          className='product-card-type-icon'
        />
      }
    </span>
  );
};

export default CategoryIcon;
