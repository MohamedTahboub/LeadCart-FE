import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../actions';

import {
  OneColumnLayout,
  TwoColumnLayout
} from './components';

const { LayoutSwitch } = common;

const FIRST_COLUMN_NAME = 'first-column';
const FIRST_PAGE_LAYOUT_COLUMN_NAME = 'one-column';
const SECOND_PAGE_LAYOUT_COLUMN_NAME = 'two-column';

const validColumnNames = ['first-column', 'second-column'];

const ProductLayout = ({ layout, sections, ...props }) => {
  const { state: { product: { pageStyles: { productPage: productPageStyles = {} } = {} } = {} } } = useContext();

  const pageSections = sections.map((section) => {
    return {
      ...section,
      parentZone: validColumnNames.includes(section.parentZone) ? section.parentZone : FIRST_COLUMN_NAME
    };
  });

  const passedProps = {
    sections: pageSections,
    ...props
  };

  return (
    <LayoutSwitch active={layout}>
      <OneColumnLayout id={FIRST_PAGE_LAYOUT_COLUMN_NAME} {...passedProps} styles={productPageStyles} />
      <TwoColumnLayout id={SECOND_PAGE_LAYOUT_COLUMN_NAME} {...passedProps} styles={productPageStyles} />
    </LayoutSwitch>
  );
};

ProductLayout.defaultProps = { layout: 'one-column', sections: [] };

export default ProductLayout;
