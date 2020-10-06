import React from 'react';
import FlexBox from '../../components/common/boxes/FlexBox';
import Button from '../../components/common/Buttons/Button';
import backGround from '../../assets/images/update-maintenance-bro.svg';

import './style.css';
const ErrorPage = () => {

  const onRefresh = () => {
    try {

      window.location.reload(true);
    } catch (error) {
      alert('Oops, we couldn\'t refresh the page, Please do it manually');
    }
  };

  return (
    <div className='error-page-container'>
      <img src={backGround} alt='maintenance' className='error-boundary-bg'/>

      <FlexBox column className='' center='v-center'>
        <div className='larger-text bold-text text-center'>
          There is an update available,
        </div>
        <div className='title-text bold-text text-center my-4'>
          Please click the refresh button below to get tha latest version of leadCart.
        </div>
        <Button className='px-3 bold-text primary-btn' onClick={onRefresh}>
          Refresh
        </Button>
      </FlexBox>
    </div>
  );
};

export default ErrorPage;
