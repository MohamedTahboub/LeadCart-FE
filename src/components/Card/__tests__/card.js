import React from 'react';
import { render } from '@testing-library/react';

import Card from '..';

test('handle title for the card component', () => {
  const { getByText } = render(<Card title='Title' />);
  expect(getByText('Title').classList.contains('card-header')).toBe(true);
});

test('handle children for the card component', () => {
  const { getByText } = render(<Card>card children</Card>);
  expect(getByText('card children').classList.contains('card-body')).toBe(true);
});

test('handle footer for the card component', () => {
  const { getByText } = render(<Card footer='Footer' />);
  expect(getByText('Footer').classList.contains('card-footer')).toBe(true);
});

