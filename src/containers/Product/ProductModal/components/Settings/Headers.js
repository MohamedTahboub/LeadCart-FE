import React, { useState, Component } from 'react';
import { connect } from 'react-redux'
import ShareProductModale from 'components/ShareProductModale'
import common from 'components/common'
import { openNewWindow } from 'libs'

const { MiniButton, Button, ActivationSwitchInput } = common

const Headers = ({
  subdomain,
  product: { available, url: productUrl , isActive } = {},
  onChange,
  ...props
}) => {
  const [showShareBox, setShareBox] = useState(false)

  const toggleShareBox = () => {
    setShareBox(!showShareBox)
  }

  const toggleAvailability = () => {
    if (isActive)
      onChange({
        target: {
          name: 'available',
          value: !available
        }
      });
  }

  const onPreview = () => {
    const url = `https://${subdomain}.leadcart.io/products/${productUrl}`
    openNewWindow(url);
  }
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
        disabled={!isActive}
        note={!isActive ? 'connect with one payment method at least' : ''}
      />
      <MiniButton
        onClick={onPreview}
        className='row-explor-btn'
        iconClass='fa-eye'
      />
    </div>
  );
}

const mapStateToProps = ({
  user: { user: { subDomain: subdomain } = {} } = {}
}) => ({ subdomain });

export default connect(mapStateToProps)(Headers);