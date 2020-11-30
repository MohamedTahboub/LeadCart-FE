import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import common from 'components/common';
import * as destinationZones from 'actions/destinationZones';
import * as taxesActions from 'actions/taxes';
import * as shippingRulesActions from 'actions/shippingRules';
import { notification } from 'libs';

const { FlexBox, Title, Button, ErrorMessage } = common;


const DeleteModal = ({ isVisible, onClose, zoneId, deleteDestinationZone, taxId, deleteTax, type = '', deleteShippingRule, shippingRuleId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isTaxModal = type === 'tax';
  const isZonesModal = type === 'zone';
  const isShippingsModal = type === 'shipping';


  let deleteItem;
  let itemId;

  if (isTaxModal) {
    deleteItem = deleteTax;
    itemId = { taxId };
  } else if (isZonesModal) {
    deleteItem = deleteDestinationZone;
    itemId = { zone: zoneId };
  } else if (isShippingsModal) {
    deleteItem = deleteShippingRule;
    itemId = { shippingMethod : shippingRuleId };
  }


  const onDelete = async () => {
    setLoading(true);

    deleteItem(
      itemId,
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


export default connect(null, { ...destinationZones, ...taxesActions, ...shippingRulesActions })(DeleteModal);
