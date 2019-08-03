import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component, isLoggedIn, user, ...props
}) => (
  <Route
    {...props}
    render={(props) => (
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
