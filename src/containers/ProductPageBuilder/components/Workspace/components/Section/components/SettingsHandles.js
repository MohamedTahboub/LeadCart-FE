import React from 'react';
import PropTypes from 'prop-types';
import { IoMdSettings, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const SettingsHandles = ({
  id,
  order,
  maxOrder,
  onOrderChange,
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
    onSettings(id);
  };

  return (
    <div className='product-section-settings-handle'>
      <IoIosArrowDown onClick={orderUp} className='item-handle' />
      <IoIosArrowUp onClick={orderDown} className='item-handle' />
      <IoMdSettings onClick={onSettingsClick} className='item-handle' />
    </div>
  );
};

SettingsHandles.propTypes = {

};

export default SettingsHandles;
