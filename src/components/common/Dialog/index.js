import React from 'react';
import { MainTitle } from '../Titles';
import { Button } from '../Buttons';
import { Modal } from '../../Modals';
import { FlexBox } from '../boxes';
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
  confirmBtnClass = 'danger-bg',
  cancelBtnClass = 'primary-color',
  hideCancelBtn,
  confirmBtnIcon = (<i className='fas fa-trash-alt' />),
  ...props
}) => (
  <Modal onClose={onClose} isVisible={show} {...props}>
    <MainTitle style={{ boarderBottom: '1px solid #eee' }} >{title}</MainTitle>
    <div className='dialog-description' style={{ margin: '20px 0' }}>{description}</div>
    {!hideCancelBtn && (
      <Button onClick={onClose} className={`${cancelBtnClass} margin-with-float-left`}>
        {' '}
        {cancelBtnText}
      </Button>
    )}
    {!hideConfirmBtn && (
      <Button onClick={onConfirm} className={`${confirmBtnClass} margin-with-float-right`}>
        <FlexBox center='v-center'>
          {confirmBtnIcon}
          <span>
            {confirmBtnText}
          </span>
        </FlexBox>
      </Button>
    )}
  </Modal>
);
