import React from 'react';
import defaultFunnelThumbnail from 'assets/images/funnelCardThumbnail.png';
import EasyAnimate from 'components/common/Animation/EasyAnimate';
import { MdLaunch } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import { FiCopy, FiEdit2, FiTrash2 } from 'react-icons/fi';
import statusBg from 'assets/images/shapes/curves.svg';
import common from 'components/common';
import { PuffLoader } from 'components/common/Spinners';
import Tooltip from 'components/common/Tooltip';
import { isFunction } from 'libs/checks';
import clx from 'classnames';

const { FlexBox } = common;


const StatusFeed = ({ active }) => {
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

StatusFeed.defaultProps = { active: true };

const ControlIcon = ({ onClick, loading, tipText, name, icon, className }) => {
  const isLoading = (loading && loading === name);
  const _onClick = (e) => {
    if (isFunction(onClick) && !isLoading)
      onClick(e);
  };

  return (
    <Tooltip text={tipText} placement='top'>
      <span onClick={_onClick} className={clx('card-icon-wrapper show-on-parent-hover', { 'transparent-bg': isLoading }, className)}>
        {!(loading && loading === name) ? icon : <PuffLoader size={18} color='#4da1ff' />}
      </span>
    </Tooltip>
  );
};

export default ({
  name,
  orderInList,
  onEdit,
  onPreview,
  onDelete,
  onDuplicate,
  loading,
  marketPlace: { publish } = {}
}) => {

  const cardCover = {
    backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0)), url(${defaultFunnelThumbnail})`,
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
          <StatusFeed active={publish} />
          <FlexBox column flex flexEnd >
            <FlexBox spaceBetween style={{ width: '100%', paddingBottom: '12px' }}>
              <ControlIcon
                name='delete'
                tipText='Delete'
                icon={<FiTrash2 className='card-icon' />}
                onClick={onDelete}
                loading={loading}
              />
              <ControlIcon
                name='duplicate'
                tipText='Duplicate'
                icon={<FiCopy className='card-icon' />}
                onClick={onDuplicate}
                loading={loading}
                className='funnel-card-duplicate'
              />
              <ControlIcon
                name='edit'
                tipText='Edit'
                icon={<FiEdit2 className='card-icon' />}
                onClick={onEdit}
                loading={loading}
              />
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </EasyAnimate>
  );
};
