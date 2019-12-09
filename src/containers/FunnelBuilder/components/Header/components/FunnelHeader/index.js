import React, { useState } from 'react';
import { DefaultHeader } from '..';
import config from 'config';
import ShareProductModal from 'components/ShareProductModal';


import common from 'components/common';


const { USER_SUB_DOMAIN_URL } = config;
const {
  Button,
} = common;

const getValidDomain = (domains = []) => {
  return domains.find(({ verified, connected }) => verified && connected)
}

const CheckoutHeader = ({
  funnel,
  isNew,
  onChange,
  subdomain,
  domains,
  onSave,
  history,
  ...props
}) => {

  const [showModal, setShowModal] = useState({});

  const onPreview = () => {
    const { url:funnelUrl } = funnel;

    const domain = getValidDomain(domains)

    console.log(domains, domain)
    let url;
    if (domain && domain.domain)
      url = `https://${domain.domain}/${funnelUrl}`;
    else
      url = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${funnelUrl}`;

    // const funnelUrl = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${url}`;
    window.open(url, '_blank');
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
      funnel={funnel}
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