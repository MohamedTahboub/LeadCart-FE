import React from 'react';
import { render as testRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'store';

const testingStore = store;

const render = (component, { store = testingStore, ...renderOptions } = {}) => {
  const Wrapper = ({ children }) =>
    (<Provider store={store}>{children}</Provider>);

  return testRender(component, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
