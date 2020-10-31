import React from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';

const { FlexBox, Title, Button, HeadLine } = common;

const DeleteModal = ({ isVisible, onClose, onSave, onCancelEdits, saveLoading }) =>
  (
    <Modal onClose={onClose} isVisible={isVisible}>
      <FlexBox column>
        <FlexBox className='mb-3 v-center' column>
          <HeadLine className='large-text mb-1 danger-color'>You have unsaved changes</HeadLine>
          <Title>Do you really wish to cancel without save the new changes?</Title>
        </FlexBox>

        <FlexBox className='v-center h-center'>
          <Button className='px-4 py-1 mr-5 danger-btn' onClick={onCancelEdits} disabled={saveLoading}>Yes, cancel</Button>
          <Button className='px-4 py-1 primary-color' onClick={onSave} disabled={saveLoading} onprogress={saveLoading}>No, Save Changes</Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  );


export default DeleteModal;
