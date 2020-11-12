import React, { Fragment } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import common from 'components/common';

import './style.css';

const { FlexBox, Button } = common;

export const ActionsButtons = ({ onConfirmCancelEdits, saveLoading, onSave }) =>
  (
    <FlexBox className='' spaceBetween>
      <Button
        className='px-4 py-1 mr-3 light-btn'
        onClick={onConfirmCancelEdits}
        disabled={saveLoading}
      >
        Cancel
      </Button>

      <Button
        className='px-4 py-1 primary-color'
        onClick={onSave}
        disabled={saveLoading}
        onprogress={saveLoading}
      >
        Save
      </Button>
    </FlexBox>
  );


export default ({ isEditableTax, onDeleteTax, editableTaxId, taxHasChanges, onEditTax, tax, onConfirmCancelEdits, _id, saveLoading, onSave }) => {

  return (
    <FlexBox>
      {!isEditableTax ?

        (editableTaxId && taxHasChanges) ?
          <Fragment>
            <a href={`#${editableTaxId}`}><FaRegEdit size={20} className='tax-edit-icon ml-3' onClick={onEditTax(tax)} /></a>
            <MdDelete size={20} className='tax-delete-icon' onClick={onDeleteTax(_id)} />
          </Fragment>
          :
          <Fragment>
            <MdDelete size={20} className='tax-delete-icon' onClick={onDeleteTax(_id)} />
            <FaRegEdit size={20} className='tax-edit-icon ml-3' onClick={onEditTax(tax)} />
          </Fragment>
        :
        <ActionsButtons onConfirmCancelEdits={onConfirmCancelEdits} saveLoading={saveLoading} onSave={onSave} />
      }
    </FlexBox>
  );
};
