import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import common from 'components/common';
import * as destinationZones from 'actions/destinationZones';
import * as taxesActions from 'actions/taxes';
import { notification } from 'libs';

const { FlexBox, Title, Button, ErrorMessage } = common;


const DeleteModal = ({ isVisible, onClose, zoneId, deleteDestinationZone, taxId, deleteTax, type = '' }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isTaxModal = type === 'tax';
  const deleteSelectedElement = isTaxModal ? deleteTax : deleteDestinationZone;
  const selectedId = isTaxModal ? { taxId } : { zone: zoneId };

  const onDelete = async () => {
    setLoading(true);

    deleteSelectedElement(
      selectedId,
      {
        onSuccess: () => {
          setLoading(false);
          onClose();
          notification.success(`your ${type} deleted successfully`);
        },
        onFailed: (message) => {
          setLoading(false);
          setErrorMessage(message);
          notification.failed(message);
        }
      }
    );
  };

  return (
    <Modal onClose={onClose} isVisible={isVisible}>
      <FlexBox column>
        <Title className='large-text mb-3' >{`Permanently delete the selected ${type}?`}</Title>

        <FlexBox className='v-center h-center'>
          <Button className='px-4 py-1 mr-5 light-btn' onClick={onClose} disabled={loading} >Cancel</Button>
          <Button className='px-4 py-1 danger-btn' onClick={onDelete} disabled={loading} onprogress={loading} >Delete</Button>
        </FlexBox>

        <FlexBox className='v-center h-center'>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};


export default connect(null, { ...destinationZones, ...taxesActions })(DeleteModal);
