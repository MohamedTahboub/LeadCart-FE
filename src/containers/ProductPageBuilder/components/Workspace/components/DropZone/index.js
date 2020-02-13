import React, { useState } from 'react';
import common from 'components/common';
import './style.css';
import clx from 'classnames';
import { useContext } from '../../../../actions';
const {
  Button,
  FlexBox,

} = common;

export default ({
  children,
  onSectionDropped
}) => {
  const [dragOver, setDragOver] = useState(false);
  const { state: { modals = {} }, actions } = useContext();


  const onDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const sectionType = e.dataTransfer.getData('section-item');
    // e.currentTarget.style.background = 'lightyellow';
    actions.addNewSection(sectionType);
  };

  const className = clx({
    'product-drop-zone': true,
    'drag-over': dragOver
  });

  return (
    <div
      className={className}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
};
