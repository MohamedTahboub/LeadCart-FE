import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';


const AddNewMethodBtn = ({ onClick }) => {
  return (
    <AiOutlinePlusCircle color='currentColor' size={22} onClick={onClick} className='item-clickable'/>
  );
};

AddNewMethodBtn.propTypes = {};

export default AddNewMethodBtn;
