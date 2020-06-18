import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

let action = null;
const registerAction = (_action) => {
  action = _action;
};
history.listen((location) => {
  if (action) action(location);
});

export const withHistoryListener = (Component) => (props) => (
  <Component {...props} registerHistoryListener={registerAction}/>
);
