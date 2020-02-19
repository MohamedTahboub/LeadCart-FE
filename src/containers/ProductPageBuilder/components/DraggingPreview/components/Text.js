import React from 'react';
import { DragPreviewImage } from 'react-dnd';
import textImage from 'assets/images/previews/text-section.png';
import exampleSrc from 'assets/images/previews/sticky-note-icon.png';

export default ({ connect }) => (
  <DragPreviewImage connect={connect} src={exampleSrc} />
);
