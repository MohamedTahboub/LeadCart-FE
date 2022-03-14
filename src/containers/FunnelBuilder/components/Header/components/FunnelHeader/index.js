import React, { Fragment, useEffect, useState } from 'react';
import clx from 'classnames';
import ToolTip from 'react-tooltip';
import { IoIosAdd, IoIosArrowRoundBack } from 'react-icons/io';
import config from 'config';

import ShareProductModal from 'components/ShareProductModal';
import common from 'components/common';
import useBlock from 'libs/hooks/useBlock';


const { USER_SUB_DOMAIN_URL } = config;
const {
  Button,
  FlexBox,
  Title
} = common;

const getValidDomain = (domains = []) => domains.find(({ verified, connected }) => verified && connected);

const getFunnelUrl = ({ funnelUrl, domains = [], subdomain }) => {

  const domain = getValidDomain(domains);
  let rootPath;
  if (domain && domain.domain)
    rootPath = `https://${domain.domain}/`;
  else
    rootPath = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}`;
  return {
    rootPath,
    funnelUrl: `${rootPath}${funnelUrl}`
  };
};
const CheckoutHeader = ({
  funnel,
  subdomain,
  domains,
  activePage,
  onPageChange,
  onToggleRuleModal,
  onSave,
  history,
  isFunnelBuilderHasChanges,
  hasValidCheckout
}) => {
  const [showModal, setShowModal] = useState({});

  const { funnelUrl, rootPath } = getFunnelUrl({ funnelUrl: funnel.url, domains, subdomain });

  const onPreview = () => {
    window.open(funnelUrl, '_blank');
  };

  const onShowShare = () => {
    setShowModal({ share: true });
  };
  const onCloseModal = () => {
    setShowModal({});
  };

  const goToFunnels = () => {
    history.push('/funnels');
  };


  return (
    <FlexBox className='white-bg padding-v-5 gray-border-top' center='v-center' spaceBetween wrappable>
      <FlexBox center='v-center' className='min-width-250 '>
        <Button onClick={goToFunnels} className='light-btn icon-btn margin-left-20'>
          <IoIosArrowRoundBack />
        </Button>
        <Title>Back To Funnels</Title>
      </FlexBox>

      <FlexBox flex center='h-center'>
        <Button
          onClick={onPageChange('blocks')}
          active={activePage === 'blocks'}
          className='light-btn solid-right-border'
        >
          Funnel Steps
        </Button>
        <Button
          onClick={onPageChange('rules')}
          active={activePage === 'rules'}
          className='light-btn solid-left-border'
        >
          Funnel Rules
        </Button>
      </FlexBox>

      <FlexBox center='v-center' className='min-width-250 padding-right-20' flexEnd>
        {activePage === 'rules' ? (
          <Button
            onClick={onToggleRuleModal}
            className='light-btn '
          >
            <FlexBox center='v-center'>
              <IoIosAdd />
              New Rule
            </FlexBox>
          </Button>
        ) : (
          <Fragment>
            <Button
              onClick={onShowShare}
              className='light-btn solid-right-border '
            >
              <i className='fas fa-share-square font-size-11' />
                Share
            </Button>

            <FlexBox
              data-tip='You have unsaved changes'
              data-tip-disable={!isFunnelBuilderHasChanges}
              data-place='left'
            >
              <Button
                onClick={onPreview}
                className='light-btn solid-right-border solid-left-border'
                disabled={isFunnelBuilderHasChanges}
              >
                <i className='fas fa-eye font-size-11' />
                Preview
              </Button>
            </FlexBox>

            <FlexBox
              data-tip='you should start with a checkout page with a product'
              data-tip-disable={hasValidCheckout}
              data-place='left'
            >
              <Button
                onClick={onSave}
                className={clx('light-btn solid-left-border', { 'unsaved-changes': isFunnelBuilderHasChanges })}
                disabled={!hasValidCheckout}
              >
                <i className='fas fa-save font-size-11' />
              Save
              </Button>
            </FlexBox>
            <ToolTip />
          </Fragment>
        )}
        <ShareProductModal
          isVisible={showModal.share}
          onClose={onCloseModal}
          subdomain={subdomain}
          funnelUrl={funnelUrl}
          rootPath={rootPath}
        />
      </FlexBox>
    </FlexBox>
  );
};

CheckoutHeader.propTypes = {};

export default CheckoutHeader;
