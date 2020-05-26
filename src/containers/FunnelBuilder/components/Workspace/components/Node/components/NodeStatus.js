import React from 'react';
import PropTypes from 'prop-types';
import { FaCircle } from 'react-icons/fa';
import statusBg from 'assets/images/shapes/curves.svg';

const NodeStatus = ({ active }) => {
  const style = { backgroundImage: `url(${statusBg})` };
  return (
    <div
      className='funnel-node-status-hat'
      style={style}
    >
      <FaCircle
        data-tip='status'
        className='tiny-text gray-text status-circle'
        color={active ? 'lightgreen' : 'gray'}
      />
    </div>
  );
};

NodeStatus.propTypes = { active: PropTypes.bool };
NodeStatus.defaultProps = { active: true };

export default NodeStatus;
