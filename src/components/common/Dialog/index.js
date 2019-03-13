import React from 'react';
import { MainTitle } from '../Titles';
import { Button } from '../Buttons';
import { Modal } from '../../Modals'
export default ({
  onClose,
  show,
  title,
  description,
  onConfirm,
  cancelBtnText = 'cancel',
  confirmBtnText = 'confirm',
  ...props
}) => (
    <Modal onClose={onClose} isVisible={show}>
      <MainTitle>{title}</MainTitle>
      <div className='dialog-description'>{description}</div>
      <Button onClick={onClose} className='primary-color margin-with-float-left'>
        {' '}
        {cancelBtnText}
      </Button>
      <Button onClick={onConfirm} className='warning-color margin-with-float-right'>
        <i className='fas fa-trash-alt' />
        {confirmBtnText}
      </Button>
    </Modal>
  );
