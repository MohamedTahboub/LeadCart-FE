import React, { useState } from 'react';
import common from 'components/common';
import './style.css';
import clx from 'classnames';
import { useDrop } from 'react-dnd';
// import { useContext } from '../../../../actions';
import * as dropTypes from '../dropTypes';

const {
  Button,
  FlexBox,

} = common;

export default ({
  children,
  onDrop,
  ...props
}) => {
  const [collectedProps, drop] = useDrop({
    accept: dropTypes.SECTION,
    drop: onDrop
  });


  // const onDragOver = (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  // };

  // const onDrop = (e) => {
  //   e.preventDefault();
  //   const sectionType = e.dataTransfer.getData('section-item');
  //   // e.currentTarget.style.background = 'lightyellow';
  //   actions.addNewSection(sectionType);
  // };

  const className = clx({
    'product-drop-zone': true,
    // 'drag-over': dragOver
  });

  return (
    <div
      className={className}
      // onDragOver={onDragOver}
      // onDrop={onDrop}
      ref={drop}
    >
      {children}
    </div>
  );
};
