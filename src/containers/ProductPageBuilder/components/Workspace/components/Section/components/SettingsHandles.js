import React from 'react';
import PropTypes from 'prop-types';
import { MdContentCopy } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import { useContext } from '../../../../../actions';


const SettingsHandles = ({
  id,
  onDuplicate,
  section,
  onSettings
}) => {
  const { actions } = useContext();

  const onSettingsClick = () => {
    onSettings(section);
  };

  const onDelete = () => {
    actions.onSectionDelete(id);
  };
  return (
    <div className='product-section-settings-handle'>
      <FiTrash2 onClick={onDelete} className='item-handle delete-handle' />
      <MdContentCopy onClick={onDuplicate(id)} className='item-handle' />
      <IoMdSettings draggable onClick={onSettingsClick} className='item-handle' />
    </div>
  );
};

SettingsHandles.propTypes = {

};

export default SettingsHandles;
