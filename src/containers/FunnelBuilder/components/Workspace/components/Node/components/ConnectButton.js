import React from 'react';
import PropTypes from 'prop-types';
import { mapListToObject } from 'libs';


const getRelations = (relations = []) => {
  return mapListToObject(relations, 'type');
};

const ConnectButton = ({
  nodeType,
  position,
  onClick,
  relations
}) => {
  if (nodeType === 'thankyoupage') return null;

  const { upSell, downSell } = getRelations(relations);

  const _onClick = (e) => {
    e.stopPropagation();
    onClick(e.target.dataset.type);
  };


  const dontHaveUpSell = !upSell, dontHaveDownSell = (!downSell && nodeType !== 'checkout');
  return (
    <svg height='70' width='60' >
      {(dontHaveUpSell && dontHaveDownSell) && (
        <circle
          id='node_start'
          cx='5'
          cy='30'
          r='4'
          fill='#4DA1FF'
        />
      )
      }
      {dontHaveUpSell && (
        <circle
          onMouseEnter={({ target }) => {
            target.setAttribute('r', 10);
          }}

          onMouseLeave={({ target }) => {
            target.setAttribute('r', 6);
          }}
          data-type='upSell'
          onClick={_onClick}
          id='node_upsell'
          cx='50'
          cy={(upSell && upSell.coordinates && upSell.coordinates.y) ? (upSell.coordinates.y + 10) : 10}
          r='6'
          fill='#4DA1FF'
          data-tip='Connect as upsell'
        />
      )
      }
      {dontHaveDownSell && (
        <circle
          onMouseEnter={({ target }) => {
            target.setAttribute('r', 10);
          }}

          onMouseLeave={({ target }) => {
            target.setAttribute('r', 6);
          }}
          data-type='downSell'
          onClick={_onClick}
          id='node_downsell'
          cx='50'
          cy='48'
          r='6'
          fill='#e67e22'
          data-tip='Connect as downsell'
        />
      )
      }
    </svg>
  );
};

ConnectButton.propTypes = {};

export default ConnectButton;
