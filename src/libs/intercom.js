
let isVisible = false;
export const showIntercomIcon = (show = false) => {
  const Intercom = window.Intercom;

  console.log('isVisible ', isVisible);
  console.log('show ', show);
  if (Intercom) {
    if (isVisible !== show)
      isVisible = show;

    Intercom('update', { hide_default_launcher: !isVisible });
  }
};

