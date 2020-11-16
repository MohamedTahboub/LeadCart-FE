import React, { Fragment } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import common from 'components/common';

const { FlexBox, Button } = common;

export const ActionsButtons = ({ onConfirmCancelEdits, saveLoading, onSave }) =>
  (
    <FlexBox spaceBetween>
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


export default ({ isEditableShippingRole, onDeleteShippingRole, editableShippingRoleId, shippingRoleHasChanges, onEditShippingRole, shippingRole, onConfirmCancelEdits, _id, saveLoading, onSave }) => {

  return (
    <FlexBox>
      {!isEditableShippingRole ?
        (editableShippingRoleId && shippingRoleHasChanges) ?
          <Fragment>
            <a href={`#${editableShippingRoleId}`}><FaRegEdit size={20} className='shipping-role-edit-icon mr-3' onClick={onEditShippingRole(shippingRole)} /></a>
            <MdDelete size={20} className='shipping-role-delete-icon' onClick={onDeleteShippingRole(_id)} />
          </Fragment>
          :
          <Fragment>
            <FaRegEdit size={20} className='shipping-role-edit-icon mr-3' onClick={onEditShippingRole(shippingRole)} />
            <MdDelete size={20} className='shipping-role-delete-icon' onClick={onDeleteShippingRole(_id)} />
          </Fragment>
        :
        <ActionsButtons onConfirmCancelEdits={onConfirmCancelEdits} saveLoading={saveLoading} onSave={onSave} />
      }
    </FlexBox>
  );
};
