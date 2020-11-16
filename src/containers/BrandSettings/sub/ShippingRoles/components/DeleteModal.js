import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import common from 'components/common';
import * as taxeZonesActions from 'actions/taxZones';
import * as taxesActions from 'actions/taxes';
import { notification } from 'libs';
import { fakeData } from '../fakeData';


const { FlexBox, Title, Button, ErrorMessage } = common;


const DeleteModal = ({ isVisible, onClose, shippingRoleId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onDelete = async () => {
    setLoading(true);
    setTimeout(() => {
      fakeData.forEach(({ _id, name }, index) => {
        if (_id === shippingRoleId) {
          fakeData.splice(index, 1);
          notification.success(`${name} shipping role added successfuly`);
          onClose();
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <Modal onClose={onClose} isVisible={isVisible}>
      <FlexBox column>
        <Title className='large-text mb-3' >{'Permanently delete the selected Shipping Role?'}</Title>

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


export default connect(null, { ...taxeZonesActions, ...taxesActions })(DeleteModal);
