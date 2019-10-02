import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Intercom from 'react-intercom';
import { connect } from 'react-redux';
import config from '../../config';


const { intercomAppId } = config;

const IntercomAPP = ({ user = {} }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    const ActiveUser = {
      user_id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`
    };
    setState(ActiveUser);
  }, [user]);


  return (<Intercom
    appID={intercomAppId}
    {...state}
  />
  );
};

IntercomAPP.propTypes = {

};


const mapStateToProps = ({ user: { user = {} } = {} }) => ({
  user
});
export default connect(mapStateToProps)(IntercomAPP);
