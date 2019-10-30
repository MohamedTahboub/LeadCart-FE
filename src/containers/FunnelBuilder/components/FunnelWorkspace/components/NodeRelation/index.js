import React, { useState, useRef, Fragment } from 'react';

import findAbsolutePosition from '../helpers/findAbsolutePosition';


import './style.css';

export default (props) => {
  // const [position, setPosition] = React.useState({
  //     x: 10,
  //     y: 10,
  //     coords: {}
  // });

  // const onMouseDown = e => {
  //     e.stopPropagation();
  //     e.preventDefault();
  //     // Save the values of pageX and pageY and use it within setPosition.
  //     const pageX = e.pageX;
  //     const pageY = e.pageY;
  //     setPosition(position => ({
  //         ...position,
  //         coords: {
  //             x: pageX,
  //             y: pageY
  //         }
  //     }));
  //     document.addEventListener("mousemove", onMouseMove.current);
  //     document.addEventListener("mouseup", onMouseUp, true);
  // };

  // const onMouseMove = React.useRef(e => {
  //     setPosition(position => {
  //         const xDiff = position.coords.x - e.pageX;
  //         const yDiff = position.coords.y - e.pageY;
  //         return {
  //             x: position.x - xDiff,
  //             y: position.y - yDiff,
  //             coords: {
  //                 x: e.pageX,
  //                 y: e.pageY
  //             }
  //         };
  //     });
  // });

  // const onMouseUp = () => {
  //     document.removeEventListener("mousemove", onMouseMove.current);
  //     // Use Object.assign to do a shallow merge so as not to
  //     // totally overwrite the other values in state.
  //     setPosition(position => ({
  //         ...position,
  //         coords: {}
  //     }));
  //     document.removeEventListener("mouseup", onMouseUp, true);
  // };

  // x1 y1 x2 y2 , svgWidth(x1+x2) , svgHeight(y1+y2)

  // const {
  //   x1, x2, y1, y2
  // } = calcCoordinates(props);

  const { x1, y1 } = props.from;
  const { x2, y2 } = props.to;

  const pathCoords = getPathCoords({
    x1, x2, y1: y1 - 41, y2: y2 - 41, tension: 0.35
  });
  return (
    <Fragment>
      <path
        d={pathCoords}
        fill='none'
        stroke='#03a9f4d4'
        strokeWidth='1.5'
        markerEnd='url(#triangle)'
      />
      <circle
        className='start' cx={x1} cy={y1 - 41} r='5'
        fill='#4DA1FF'
      />
      <defs>
        <marker
          id='triangle' viewBox='0 0 10 10'
          refX='1' refY='5'
          markerUnits='strokeWidth'
          markerWidth='10' markerHeight='10'
          orient='auto'
        >
          <path d='M 0 0 L 10 5 L 0 10 z' fill='#4DA1FF' strokeWidth='1' />
        </marker>
      </defs>

    </Fragment>
  );
};


function getPathCoords ({
  x1, x2, y1, y2, tension
}) {
  const delta = (x2 - x1) * tension;
  const hx1 = x1 + delta;
  const hy1 = y1;
  const hx2 = x2 - delta;
  const hy2 = y2;
  const path = `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${x2} ${y2}`;

  return path;
}

function calcCoordinates ({ currentId, targetId }) {
  console.log(targetId, currentId);
  const left = document.getElementById(currentId);
  const right = document.getElementById(targetId);


  if (!(left && right)) return;

  const leftPos = findAbsolutePosition(left);
  let x1 = leftPos.x;
  let y1 = leftPos.y;
  x1 += left.offsetWidth;
  y1 += left.offsetHeight / 2;

  const rightPos = findAbsolutePosition(right);
  const x2 = rightPos.x;
  let y2 = rightPos.y;
  y2 += right.offsetHeight / 2;

  const width = x2 - x1;
  const height = y2 - y1;

  return {
    x1,
    x2,
    y1,
    y2,
    svgWidth: width,
    svgHeight: height
  };
}

