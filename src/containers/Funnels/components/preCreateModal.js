import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as funnelActions from 'actions/funnels';
import { notification } from 'libs';

import { Modal } from 'components/Modals';

import { basic as sampleBasicFunnel } from 'data/sampleFunnel';

import basicFunnelImage from 'assets/images/basicFunnelImage.png';
import blankFunnelImage from 'assets/images/blankFunnelImage.png';

const {
  Button,
  InputRow
} = common;

const funnelsTypes = {
  basic: sampleBasicFunnel, // sampleBasicFunnel,
  blank: {} // sampleBlankFunnel
};


const TemplateImage = ({
  value,
  type,
  active,
  onSelect
}) => (
  <div
    onClick={onSelect(type)}
    className={`modal-template-image ${active === type ? 'active' : ''}`}
    role='presentation'
  >
    <img src={value} alt={`template ${type}`} />
  </div>
);

TemplateImage.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};


const PreCreateModal = ({
  show,
  onClose,
  ...props
}) => {
  const [name, setName] = useState();
  const [activeType, setActiveType] = useState('basic');

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
                Start your funnel with a name and template
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
                    Select your starting funnel layout:
        </div>
        <div className='flex-container'>
          <TemplateImage
            type='blank'
            value={blankFunnelImage}
            onSelect={onSelect}
            active={activeType}
          />
          <TemplateImage
            type='basic'
            value={basicFunnelImage}
            onSelect={onSelect}
            active={activeType}
          />
        </div>
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
