import config from 'config';
import LogRocket from 'logrocket';
const { logRocketId } = config;

if (process.env.NODE_ENV !== 'development') LogRocket.init(logRocketId);


export const onLogin = ({ token, ...eventData }) => {
  const {
    id,
    firstName,
    lastName,
    email,
  } = eventData;
  const name = `${firstName} ${lastName}`;

  LogRocket.identify(id, {
    name,
    email,
    ...eventData
  });
};
