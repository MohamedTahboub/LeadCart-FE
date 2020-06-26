import React from 'react';

import { Card } from '../../common/Cards';
import sampleProductImage from '../../../assets/images/new-product-icon.png';

const coverImageStyle = {
  backgroundImage: ` linear-gradient(
              to bottom,
              rgba(0,0,0, 0),
              rgba(0,0,0, .1)
            ),url(${sampleProductImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
};


const Product = (props) => (
  <Card className='product-card'>
    <div
      style={coverImageStyle}
      className='product-image-container'
    >
      <div className='head'>
        <span
          className='status'
        />
        <span
          className='duplicate-btn'
          role='presentation'
        >
          <i className='fas fa-copy scale-12 duplicate-icon' />
        </span>
      </div>
    </div>
    <div className='product-content'>
      <div className='title-text'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique placeat quae exercitationem rerum labore illo, alias ratione? Minima hic corporis laboriosam libero, modi deleniti similique, et ducimus beatae culpa ipsum.
      </div>
      <div className='price-text text-center'>
        22
      </div>
    </div>
    <div className='footer'>
      <i
        className='fas fa-edit'
      />
      <i
        className='fas fa-trash-alt'
      />
    </div>
  </Card>
);

export default Product;
