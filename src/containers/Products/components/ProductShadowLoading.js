import React from 'react';
import ContentLoader from 'react-content-loader';

import './style.css';


const ProductShadowLoading = () => {
  return (
    <ContentLoader
      width={220}
      height={240}
      viewBox='0 0 220 240'
      backgroundColor='#ecebeb'
      foregroundColor='#f5f5f5'
      className='product-shadow-loading m-2'
    >
      <circle cx='110' cy='77' r='50' />
      <rect x='30' y='150' rx='6' ry='6'
        width='130' height='18'
      />
      <circle cx='180' cy='160' r='9' />
      <rect x='70' y='180' rx='6' ry='6'
        width='70' height='18'
      />
      <circle cx='158' cy='188' r='9' />
      <rect x='0' y='0' rx='0' ry='0'
        width='220' height='5'
      />
    </ContentLoader>


  );
};

export default ProductShadowLoading;
