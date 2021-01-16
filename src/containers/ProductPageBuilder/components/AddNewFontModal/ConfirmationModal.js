import React from 'react';
import { BsExclamationTriangle } from 'react-icons/bs';

import { Modal } from 'components/Modals';
import common from 'components/common';


const { FlexBox, Title, Button } = common;

const ConfirmationModal = ({ onClose, isVisible, onIgnore }) => (
  <Modal isVisible={isVisible} onClose={onClose}>
    <FlexBox column>
      <FlexBox className='v-center m-0' style={{ borderBottom: '1px solid gray' }} >
        <BsExclamationTriangle size={22} color='#FF9800' />
        <Title className='ml-2 large-text letter-spacing-0' >Are You Sure?</Title>
      </FlexBox>

      <Title className='my-3 letter-spacing-0' >
        You have unsaved changes, Do you want to continue and ignore the changes?
      </Title>

      <FlexBox className='v-center' spaceBetween>
        <Button className='light-btn' onClick={onClose} >Cancel</Button>
        <Button className='danger-btn' onClick={onIgnore} >Ignore</Button>
      </FlexBox>
    </FlexBox>
  </Modal>
);
export default ConfirmationModal;
