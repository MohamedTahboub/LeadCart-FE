import config from 'config';
import LogRocket from 'logrocket';
const { logRocketId } = config;

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENV === 'development';
const isTesting = process.env.NODE_ENV === 'test';

if (!isDevelopment && !isTesting)
  LogRocket.init(logRocketId);


export const onLogin = ({ token, ...eventData }) => {
  const {
    id,
    firstName,
    lastName,
    email
  } = eventData;
  const name = `${firstName} ${lastName}`;

  LogRocket.identify(id, {
    name,
    email,
    ...eventData
  });
};
