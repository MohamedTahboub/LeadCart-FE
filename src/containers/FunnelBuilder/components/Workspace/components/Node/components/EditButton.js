import React from 'react';
import PropTypes from 'prop-types';
import { FiEdit2 } from 'react-icons/fi';


const EditButton = ({ onClick }) => {
  return (
    <div onClick={onClick} className='node-edit-button'>
      <FiEdit2 className='white-text mb-2 mr-2' />
    </div>
  );
};

EditButton.propTypes = { onClick: PropTypes.func.isRequired };

export default EditButton;
