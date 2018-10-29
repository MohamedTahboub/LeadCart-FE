import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { appInit } from 'actions/appInit';

const ProtectedRoute = ({
  component: Component, isLoggedIn, appInit, user, ...props
}) => (
  <Route
    {...props} render={(props) => (
      isLoggedIn
        ? user.level !== 0 || true
          ? <Component {...props} />
          : <Redirect to='/promocode' />
        : <Redirect to='/login' />
    )}
  />
);


const mapStateToProps = ({ user: { user, isLoggedIn } }) => ({ user, isLoggedIn });

export default connect(mapStateToProps)(ProtectedRoute);
