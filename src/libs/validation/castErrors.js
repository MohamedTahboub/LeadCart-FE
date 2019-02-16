
export default ({ inner = [] }) => {
  const Errors = {};
  if (inner.length) {
    inner.map((er) => {
      const name = er.path.split('.');

      // if (name.includes('[')) return;
      if (name.length === 1) Errors[name] = er.message;
      if (name.length === 2) {
        if (!Errors[name[0]]) Errors[name[0]] = {};
        Errors[name[0]] = { ...Errors[name[0]], [name[1]]: er.message };
      }
    });
    return Errors;
  }
};
