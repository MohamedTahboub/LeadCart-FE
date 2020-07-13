import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';

import { useContext } from '../../../../../actions';


const settingLessTypes = ['heading', 'text', 'image', 'video', 'code'];

const SettingsHandles = ({
  id,
  onDuplicate,
  section = {},
  onSettings
}) => {
  const { actions } = useContext();

  const onSettingsClick = () => {
    onSettings(section);
  };

  const onDelete = () => {
    actions.onSectionDelete(id);
    onSettings({ type: 'deleted' });
  };


  const withSettingSide = !settingLessTypes.includes(section.type);
  return (
    <div className='product-section-settings-handle'>
      <FiTrash2
        onClick={onDelete}
        className='item-handle delete-handle'
        data-tip='delete this section'
      />
      <MdContentCopy
        onClick={onDuplicate(id)}
        className='item-handle'
        data-tip='duplicate this section'
      />
      {withSettingSide && (
        <IoMdSettings
          draggable
          onClick={onSettingsClick}
          className='item-handle'
          data-tip='section-settings'
        />
      )}
    </div>
  );
};

export default SettingsHandles;
