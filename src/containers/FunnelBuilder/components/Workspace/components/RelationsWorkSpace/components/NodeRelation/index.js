import React, { Fragment } from 'react';

// import findAbsolutePosition from '../helpers/findAbsolutePosition';

import Wire from './Wire';

import './style.css';

export default ({
  onDelete,
  coordinates,
  relations = []
}) => {
  return (
    relations.map((relation, id) => (
      <Wire
        id={relation.target}
        position={coordinates}
        relation={relation}
        onDelete={onDelete}
      />))
  );

};

