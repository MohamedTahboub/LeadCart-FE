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
  cancelBtnIcon = null,
  cancelBtnText = 'cancel',
  confirmBtnText = 'confirm',
  hideConfirmBtn,
  confirmBtnClass='warning-color',
  cancelBtnClass='primary-color',
  hideCancelBtn,
  confirmBtnIcon = (<i className='fas fa-trash-alt' />),
  ...props
}) => (
    <Modal onClose={onClose} isVisible={show}>
      <MainTitle>{title}</MainTitle>
      <div className='dialog-description'>{description}</div>
      {!hideCancelBtn && (
        <Button onClick={onClose} className={`${cancelBtnClass} margin-with-float-left`}>
          {' '}
          {cancelBtnText}
        </Button>
      )}
      {!hideConfirmBtn && (
        <Button onClick={onConfirm} className={`${confirmBtnClass} margin-with-float-right`}>
          {confirmBtnIcon}
          {confirmBtnText}
        </Button>
      )}
    </Modal>
  );
