import React, { useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';

import './style.css';
import clx from 'classnames';
import { Title } from 'components/common/Titles';

const {
  MainTitle,
  Button,
  FlexBox,
  InputRow
} = common;

const { TextField } = InputRow;


const ImportTemplateModal = ({
  isVisible,
  onClose
}) => {

  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      className='sharing-modal'
      closeBtnClassName='scripts-modal-close-btn'
    >
      <FlexBox className='m-3' column>
        <Title>Import Template from a link</Title>
        <FlexBox center>
          <TextField />
          <TextField style={{ width: 50 }} />
        </FlexBox>
        <FlexBox center='h'>
          <Button>Import</Button>
        </FlexBox>

        {/* <FlexBox column className='my-2'>
          <Title>Template Name</Title>
          <img src="//via.placeholder.com/200" alt="template" style={{width:'100%',height:'auto'}}/>
        </FlexBox>

        <FlexBox flexEnd>
          <Button>Apply Changes</Button>
        </FlexBox> */}
      </FlexBox>
    </Modal>
  );
};

ImportTemplateModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

ImportTemplateModal.defaultProps = { scripts: {} };

export default ImportTemplateModal;
