import React, { Fragment } from 'react';
import common from 'components/common';
import { IntegrationsGrid, IntegrationsTable } from './components';
const { LayoutSwitch, MainTitle } = common;

const getCategories = (list = []) => {
  const categories = list.reduce((cat, service) => {
    if (Array.isArray(cat[service.category])) cat[service.category].push(service);
    else cat[service.category] = [service];
    return cat;
  }, {});

  return Object.entries(categories);
};


const CategoryItems = ({ layout, ...props }) => {

  return (
    <LayoutSwitch active={layout}>
      <IntegrationsGrid id='grid' {...props} />
      <IntegrationsTable id='list' {...props} showHeader={!IntegrationsLayout} />
    </LayoutSwitch>
  );
};
const IntegrationsLayout = ({ layout, list, ...props }) => {
  const categories = getCategories(list);

  return categories
    .map(([title, list]) => (
      <Fragment>
        <MainTitle className='integration-category-title capitalized-text'>{title}</MainTitle>
        <CategoryItems layout={layout} list={list} {...props} />
      </Fragment>
    ));
};

IntegrationsLayout.propTypes = {};

export default IntegrationsLayout;
