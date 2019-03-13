

export const showIntercomIcon = (show) => {
  const Intercom = document.getElementById('intercom-container');

  if (Intercom) {
    if (show) Intercom.style.display = 'block';
    else Intercom.style.display = 'none';
  }
};

