import React from 'react';
import { render } from '../../../TestUtils';
import store from '../../../../store';
import '@testing-library/jest-dom';

import Avatar from '..';

test('Test the Avatar component from the common component', () => {
  const { getByTestId } = render(<Avatar />, { store });
  expect(getByTestId('avatar-layer')).toBeInTheDocument();
});
