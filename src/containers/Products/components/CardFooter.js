import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import ReactTooltip from 'rc-tooltip';

import { FlexBox } from '../../../components/common/boxes';


const CardFooter = ({ onDelete, onEdit }) => {
  return (
    <FlexBox className='v-center product-card-footer' spaceBetween>
      <ReactTooltip overlay='Delete' placement='right' mouseEnterDelay={0.3}>
        <MdDelete
          onClick={onDelete}
          className='fas fa-trash-alt clickable-product-icon'
          role='presentation'
          size={22}
        />
      </ReactTooltip>

      <ReactTooltip overlay='Edit' placement='left' mouseEnterDelay={0.3}>
        <MdModeEdit
          onClick={onEdit}
          className='fas fa-edit clickable-product-icon'
          role='presentation'
          size={22}
        />
      </ReactTooltip>
    </FlexBox>
  );
};

export default CardFooter;
