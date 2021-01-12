import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';

import { Modal } from 'components/Modals';
import common from 'components/common';


const { FlexBox, Title, Button } = common;

const ConfirmationModal = ({ onClose, isVisible, onSave }) => (
  <Modal isVisible={isVisible} onClose={onClose}>
    <FlexBox column>
      <FlexBox className='v-center m-0' style={{ borderBottom: '1px solid gray' }} >
        <BsExclamationTriangle size={22} color='#FF9800' />
        <Title className='ml-2 large-text' >Are You Sure?</Title>
      </FlexBox>

      <Title className='my-3' >
        You have unsaved changes, are you wanna save or cancel?
      </Title>

      <FlexBox className='v-center' spaceBetween>
        <Button className='danger-bg' onClick={onClose} >Cancel</Button>
        <Button className='primary-color' onClick={onSave} >Save</Button>
      </FlexBox>
    </FlexBox>
  </Modal>
);

export default ConfirmationModal;
