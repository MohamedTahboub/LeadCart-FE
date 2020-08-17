import React, { Fragment, createRef } from 'react';
import { Tooltip } from 'react-svg-tooltip';

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

  const circleRef = createRef(null);

  const dontHaveUpSell = !upSell, dontHaveDownSell = (!downSell && nodeType !== 'checkout');
  return (
    <svg height='70' width='60' style={{ overflow: 'visible' }} >
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
        <Fragment>
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
            ref={circleRef}
          />

          <Tooltip triggerRef={circleRef}>
            <rect x={2} y={2} width={130} height={18}
              rx={5} ry={5} fill='#4DA1FF'
            />
            <text x={14} y={16} fontSize={14} fill='white'>Click To Connect</text>
          </Tooltip>
        </Fragment>
      )
      }
      {dontHaveDownSell && (
        <Fragment>
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
            ref={circleRef}
          />

          <Tooltip triggerRef={circleRef}>
            <rect x={2} y={2} width={130} height={18}
              rx={5} ry={5} fill='#e67e22'
            />
            <text x={14} y={16} fontSize={14} fill='white'>Click To Connect</text>
          </Tooltip>
        </Fragment>
      )
      }
    </svg >
  );
};

ConnectButton.propTypes = {};

export default ConnectButton;
