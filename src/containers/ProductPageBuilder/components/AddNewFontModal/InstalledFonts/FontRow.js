import React from 'react';

import { FontDemoCard } from '../components';
import './style.css';


const FontRow = ({ family, _id, isSelectedFont, onSelectFont, url }) => {

  return (
    <FontDemoCard
      font={{ family, url }}
      onClick={onSelectFont({ _id })}
      active={isSelectedFont(_id)}
      clickable
    />
  );
};

export default FontRow;
