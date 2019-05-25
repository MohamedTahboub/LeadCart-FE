

export const showIntercomIcon = (show) => {
  const Intercom = window.Intercom;


  if (Intercom)
    Intercom('update', { hide_default_launcher: !show });
};

