
let isVisible = false;


export const showIntercomIcon = (show = false) => {
  const Intercom = window.Intercom;

  if (Intercom) if (isVisible !== show) isVisible = show;

  Intercom && Intercom('update', { hide_default_launcher: !isVisible });
};
