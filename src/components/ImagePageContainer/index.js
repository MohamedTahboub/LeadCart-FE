import React from 'react';

import common from 'components/common';
import './style.css';

const { Page, MainTitle } = common;

const ImageFullPageContainer = ({ image, title, hideBox }) => (
  <Page>
    {title && (
      <MainTitle className='mx-3'>
        {title}
      </MainTitle>
    )}

    <div className='full-page-image-container'>
      {!hideBox && (
        <div className='underdevelopment-box'>
          <span className='underdevelopment-title'>
              WE ARE WORKING HARD TO RELEASE THIS FEATURE FOR YOU!
          </span>
          <span className='under-development-message'>
              Meanwhile You can check the rest of the app
          </span>
        </div>
      )}
      <img src={image} alt='background' className='wall-sheet-container' />
    </div>
  </Page>
);

export default ImageFullPageContainer;

