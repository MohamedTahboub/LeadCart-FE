import React from 'react';
import { render } from 'components/TestUtils';
import Login from '..';
import '@testing-library/jest-dom/extend-expect';//
import * as testHelpers from 'helpers/test';
import { fireEvent, screen, waitFor, waitForDomChange } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import * as loginActions from 'actions/login';
testHelpers.serverInit();

const mockStore = configureStore({ user: {} });
const initialStoreState = { user: {}, validation: {} };


test('Render Login Container', () => {
  const { getByTestId } = render(<Login />);
  expect(getByTestId('login-form')).toBeInTheDocument();
});


test('Login Action called Correctly when the form submitted', async () => {
  const localStore = mockStore(initialStoreState);
  localStore.dispatch = jest.fn();

  render(<Login />, { store: localStore });

  const user = {
    email: 'fares@leadcart.io',
    password: '123456'
  };

  fireEvent.change(screen.getByTestId('email'), { target: { value: user.email } });

  fireEvent.change(screen.getByTestId('password'), { target: { value: user.password } });

  fireEvent.click(screen.getByTestId('submit'));
  expect(localStore.dispatch).toHaveBeenCalledTimes(1);
  expect(localStore.dispatch).toHaveBeenCalledWith(loginActions.login(user));
});


test('Redirects the user if already logged in', async () => {
  const localStore = mockStore({ ...initialStoreState, user: { isLoggedIn: true } });
  const historyPush = jest.fn();

  render(<Login history={{ push: historyPush }} />, { store: localStore });


  expect(historyPush).toHaveBeenCalledTimes(1);
  expect(historyPush).toHaveBeenCalledWith('/');
});
