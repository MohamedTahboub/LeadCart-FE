

export default (actions, hook) => {
  const connectedActions = {};
  Object.keys(actions).forEach((actionKey) => {
    connectedActions[actionKey] = actions[actionKey](hook);
  });
  return connectedActions;
};
