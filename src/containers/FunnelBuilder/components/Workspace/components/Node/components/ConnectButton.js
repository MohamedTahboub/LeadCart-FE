import React from 'react';
import PropTypes from 'prop-types';


const ConnectButton = ({
  position,
  onClick
  // relations,

}) => {

  const _onClick = (e) => {
    e.stopPropagation();
    onClick(e.target.dataset.type);
  };

  return (
    <svg height='70' width='60'>
      <path d='M 5 30 Q 30 35 50 10' stroke='#4DA1FF' strokeWidth='1.5' fill='none' />
      <path d='M 5 30 Q 30 25 50 48' stroke='#4DA1FF' strokeWidth='1.5' fill='none' />
      <circle
        id='node_start'
        cx='5'
        cy='30'
        r='4'
        fill='#4DA1FF'

      />
      <circle
        data-type='upSell'
        onClick={_onClick}
        id='node_upsell'
        cx='50'
        cy='10'
        r='6'
        fill='#4DA1FF'
        data-tip='Connect as upsell'
      />
      <circle
        data-type='downSell'
        onClick={_onClick}
        id='node_downsell'
        cx='50'
        cy='48'
        r='6'
        fill='rgb(219, 40, 70)'
        data-tip='Connect as downsell'
      />
    </svg>
  );
};

ConnectButton.propTypes = {};

export default ConnectButton;
