import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import Intercom from 'react-intercom';
import { connect } from 'react-redux';
import config from '../../config';


const { intercomAppId } = config;

const checkIfUserHasSupportEnabled = (brands = [], { activeBrand }) => {
  const { type = 'Admin' } = brands.find(({ id }) => id === activeBrand) || {};
  return type === 'Admin';
};

const IntercomAPP = ({ user = {}, brands }) => {
  const [state, setState] = useState({});

  const hasSupport = checkIfUserHasSupportEnabled(brands, user);

  useEffect(() => {
    const ActiveUser = {
      user_id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`
    };
    setState(ActiveUser);
  }, [user]);

  if (!hasSupport) return null;

  return (
    <Intercom
      appID={intercomAppId}
      {...state}
    />
  );
};

IntercomAPP.propTypes = {};


const mapStateToProps = ({ user: { user = {} } = {}, brands = [] }) => ({ user, brands });
export default connect(mapStateToProps)(IntercomAPP);
