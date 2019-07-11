'strict mode';

const handleClosing = (e) => {
  // Cancel the event
  e.preventDefault();
  // Chrome requires returnValue to be set
  e.returnValue = '';
};


export default (stop) => {
  if (stop) window.addEventListener('beforeunload', handleClosing, true);
  else window.removeEventListener('beforeunload', handleClosing, true);
};

