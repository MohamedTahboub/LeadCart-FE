import React, { Fragment } from 'react';
import common from 'components/common';
import { MdContentCopy } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

import { useContext } from '../../../../../actions';

const { Tooltip } = common;
const settingLessTypes = ['code'];

const SettingsHandles = ({
  id,
  onDuplicate,
  section = {},
  onSettings,
  moveCrossColumns,
  index,
  isThankYouProductPage,
  parentZone
}) => {
  const {
    state: { product: { sections = [] } = {} },
    actions
  } = useContext();


  const onSettingsClick = () => {
    onSettings(section);
  };

  const onDelete = () => {
    if (section.type !== 'checkoutSection')
      actions.onSectionDelete(id);
  };

  const onOrderTop = () => {
    moveCrossColumns(id, -1, parentZone);
  };

  const onOrderBottom = () => {
    moveCrossColumns(id, 1, parentZone);
  };

  const isOnBottom = index !== sections.length - 1;
  const isOnTop = index !== 0;
  const isCheckoutInThankYouPage = isThankYouProductPage && section.type === 'checkoutSection';
  const withSettingSide = !settingLessTypes.includes(section.type) && !isCheckoutInThankYouPage;

  return (
    <div className='product-section-settings-handle'>
      <section className='order-buttons'>
        {isOnBottom && <div className='order-buttons-bottom' onClick={onOrderBottom}><FaArrowAltCircleDown /></div>}
        {isOnTop && <div className='order-buttons-top' onClick={onOrderTop}><FaArrowAltCircleUp /></div>}
      </section>

      {section.type !== 'checkoutSection' &&
        <Fragment>
          <Tooltip mouseEnterDelay={1} text='delete this section'>
            <FiTrash2
              onClick={onDelete}
              className='item-handle delete-handle'
            />
          </Tooltip>
          <Tooltip mouseEnterDelay={1} text='duplicate this section'>
            <MdContentCopy
              onClick={onDuplicate(id)}
              className='item-handle'
            />
          </Tooltip>
        </Fragment>
      }
      {withSettingSide && (
        <Tooltip mouseEnterDelay={1} text='section settings'>
          <IoMdSettings
            draggable
            onClick={onSettingsClick}
            className='item-handle'
          />
        </Tooltip>
      )}
    </div>
  );
};

SettingsHandles.propTypes = {};

export default SettingsHandles;
