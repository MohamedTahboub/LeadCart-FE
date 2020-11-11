import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';

import { FlexBox } from '../../../components/common/boxes';


const CardFooter = ({ onDelete, onEdit }) => {
  return (
    <FlexBox className='v-center product-card-footer' spaceBetween>
      <MdDelete
        data-tip='Delete'
        data-type='error'
        onClick={onDelete}
        className='fas fa-trash-alt clickable-product-icon'
        role='presentation'
        size={22}
      />
      <MdModeEdit
        data-tip='Edit'
        data-type='info'
        onClick={onEdit}
        className='fas fa-edit clickable-product-icon'
        role='presentation'
        size={22}
      />
    </FlexBox>
  );
};

export default CardFooter;
