import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import config from 'config';
import './style.css';
import ShareProductModal from 'components/ShareProductModal';
import ScriptsModal from 'components/ScriptsModal';

const { USER_SUB_DOMAIN_URL } = config;
const {
  HeaderLogo,
  Button,
  ActivationSwitchInput
} = common;

const DisplayMode = ({ onChange, type }) => {
  const Icon = ({
    type, onChange, iconClassName, activeType
  }) => (
    <i
      onClick={() => onChange(type)}
      className={`fas fa-${iconClassName} zoom-effect display-mode-icon ${activeType === type ? 'active' : ''}`}
      role='presentation'
    />
  );
  return (
    <div className='display-controls'>
      <Icon
        onChange={onChange}
        type='desktop'
        activeType={type}
        iconClassName='desktop'
      />
      <Icon
        onChange={onChange}
        type='tablet'
        activeType={type}
        iconClassName='tablet-alt'
      />
      <Icon
        onChange={onChange}
        type='mobile'
        activeType={type}
        iconClassName='mobile-alt'
      />
    </div>
  );
};

const Header = ({
  onDisplayChange,
  type,
  onChange,
  product,
  subdomain,
  history,
  onSave,
  ...props
}) => {
  const [showModal, setShowModal] = useState({});

  const onPreview = () => {
    const { url } = product;
    const productUrl = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${url}`;
    window.open(productUrl, '_blank');
  };

  const onShowScripts = () => {
    setShowModal({ scripts: true });
  };

  const onShowShare = () => {
    setShowModal({ share: true });
  };
  const onCloseModal = () => {
    setShowModal({});
  };

  const onToggleAvailability = () => {
    onChange({
      target: {
        name: 'available',
        value: !product.available
      }
    });
  };
  const navigateToHome = () => {
    history.push('/');
  };

  return (
    <div className='checkout-header'>
      <HeaderLogo
        onClick={navigateToHome}
      />
      <ActivationSwitchInput active={product.available} onToggle={onToggleAvailability} />
      <DisplayMode onChange={onDisplayChange} type={type} />
      <div className='header-buttons'>
        <Button onClick={onShowScripts} className='primary-btn '>
          <i className='fas fa-code' />
          Embed Scripts
        </Button>
        <Button onClick={onShowShare} className='primary-btn '>
          <i className='fas fa-share-square' />
          Share
        </Button>
        <Button onClick={onPreview} className='primary-btn '>
          <i className='fas fa-eye' />
          Preview
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
    </div>
  );
};

Header.propTypes = {
  onDisplayChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  subdomain: PropTypes.string.isRequired,
  history: PropTypes.objectOf({}),
  product: PropTypes.objectOf({}),
};

Header.defaultProps = {
  history: {},
  product: {},
};

export default Header;
