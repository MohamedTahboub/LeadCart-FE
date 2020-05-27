import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const StartCircle = ({ x, y, color }) => {

  return (
    <circle
      className='start'
      cx={x}
      cy={y}
      r='5'
      fill={color}
    />
  );
};

const ThreadPath = ({ start, relation }) => {

  const { path: pathString, id } = getPathCoords(relation, start);

  return (
    <path
      key={id}
      d={pathString}
      fill='none'
      stroke='#03a9f4d4'
      strokeWidth='1.5'
      markerEnd={`url(#arrowHead_${id})`}
    />
  );
};

const Marker = ({ id }) => {
  return (
    <defs>
      <marker
        key={id}
        id={`arrowHead_${id}`} viewBox='0 0 10 10'
        refX='1' refY='5'
        markerUnits='strokeWidth'
        markerWidth='10' markerHeight='10'
        orient='auto'
      >
        <path d='M 0 0 L 10 5 L 0 10 z' fill='#4DA1FF' strokeWidth='1' />
      </marker>
    </defs>
  );
};
const Wire = ({ id, position, relation }) => {

  const startPoint = {
    x: position.x + 15,
    y: position.y
  };
  return (
    <Fragment>
      <Marker id={id} />
      <ThreadPath id={id} relation={relation} start={position} />
      <StartCircle {...position} />
    </Fragment>
  );
};

Wire.propTypes = {};

export default Wire;

const cardShape = {
  height: 180,
  width: 120,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 15,
  marginRight: 15
};

function getPathCoords ({
  target: targetId,
  type,
  coordinates: {
    x: endX,
    y: endY
  } = {},
  tension = 0.35
}, {
  x: startX,
  y: startY
}) {
  const y1 = type !== 'upsell' ? startY : startY + 20;
  const delta = (startX < endX ? (endX - startX) : (startX - endX)) * tension;
  const hx1 = startX + delta;
  const hy1 = y1;
  const hx2 = endX - delta;
  const hy2 = endY;

  const pathEndX = startX < endX ? (endX - 10) : (endX + cardShape.width);
  const pathEndY = endY + 90;

  const path = `M ${startX} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${pathEndX} ${pathEndY}`;

  return { path, id: targetId };
}
