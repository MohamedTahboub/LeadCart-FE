import React from 'react';
import Wire from './Wire';

import './style.css';

export default ({
  onDelete,
  coordinates,
  relations = []
}) => {
  return (
    relations.map((relation) => (
      <Wire
        id={relation.target}
        position={coordinates}
        relation={relation}
        onDelete={onDelete}
      />))
  );

};

