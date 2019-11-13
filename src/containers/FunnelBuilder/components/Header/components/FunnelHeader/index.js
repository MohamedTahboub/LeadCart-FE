import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DefaultHeader } from '..';
import config from 'config';
import ShareProductModal from 'components/ShareProductModal';
import ScriptsModal from 'components/ScriptsModal';


import common from 'components/common';


const { USER_SUB_DOMAIN_URL } = config;
const {
  HeaderLogo,
  Button,
  ActivationSwitchInput
} = common;

const CheckoutHeader = ({
  funnel,
  isNew,
  onChange,
  subdomain,
  onSave,
  history,
  ...props
}) => {

  const [showModal, setShowModal] = useState({});

  const onPreview = () => {
    const { url } = funnel;
    const funnelUrl = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${url}`;
    window.open(funnelUrl, '_blank');
  };

  // const onShowScripts = () => {
  //   setShowModal({ scripts: true });
  // };

  const onShowShare = () => {
    setShowModal({ share: true });
  };
  const onCloseModal = () => {
    setShowModal({});
  };

  return (
    <DefaultHeader
      // showSandBoxSwitch
      // showDisplayModes
      onChange={onChange}
      // onDisplayChange={onDisplayChange}
      // displayType={displayType}
      history={history}
    >
      <div className='header-buttons'>
        <Button disabled={isNew} onClick={onShowShare} className='primary-btn '>
          <i className='fas fa-share-square' />
          Share
        </Button>
        <Button disabled={isNew} onClick={onPreview} className='primary-btn '>
          <i className='fas fa-eye' />
          Preview
        </Button>
        <Button onClick={onSave} className='primary-btn '>
          <i className='fas fa-save' />
          {isNew ? 'Create' : 'Save'}
        </Button>
      </div>
      <ShareProductModal
        isVisible={showModal.share}
        onClose={onCloseModal}
        subdomain={subdomain}
        productUrl={funnel.url}
      />
    </DefaultHeader>
  );
}

CheckoutHeader.propTypes = {

};

export default CheckoutHeader;


// <Button onClick={onShowShare} className='primary-btn '>
//   <i className='fas fa-share-square' />
//   Share
// </Button>
//   <Button onClick={onPreview} className='primary-btn '>
//     <i className='fas fa-eye' />
//     Preview
// </Button>