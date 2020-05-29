import React from 'react';
import PropTypes from 'prop-types';
import { FaCircle } from 'react-icons/fa';
import statusBg from 'assets/images/shapes/curves.svg';

const NodeStatus = ({ active, note }) => {
  const style = { backgroundImage: `url(${statusBg})` };
  return (
    <div
      className='funnel-node-status-hat'
      style={style}
    >
      <FaCircle
        data-tip={active ? note : 'Not connected to any product'}
        className='tiny-text gray-text status-circle'
        color={active ? 'lightgreen' : 'orange'}
      />
    </div>
  );
};

NodeStatus.propTypes = {
  active: PropTypes.bool,
  note: PropTypes.string
};


export default NodeStatus;
