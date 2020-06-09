import React from 'react';
import { render as testRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'store';

const testingStore = store;
const render = (component, { store = testingStore } = {}) =>
  ({ ...testRender(<Provider store={store}>{component}</Provider>) });

export * from '@testing-library/react';
export default render;
