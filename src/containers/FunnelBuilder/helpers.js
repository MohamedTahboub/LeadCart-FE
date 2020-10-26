const importantProps = {
  currency: '',
  language: '',
  thankyouPage: '',
  url: '',
  category: '',
  elementId: '',
  relations: [],
  target: '',
  type: '',
  marketPlace: {},
  featured: false, publish: true, description: '',
  products: [],
  name: '',
  paymentMethods: [],
  productId: '',
  cardImages: ''
};


export const isFunnelBuilderChanged = (oldObj, newObj) => {
  const chekPropsWithRef = (oldObj, newObj) => {
    if (Array.isArray(oldObj) && oldObj.length === newObj.length) {
      const hasObjects = Boolean(oldObj.filter((ele) => typeof ele === 'object').length);
      if (hasObjects) {
        return Boolean(oldObj.find((ele, i) => isFunnelBuilderChanged(oldObj[i], newObj[i])));
      } else {
        const res = JSON.stringify(oldObj.sort()) !== JSON.stringify(newObj.sort());
        if (res) return true;
      }

    } else if (Array.isArray(oldObj) && oldObj.length !== newObj.length) {
      return true;
    } else {
      return isFunnelBuilderChanged(oldObj, newObj);
    }
  };


  for (const prop in newObj)
    if (!oldObj.hasOwnProperty(prop) && Boolean(newObj[prop])) return true;

  for (const prop in oldObj) {
    if (importantProps.hasOwnProperty(prop)) {
      if (typeof oldObj[prop] === 'object' && oldObj[prop] !== null) {
        if (chekPropsWithRef(oldObj[prop], newObj[prop]))
          return chekPropsWithRef(oldObj[prop], newObj[prop]);

      } else if (!Object.is(oldObj[prop], newObj[prop])) {
        return true;
      }
    }
  }


  return false;
};
