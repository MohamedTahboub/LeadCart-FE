
export default () => (next) => (action) => {
  try {
    if (window.mixpanel) window.mixpanel.track(action.type.toString(), action.payload);
    else console.log(' window.mixpanel is not defined');
  } catch (error) {
    console.log(error.message, error);
  }

  next(action);
};

