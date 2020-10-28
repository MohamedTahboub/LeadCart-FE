import React from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';

const { FlexBox, Title, Button } = common;

const DeleteModal = ({ isVisible, onClose, onSave }) => {
  return (
    <Modal onClose={onClose} isVisible={isVisible}>
      <FlexBox column>
        <Title className='large-text mb-3' >Do you really wanna cancel without saving your edits?</Title>

        <FlexBox className='v-center h-center'>
          <Button className='px-4 py-1 mr-5 light-btn' onClick={onClose}>Yes, Cancel</Button>
          <Button className='px-4 py-1 danger-btn' onClick={onSave}>No, Save Changes</Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default DeleteModal;
