import React from 'react';
import { render } from 'components/TestUtils';
import Login from './index';
import '@testing-library/jest-dom/extend-expect';


test('Test for the login Page', () => {
  const { getAllByText, getByTestId } = render(<Login />);
  getAllByText(/sign in/i);
  getAllByText(/email address/i);
  getAllByText(/all rights reserved/i); //for the Footer
  expect(getByTestId('submit')).toHaveTextContent('Sign in');
});

