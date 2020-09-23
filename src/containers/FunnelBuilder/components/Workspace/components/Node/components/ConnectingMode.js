import React, { useRef, useState } from 'react';
import { ThreadPath } from '../../RelationsWorkSpace/components/NodeRelation/Wire';
import { FiPlus } from 'react-icons/fi';

const cardShape = {
  height: 180,
  width: 120,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 15,
  marginRight: 15
};


const ConnectingMode = ({ connecting, coords = {} }) => {
  const elementRef = useRef(null);
  const [position, setPosition] = useState({});

  const onStartConnecting = (e) => {
    e.preventDefault();
    e.stopPropagation();

    window.document.addEventListener('mousemove', tracking, true);
    window.document.addEventListener('mouseup', onStopMoving, true);
  };

  const onStopMoving = (e) => {
    window.document.removeEventListener('mousemove', tracking, true);
    window.document.removeEventListener('mouseup', onStopMoving, true);
  };

  const getCurrentPosition = (e) => {
    const { pageX: x, pageY: y } = e;
    return { x, y: y - 50 };
  };
  const tracking = (e) => {
    setPosition(getCurrentPosition(e));
  };

  // const getRect = useCallback(() => {
  //   if (elementRef)
  //     return elementRef.current.getBoundingClientRect();
  //   else return {};
  //   //eslint-disable-next-line
  // }, [coords]);


  const { pathStart } = getPointsCoords(coords);

  return (
    <div className='connect-node-assets' draggable>
      {connecting && (
        <svg
          className='node-dynamic-relation-space'
          width='100%'
          height='100%'
        >
          <ThreadPath
            start={pathStart}
            end={position}
            withoutShift
          />
        </svg>
      )
      }
      <div
        style={{
          left: pathStart.x,
          top: pathStart.y,
          zIndex: 101
        }}
        className='grab-handle'
        draggable
        onMouseDown={onStartConnecting}
        ref={elementRef}
      >
        <FiPlus className='white-text larger-text' />
      </div>
    </div>
  );
};

ConnectingMode.propTypes = {};

export default ConnectingMode;


function getPointsCoords (coords) {

  const xOffset = cardShape.width + 5;
  const yOffset = cardShape.height / 2 - cardShape.marginTop;
  const { x, y } = coords;

  const pathStart = { x: x + xOffset, y: y + yOffset };
  const pathEnd = {
    coordinates: {
      x: pathStart.x + 20,
      y: pathStart.y
    }
  };
  return {
    pathStart,
    pathEnd
  };
}
