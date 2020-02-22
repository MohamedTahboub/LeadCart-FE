import React from 'react';
import PropTypes from 'prop-types';
import {
  IoMdSettings,
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosMove
} from 'react-icons/io';
import {
  FiTrash2
} from 'react-icons/fi';

const SettingsHandles = ({
  id,
  order,
  maxOrder,
  onOrderChange,
  section,
  onSettings
}) => {
  const orderDown = () => {
    const newOrder = (order - 1) <= 0 ? 0 : (order - 1);
    onOrderChange(id, newOrder);
  };
  const orderUp = () => {
    const newOrder = (order + 1) > maxOrder ? 0 : (order + 1);

    onOrderChange(id, newOrder);
  };

  const onSettingsClick = () => {
    onSettings(section);
  };

  return (
    <div className='product-section-settings-handle'>
      <FiTrash2 className='item-handle danger-color' />
      <IoMdSettings draggable onClick={onSettingsClick} className='item-handle' />
    </div>
  );
};

SettingsHandles.propTypes = {

};

export default SettingsHandles;
