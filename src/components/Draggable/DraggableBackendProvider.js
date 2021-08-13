import React from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
const DraggableBackend = ({ children, ...props }) => {
  return <DndProvider backend={Backend} {...props}>{children}</DndProvider>;
};

export default DraggableBackend;
