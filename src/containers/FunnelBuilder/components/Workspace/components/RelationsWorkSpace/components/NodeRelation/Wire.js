import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { getPathCoords, getStartCircleCoords } from './helpers';

export const StartCircle = ({ x, y, color = '#4DA1FF' }) => {
  return (
    <circle
      className='start-circle'
      cx={x}
      cy={y}
      r='5'
      fill={color}
    />
  );
};

export const ThreadPath = ({ id, start, end, withoutShift }) => {

  const pathString = getPathCoords(start, end, withoutShift);

  return (
    <path
      id={`path_${id}`}
      key={id}
      d={pathString}
      fill='none'
      stroke='#03a9f4d4'
      strokeWidth='1.5'
      markerEnd={`url(#arrowHead_${id})`}
    />
  );
};

export const Marker = ({ id }) => {
  return (
    <defs>
      <marker
        key={id}
        id={`arrowHead_${id}`}
        viewBox='0 0 10 10'
        refX='1'
        refY='5'
        markerUnits='strokeWidth'
        markerWidth='10'
        markerHeight='10'
        orient='auto'
      >
        <path d='M 0 0 L 10 5 L 0 10 z' fill='#4DA1FF' strokeWidth='1' />
      </marker>
    </defs>
  );
};

const Wire = ({ id, position, relation }) => {

  const startPoint = getStartCircleCoords(position);

  return (
    <Fragment>
      <Marker id={id} />
      <ThreadPath id={id} end={relation.coordinates} start={startPoint} />
      <StartCircle {...startPoint} />
    </Fragment>
  );
};

Wire.propTypes = {};

export default Wire;

