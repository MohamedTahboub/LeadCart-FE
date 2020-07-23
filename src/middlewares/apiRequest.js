import { API_REQUEST, END_LOADING, START_LOADING } from 'constantsTypes';
import apiRequest from './helpers/apiRequest';

export default ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type !== API_REQUEST) return next(action);

  dispatch({ type: START_LOADING });

  const { options, onSuccess, onFailed } = action.payload;

  try {
    const { user: { user: { token } } } = getState();

    const { success, message, data } = await apiRequest({ token, ...options });

    dispatch({ type: END_LOADING });
    if (success) dispatch(onSuccess(data));
    else dispatch(onFailed(message));
  } catch (e) {
    dispatch({ type: END_LOADING });
    dispatch(onFailed(`Something gone wrong,please try again later ${e.message}`));
  }
};
