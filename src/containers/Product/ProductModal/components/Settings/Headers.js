import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import ShareProductModale from 'components/ShareProductModale';
import common from 'components/common';
import { openNewWindow } from 'libs';
import config from 'config';

const { USER_SUB_DOMAIN_URL } = config;
const { MiniButton, Button, ActivationSwitchInput } = common;

const Headers = ({
  subdomain,
  isNew,
  product: { available, url: productUrl } = {},
  onChange,
  ...props
}) => {
  const [showShareBox, setShareBox] = useState(false);

  const toggleShareBox = () => {
    setShareBox(!showShareBox);
  };

  const toggleAvailability = () => {
    onChange({
      target: {
        name: 'available',
        value: !available
      }
    });
  };

  const onPreview = () => {
    const url = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}/${productUrl}`;
    openNewWindow(url);
  };
  if (isNew) return null;
  return (
    <div className='product-form-settings-headers bottom-breakline'>
      <Button onClick={toggleShareBox} className='share-btn'>
        <i className='fas fa-share-square' />
        Share
      </Button>
      <ShareProductModale
        isVisible={showShareBox}
        onClose={toggleShareBox}
        subdomain={subdomain}
        productUrl={productUrl}
      />
      <ActivationSwitchInput
        active={available}
        onToggle={toggleAvailability}
      // note={? 'connect with one payment method at least' : ''}
      />
      <MiniButton
        onClick={onPreview}
        className='row-explor-btn'
        iconClass='fa-eye'
      />
    </div>
  );
};

const mapStateToProps = ({
  user: { user: { subDomain: subdomain } = {} } = {}
}) => ({ subdomain });

export default connect(mapStateToProps)(Headers);
