import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Badge from './index';

test('Test The Badge component from the common', () => {
  const { getByTestId, getByText } = render(<Badge>Text for test</Badge>);

  getByText(/Text for test/i);
  expect(getByTestId('badge-test').firstChild.classList).toBeFalsy();
  expect(getByTestId('badge-test').classList).toBeTruthy();
  expect(getByTestId('badge-test').firstChild).toBeTruthy();
});
