import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Badge from '..';

afterEach(cleanup);

test('Render Badge Component', () => {
  const text = 'sample text';
  const { getByTestId } = render(<Badge >{text}</Badge>);
  expect(getByTestId('badge-test')).toBeInTheDocument();
});

test('Badge should render passed children', () => {
  const text = 'sample text';
  const { getByTestId } = render(<Badge >{text}</Badge>);
  expect(getByTestId('badge-test').textContent).toEqual(text);
});

test('Badge must be green when the type is succuss', () => {
  const text = 'sample text';
  const { getByTestId } = render(<Badge type='success'>{text}</Badge>);

  expect(getByTestId('badge-test').textContent).toEqual(text);
  expect(getByTestId('badge-test')).toHaveClass('success');
});

test('Badge must have the className when passed', () => {
  const className = 'sampleClass';

  const { getByTestId } = render(<Badge className={className}>{className}</Badge>);
  expect(getByTestId('badge-test')).toHaveClass(className);
});

