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
import { useContext } from '../../../../../actions';

const SettingsHandles = ({
  id,
  order,
  maxOrder,
  onOrderChange,
  section,
  onSettings
}) => {
  const { actions } = useContext();

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

  const onDelete = () => {
    actions.onSectionDelete(id);
  };
  return (
    <div className='product-section-settings-handle'>
      <FiTrash2 onClick={onDelete} className='item-handle delete-handle' />
      <IoMdSettings draggable onClick={onSettingsClick} className='item-handle' />
    </div>
  );
};

SettingsHandles.propTypes = {

};

export default SettingsHandles;
