import { API_REQUEST, TOGGLE_LOADING } from 'constantsTypes';
import apiRequest from './helpers/apiRequest';

export default ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type !== API_REQUEST) return next(action);
  dispatch({ type: TOGGLE_LOADING });
  const { options, onSuccess, onFaild } = action.payload;
  try {
    const { user: { user: { token } } } = getState();

    const { success, message, data } = await apiRequest({ token, ...options });

    dispatch({ type: TOGGLE_LOADING });
    if (success) dispatch(onSuccess(data));
    else dispatch(onFaild(message));
  } catch (e) {
    dispatch({ type: TOGGLE_LOADING });

    dispatch(onFaild('Something gone wrong,please try again later '));
  }
};
