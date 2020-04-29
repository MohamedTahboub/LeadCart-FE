export const extractProductsRelations = ({ products = [] }) => {
  const productsObj = products.reduce((bulk, product) => {
    if (!product.productId) return bulk;
    if (!(Array.isArray(product.relations) && product.relations.length)) return bulk;

    let proRel = {};
    product.relations.map((relation) => {
      const associatedWithProduct = products.find(({ elementId }) => elementId === relation.target);

      if (associatedWithProduct) proRel = { ...proRel, [relation.type]: associatedWithProduct.productId };

      return undefined;
    });

    if (bulk[product.productId]) bulk[product.productId] = { ...bulk[product.productId], ...proRel };
    else bulk[product.productId] = proRel;

    return bulk;
  }, {});

  const result = {};
  Object.keys(productsObj).map((key) => {
    if (Object.keys(productsObj[key]).length) result[key] = productsObj[key];

    return undefined;
  });


  return result;
};


export const getStartPointProduct = (funnel) => {
  const funnelCheckoutProduct = funnel.products.find(({ category = '' }) => category.toLowerCase() === 'checkout');

  return funnelCheckoutProduct?.productId;
};
