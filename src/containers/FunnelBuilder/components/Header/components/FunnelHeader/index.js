import React, { useState } from 'react';
import config from 'config';
import ShareProductModal from 'components/ShareProductModal';
import { IoIosArrowRoundBack } from 'react-icons/io';

import common from 'components/common';
import { DefaultHeader } from '..';


const { USER_SUB_DOMAIN_URL } = config;
const {
  Button,
  FlexBox,
  Title
} = common;

const getValidDomain = (domains = []) => domains.find(({ verified, connected }) => verified && connected);

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
    const { url: funnelUrl } = funnel;

    const domain = getValidDomain(domains);

    // console.log(domains, domain)
    let url;
    if (domain && domain.domain) url = `https://${domain.domain}/${funnelUrl}`;
    else url = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${funnelUrl}`;

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
    <FlexBox className='white-bg padding-v-5' center='v-center' spaceBetween>
      <FlexBox>
        <Button circle className='light-btn'>
          <IoIosArrowRoundBack />
        </Button>
        <Title>Back To Funnels</Title>
      </FlexBox>

      <FlexBox flex center='h-center'>

        <Button className='light-btn solid-right-border'>
          Funnel Steps
        </Button>

        <Button className='light-btn solid-left-border'>
          Funnel Rules
        </Button>
      </FlexBox>

      <FlexBox>
        <div className='header-buttons'>
          <Button
            disabled={isNew}
            onClick={onShowShare}
            className='light-btn solid-right-border'
          >
            <i className='fas fa-share-square' />
            Share
          </Button>
          <Button
            disabled={isNew}
            onClick={onPreview}
            className='light-btn solid-right-border solid-left-border'
          >
            <i className='fas fa-eye' />
            Preview
          </Button>
          <Button onClick={onSave} className='light-btn solid-left-border'>
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
      </FlexBox>
    </FlexBox>
  );
};

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
