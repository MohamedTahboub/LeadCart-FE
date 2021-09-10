import React from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';

import './style.css';

const {
  MainTitle,
  Button,
  FlexBox,
  InputRow
} = common;

const { Label, TextField } = InputRow;

const ProductsScripts = ({
  scripts,
  isVisible,
  onClose,
  isSaving,
  onChange,
  onSaveTheProduct
}) => {
  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      className='trackers-modal'
      closeBtnClassName='scripts-modal-close-btn'
    >
      <MainTitle
        bottomLine
        className='scripts-modal-title'
      >
        Product Facebook Pixels & Google Tag Manager Settings
      </MainTitle>
      <FlexBox
        key='productPage-Scripts'
        className='scripts-container'
        column
      >
        <div className='scripts-head-message'>
          Add your FB pixels for facebook and google tag manager to get you analytics
        </div>
        <FlexBox center='v-center'>
          <Label className='scripts-labels'>
            Facebook Pixel Id:
          </Label>
          <TextField
            placeholder='25417913856****'
            name='scripts.fbPixelId'
            value={scripts.fbPixelId}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox center='v-center' className='my-2'>
          <Label className='scripts-labels' >
            Google Tag Manager Id:
          </Label>
          <TextField
            placeholder='GTM-XXXX'
            name='scripts.googleTagManager'
            value={scripts.googleTagManager}
            onChange={onChange}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox flex spaceBetween className='mt-3'>
        <Button
          onClick={onClose}
          className='script-save-btn'
        >
          Cancel
        </Button>
        <Button
          onprogress={isSaving}
          onClick={() => onSaveTheProduct(onClose)}
          className='primary-color script-save-btn'
        >
          Save
        </Button>
      </FlexBox>
    </Modal>
  );
};

ProductsScripts.propTypes = {
  scripts: PropTypes.object,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

ProductsScripts.defaultProps = { scripts: {} };

export default ProductsScripts;
