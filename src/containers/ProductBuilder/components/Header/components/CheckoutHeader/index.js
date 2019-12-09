import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { DefaultHeader } from '..';
// import config from 'config';
import ShareProductModal from 'components/ShareProductModal';
import ScriptsModal from 'components/ScriptsModal';


import common from 'components/common';


// const { USER_SUB_DOMAIN_URL } = config;
const {
  // HeaderLogo,
  Button,
  // ActivationSwitchInput
} = common;

const CheckoutHeader = ({
  product,
  onChange,
  subdomain,
  displayType,
  onDisplayChange,
  onSave,
  history,
  ...props
}) => {

  const [showModal, setShowModal] = useState({});

  const onShowScripts = () => {
    setShowModal({ scripts: true });
  };

  const onCloseModal = () => {
    setShowModal({});
  };

  return (
    <DefaultHeader
      showSandBoxSwitch
      showDisplayModes
      onChange={onChange}
      onDisplayChange={onDisplayChange}
      displayType={displayType}
      history={history}
      product={product}
    >
      <div className='header-buttons'>
        <Button onClick={onShowScripts} className='primary-btn '>
          <i className='fas fa-code' />
          Embed Scripts
        </Button>

        <Button onClick={onSave} className='primary-btn '>
          <i className='fas fa-save' />
          Save
        </Button>
      </div>
      <ShareProductModal
        isVisible={showModal.share}
        onClose={onCloseModal}
        subdomain={subdomain}
        productUrl={product.url}
      />
      <ScriptsModal
        isVisible={showModal.scripts}
        scripts={product.scripts}
        onChange={onChange}
        onClose={onCloseModal}
      />
    </DefaultHeader>
  );
}

CheckoutHeader.propTypes = {

};

export default CheckoutHeader;
