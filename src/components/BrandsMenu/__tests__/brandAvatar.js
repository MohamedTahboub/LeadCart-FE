import React from 'react';
import { render } from '../../TestUtils';
import '@testing-library/jest-dom';

import BrandsMenu from '..';

test('Test the render BrandsMenu component', () => {
  const brands = [{
    activePackage: { type: 'Pro', period: 'Monthly' },
    id: '5ea8b41fd9bc62002360c32d',
    logo: 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5cc123168001ea7df2cc1dcf/products/,brand-default-logo.png',
    name: 'Name',
    subDomain: 'SubDomain',
    transactions: [],
    trial: true
  }];

  const { getByText, getByTestId } = render(<BrandsMenu
    brands={brands}
    activeBrand={brands[0].id}
    onChange={() => {
      console.log(brands[0].id);
    }}
  />);

  expect(getByText(/name/i)).toBeInTheDocument();
  expect(getByTestId(/brands-menu/i).classList.contains('brands-menu')).toBe(true);
});

