import React, { Fragment } from 'react';
import { TemplateCard } from 'components/common/Cards';
import templatesDataList from 'data/productsTemplates';

const PagesTemplates = ({ onSelect, selected, cardClassName }) => (
  <Fragment>
    {templatesDataList.map((template) => (
      <TemplateCard
        key={template.id}
        {...template}
        className={cardClassName}
        onClick={onSelect(template.id, template.body)}
        active={selected === template.id}
      />
    ))}
  </Fragment>
);

PagesTemplates.propTypes = {};

export default PagesTemplates;
