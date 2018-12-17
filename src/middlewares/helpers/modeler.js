
const modelFormatter = (obj, model = []) => {
  if (!obj) return obj;
  return model.reduce((out, key) => {
    if (typeof key === 'string') out[key] = obj[key];

    if (typeof key === 'object') out[key.value] = modelFormatter(obj[key.value], key.sub);
    return out;
  }, {});
};


export default modelFormatter;
