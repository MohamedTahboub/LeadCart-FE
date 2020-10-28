import React from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';

const { FlexBox, Title, Button } = common;

const DeleteModal = ({ isVisible, onClose }) => {
  return (
    <Modal onClose={onClose} isVisible={isVisible}>
      <FlexBox column>
        <Title className='large-text mb-3' >Do you really cancel without saving your edits?</Title>

        <FlexBox className='v-center h-center'>
          <Button className='px-4 py-1 mr-5 light-btn' onClick={onClose}>No</Button>
          <Button className='px-4 py-1 danger-btn'>Yes, Cancel</Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default DeleteModal;
