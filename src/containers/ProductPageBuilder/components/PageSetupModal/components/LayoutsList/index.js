import React, { Fragment } from 'react';
import { TemplateCard } from 'components/common/Cards';
import oneColumnImage from 'assets/images/illustration/oneColumn.svg';
import twoColumnImage from 'assets/images/illustration/2Columns.svg';


export const layouts = [
  {
    name: 'One Column',
    image: oneColumnImage,
    id: 'one-column'
  },
  {
    name: 'Two Column',
    image: twoColumnImage,
    id: 'two-column'
  }
];

const PagesTemplates = ({ onSelect, selected }) => {

  return (
    <Fragment>
      {layouts.map((layout) => (
        <TemplateCard
          withNames
          key={layout.id}
          {...layout}
          onClick={onSelect(layout.id)}
          active={selected === layout.id}
        />
      ))}
    </Fragment>
  );
};

PagesTemplates.propTypes = {};

export default PagesTemplates;
