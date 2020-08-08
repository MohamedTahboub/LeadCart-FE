import React, { Fragment } from 'react';
import { MdContentCopy } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';

import { useContext } from '../../../../../actions';


const settingLessTypes = ['image', 'video', 'code'];

const SettingsHandles = ({
  id,
  onDuplicate,
  section = {},
  onSettings,
  moveCard,
  index
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
    moveCard(id, index - 1);
  };

  const onOrderBottom = () => {
    moveCard(id, index + 1);
  };

  const withSettingSide = !settingLessTypes.includes(section.type);

  return (
    <div className='product-section-settings-handle'>
      <section className='order-buttons'>
        {index !== sections.length - 1 && <div className='order-buttons-bottom' onClick={onOrderBottom}><FaArrowAltCircleDown /></div>}
        {index !== 0 && <div className='order-buttons-top' onClick={onOrderTop}><FaArrowAltCircleUp /></div>}
      </section>

      {section.type !== 'checkoutSection' &&
        <Fragment>
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
        </Fragment>
      }
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

SettingsHandles.propTypes = {};

export default SettingsHandles;
