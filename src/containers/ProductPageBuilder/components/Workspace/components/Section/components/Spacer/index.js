import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import QuillEditor from 'components/QuillEditor';
import common from 'components/common';
import clx from 'classnames';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import { Rnd as Flexible } from 'react-rnd';
import { useContext } from '../../../../../../actions';

import './style.css';

const {
  Button,
  EditableField,
  FlexBox
} = common;

// value={pagePreferences.description}
// onEdit={onEdit}

const Spacer = ({
  value,
  onUpdateDragging,
  section = {},
  ...props
}) => {
  const elementRef = useRef(null);
  const { actions = {} } = useContext();
  const { content = {}, styles = {} } = section;
  const { alignment } = styles;
  // const
  const [size, setSize] = useState(styles);

  const onChange = ({ target: { value } }) => {
    const updatedSection = {
      ...section,
      content: {
        ...section.content,
        value
      }
    };
    if (props.onChange) return props.onChange(updatedSection);

    actions.updateProductSection(updatedSection);
  };

  // const style = {
  //   ...styles,
  //   height: `${height}px`,
  // };
  // const startResizing = (e) => {
  //   console.log('Start Resizing');
  //   window.document.addEventListener('mousemove', tracking, false);
  //   window.document.addEventListener('mouseup', stopResizing, true);
  // };

  // const stopResizing = () => {
  //   console.log('Stopped Resizing');
  //   window.document.removeEventListener('mousemove', tracking, false);
  //   window.document.removeEventListener('mouseup', stopResizing, true);
  // };

  // const tracking = (e) => {
  //   console.log('Mouse:', e.screenY);
  //   const { x, height: componentHeight } = ReactDOM.findDOMNode(elementRef.current).getBoundingClientRect();
  //   const offset = componentHeight + x;
  //   const height = e.screenY - offset;
  //   setTimeout(() => {
  //     setHeight(height);
  //   }, 1000 / 60);
  // };

  const onResize = (e, direction, ref, delta, position) => {
    onUpdateDragging(false);
    setSize({
      height: ref.style.height
    });
  };
  const onStopResizing = () => {
    onUpdateDragging(true);
  };
  return (
    <Flexible
      // className='banner-item-container'
      size={size}
      // position={state.position}
      onDragStop={onStopResizing}
      onResizeStop={onResize}
      // enableUserSelectHack={false}
      // style={style}
    />
  );
};

Spacer.propTypes = {

};

export default Spacer;


/**
 *
 *   <FlexBox
        {...props}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        draggable={false}
        className='relative-element'
        elementRef={elementRef}

      >
        <div
          onMouseDown={startResizing}
          draggable={false}
          className='spacer-resize-btn resize-down'
          role='presentation'
        >
          <FaArrowAltCircleDown />
        </div>
      </FlexBox>
 */
