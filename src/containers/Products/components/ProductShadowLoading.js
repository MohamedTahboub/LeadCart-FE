import React from 'react';
import ContentLoader from 'react-content-loader';

import './style.css';
// backgroundColor='#ecebeb'
// foregroundColor='#f5f5f5'
// className='product-shadow-loading m-2'


const ProductShadowLoading = () => {
  return (
    <ContentLoader
      speed={2}
      width={190}
      height={260}
      viewBox='0 0 190 260'
      backgroundColor='#ecebeb'
      foregroundColor='#f5f5f5'
      className='product-shadow-loading m-2'
    >
      <rect x='17' y='12' rx='7' ry='7'
        width='156' height='140'
      />
      <rect x='25' y='178' rx='0' ry='0'
        width='140' height='20'
      />
      <circle cx='144' cy='233' r='10' />
      <rect x='35' y='223' rx='0' ry='0'
        width='80' height='20'
      />
      <rect x='0' y='255' rx='5' ry='5'
        width='190' height='5'
      />
    </ContentLoader>


  );
};

export default ProductShadowLoading;
