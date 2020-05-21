import React from 'react';
import defaultFunnelThumbnail from 'assets/images/funnelCardThumbnail.png';
import EasyAnimate from 'components/common/Animation/EasyAnimate';
import { MdLaunch } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import statusBg from 'assets/images/shapes/curves.svg';
import common from 'components/common';
const { FlexBox } = common;


const StatusFeed = ({ active = true, ...props }) => {
  const style = { backgroundImage: `url(${statusBg})` };
  return (
    <div
      className='funnel-status-hat'
      style={style}
    >
      <FaCircle
        data-tip='status'
        className='tiny-text gray-text'
        color={active ? 'lightgreen' : 'gray'}
      />
    </div>
  );
};

export default ({
  name,
  orderInList,
  active,
  thumbnail = defaultFunnelThumbnail,
  onEdit,
  onPreview,
  onDelete
}) => {

  const cardCover = {
    backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0)), url(${thumbnail})`,
    height: '100%'
  };

  return (
    <EasyAnimate
      delay={orderInList * 100}
      className='mx-1'
    >
      <FlexBox column className='card-style funnel-card parent-hover'>
        <FlexBox spaceBetween center='v-center' className='title bold-text gray-text p-2 pb-3'>
          <span className='truncate'>
            {name}
          </span>
          <MdLaunch onClick={onPreview} className='larger-text item-clickable' />
        </FlexBox>
        <FlexBox column flex style={cardCover} className='funnel-bg white-text'>
          <StatusFeed

            active={active}
          />
          <FlexBox column flex flexEnd >
            <FlexBox spaceBetween style={{ width: '100%', paddingBottom: '12px' }}>
              <span onClick={onDelete} className='card-icon-wrapper show-on-parent-hover'>
                <FiTrash2 className='card-icon' />
              </span>
              <span onClick={onEdit} className='card-icon-wrapper show-on-parent-hover'>
                <FiEdit2 className='card-icon' />
              </span>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </EasyAnimate>
  );
};


// <div style={coverImageStyle} className='funnel-cover-image' />
// <MiniButton
//   iconClass='fa-copy'
//   // onClick={onDuplicate}
//   tooltip='Duplicate'
//   className='product-duplicate-btn funnel-duplicate-btn'
// />
// <div className='funnel-card-content'>
//   <div className='name-holder'>
//     <span data-tooltip='Open in new Tap'>
//       <i onClick={onPreview} className='fas fa-link' />
//     </span>
//     <span className='funnel-name-holder'>{name}</span>
//   </div>
//   <div className='card-controlls-container'>
//     <span data-tooltip='Edit Funnel'>
//       <i onClick={onEdit} className='fas fa-edit' />
//     </span>
//     <span data-tooltip='Delete Funnel'>
//       <i onClick={onDelete} className='fas fa-trash-alt' />
//     </span>
//   </div>
// </div>
