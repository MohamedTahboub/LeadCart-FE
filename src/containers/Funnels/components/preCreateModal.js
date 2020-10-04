import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clx from 'classnames';

import * as funnelActions from 'actions/funnels';
import { notification } from 'libs';
import { Modal } from 'components/Modals';
import { optIn as sampleOptInFunnel } from 'data/sampleFunnel'; import common from 'components/common';

import checkoutFunnelImage from 'assets/images/checkout-thumbnail-template.png';
// Need to Change
import optInFunnelImage from 'assets/images/optIn-thumbnail-template.png';


const { Button, InputRow, FlexBox } = common;

const funnelsTypes = {
  optIn: {
    type: 'OPT-IN',
    ...sampleOptInFunnel
  },
  checkout: { type: 'CHECKOUT' }
};


const TemplateImage = ({
  value,
  type,
  active,
  onSelect,
  isBeta
}) => {
  const TemplateImageClasses = clx('modal-template-image', { active: active === type });

  return (
    <div onClick={onSelect(type)}
      className={TemplateImageClasses}
      role='presentation'
    >
      <p className='bold-text p-2'>{`${type === 'checkout' ? 'Checkout' : 'Opt-in'} Funnel Flow`}</p>
      <img src={value} alt={`template ${type}`} />
      {isBeta && (
        <div className='beta-badge' >Beta</div>
      )}
    </div>);
};


TemplateImage.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};


const PreCreateModal = ({
  show,
  onClose,
  defaultCurrency,
  ...props
}) => {
  const [name, setName] = useState('');
  const [activeType, setActiveType] = useState('checkout');

  const onNameChange = ({ target: { value } }) => {
    setName(value);
  };

  const onSelect = (type) => () => {
    setActiveType(type);
  };


  const onSuccess = (funnel) => {
    props.history.push(`/funnels/${funnel.url}`);
    setTimeout(() => {
      notification.success(`${funnel.name} funnel created successfully`);
    }, 400);
  };

  const onFailed = (message) => {
    notification.failed(message);
  };

  const onCreate = () => {
    const funnel = funnelsTypes[activeType];
    if (typeof funnel !== 'object') return;

    funnel.name = name;
    funnel.currency = defaultCurrency;

    props.createFunnel({ funnel }, { onSuccess, onFailed });
  };


  return (
    <Modal
      onClose={onClose}
      isVisible={show}
      hideCloseBtn
      className='pre-create-funnel-modal'
    >

      <div className='funnel-modal-templates-title big'>
        Start your funnel with a name and flow type
      </div>
      <div className='funnel-form-content'>

        <InputRow className='funnel-name-input-row'>
          <InputRow.Label className='funnel-name-input-label'>
            Funnel Name:
          </InputRow.Label>
          <InputRow.TextField
            className='funnel-name'
            value={name}
            onChange={onNameChange}
            name='name'
          />
        </InputRow>
        <div className='funnel-modal-templates-title'>
          Select your starting funnel flow:
        </div>
        <FlexBox className='justify-space-around df-warp'>
          <TemplateImage
            type='checkout'
            value={checkoutFunnelImage}
            onSelect={onSelect}
            active={activeType}
          />

          <TemplateImage
            type='optIn'
            value={optInFunnelImage}
            onSelect={onSelect}
            active={activeType}
            isBeta
          />
        </FlexBox>
      </div>

      <Button onClick={onClose} className='gray-bg margin-with-float-left'>
        Cancel
      </Button>
      <Button onClick={onCreate} className='primary-color  margin-with-float-right'>
        Create
      </Button>
    </Modal>
  );
};

PreCreateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
  showFlashMessage: PropTypes.func.isRequired,
  createFunnel: PropTypes.func.isRequired
};

export default connect(null, funnelActions)(PreCreateModal);
