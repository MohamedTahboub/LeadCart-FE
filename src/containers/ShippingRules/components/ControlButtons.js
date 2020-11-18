import React, { Fragment } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

import common from 'components/common';

const { FlexBox, Button } = common;

export const ActionsButtons = ({ onConfirmCancelEdits, saveLoading, onSave, hasInvalidRate }) =>
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
        disabled={hasInvalidRate || saveLoading}
        onprogress={saveLoading}
      >
        Save
      </Button>
    </FlexBox>
  );


export default ({
  isEditableShippingRule,
  onDeleteShippingRule,
  editableShippingRuleId,
  shippingRuleHasChanges,
  onEditShippingRule,
  shippingRule,
  onConfirmCancelEdits,
  _id,
  saveLoading,
  onSave,
  hasInvalidRate
}) => {

  return (
    <FlexBox>
      {!isEditableShippingRule ?
        (editableShippingRuleId && shippingRuleHasChanges) ?
          <Fragment>
            <a href={`#${editableShippingRuleId}`}><FaRegEdit size={20} className='shipping-rule-edit-icon mr-3' onClick={onEditShippingRule(shippingRule)} /></a>
            <MdDelete size={20} className='shipping-rule-delete-icon' onClick={onDeleteShippingRule(_id)} />
          </Fragment>
          :
          <Fragment>
            <FaRegEdit size={20} className='shipping-rule-edit-icon mr-3' onClick={onEditShippingRule(shippingRule)} />
            <MdDelete size={20} className='shipping-rule-delete-icon' onClick={onDeleteShippingRule(_id)} />
          </Fragment>
        :
        <ActionsButtons onConfirmCancelEdits={onConfirmCancelEdits} saveLoading={saveLoading} onSave={onSave} hasInvalidRate={hasInvalidRate} />
      }
    </FlexBox>
  );
};
