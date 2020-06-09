import React from 'react';
import { render } from '@testing-library/react';

import Card from './index';

test('The card doesn\'t have a title', () => {
  const { getByText } = render(<Card title='Title' />);
  expect(getByText('Title').classList.contains('card-header')).toBe(true);
});

test('The card doesn\'t have a children', () => {
  const { getByText } = render(<Card>card children</Card>);
  expect(getByText('card children').classList.contains('card-body')).toBe(true);
});

test('The card doesn\'t have a footer', () => {
  const { getByText } = render(<Card footer='Footer' />);
  expect(getByText('Footer').classList.contains('card-footer')).toBe(true);
});

