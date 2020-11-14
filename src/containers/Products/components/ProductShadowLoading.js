import React from 'react';
import ContentLoader from 'react-content-loader';


import common from 'components/common';


import './style.css';

const { FlexBox } = common;


const ProductShadowLoading = () => {
  return (
    <FlexBox className='product-shadow-loading'>
      <ContentLoader
        width={220}
        height={240}
        viewBox='0 0 220 240'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
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
    </FlexBox>


  );
};

export default ProductShadowLoading;
