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

  const {
    x1, x2, y1, y2
  } = calcCoordinates(props);

  return (
    <Fragment>
      <path d={`M ${x1} ${y1} C 0 0 0 0 ${x2} ${y2}`} fill='none' stroke='#456' />
      <circle
        className='start' cx={x1} cy={y1} r='5'
        fill='red'
      />
      <circle
        // onMouseDown={onMouseDown}
        // onMouseUp={onMouseUp}
        className='end'
        cx={x2}
        cy={y2}
        r='5'
        fill='blue'
      />
    </Fragment>
  );
};

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
