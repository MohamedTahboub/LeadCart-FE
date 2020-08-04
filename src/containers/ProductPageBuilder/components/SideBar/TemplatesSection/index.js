import React, { useState } from 'react';

import { TemplateCard } from './components';
import { productTemplates } from 'data/productTemplates';
import './style.css';

const Templates = () => {
  const [active, setActive] = useState('title');

  return (
    <div className='templates'>
      {productTemplates.map((ele) => (
        <TemplateCard
          key={ele.id}
          active={active}
          setActive={setActive}
          {...ele}
        />
      ))}
    </div>
  );
};

export default Templates;
