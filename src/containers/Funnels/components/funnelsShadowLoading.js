import React from 'react';
import ContentLoader from 'react-content-loader';

import './style.css';


const FunnelsShadowLoading = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={200}
      height={230}
      viewBox='0 0 200 230'
      backgroundColor='#ecebeb'
      foregroundColor='#f5f5f5'
      className='funnels-shadow-loading mx-1'
      {...props}
    >
      <rect x='5' y='15' rx='5' ry='5'
        width='85' height='25'
      />
      <rect x='165' y='15' rx='5' ry='5'
        width='25' height='25'
      />
      <rect x='5' y='55' rx='5' ry='5'
        width='190' height='170'
      />
    </ContentLoader>


  );
};

export default FunnelsShadowLoading;
