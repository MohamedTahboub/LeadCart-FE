import React from 'react';

import { TemplateCard } from './components';
import { productTemplates } from 'data/productTemplates';
import './style.css';

const Templates = () => {
  return (
    <div className='templates'>
      {productTemplates.map((ele) => (
        <TemplateCard
          key={ele.id}
          {...ele}
        />
      ))}
    </div>
  );
};

export default Templates;
