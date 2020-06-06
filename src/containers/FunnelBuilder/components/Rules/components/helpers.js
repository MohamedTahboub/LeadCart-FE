
import rulesEvents from 'data/rulesEvents';

const getProductsAndOffer = (productsMap, neededProductNodes) => {
  return neededProductNodes.map(({ productId }) => productsMap[productId] || {})
    .filter((product) => Object.keys(product).length)
    .map((product) => {
      let offers = [];
      if (Array.isArray(product.sections)) {
        offers = product.sections
          .filter(({ type }) => type === 'bumpOffer')
          .filter((offer) => offer.content && offer.content.price)
          .map(({ id, content = {} }) => ({ _id: id, name: `${content.name || 'Untitled'}(offer)` }));
      }

      return [product, ...offers];
    })
    .flat();
};
export const constructProductsAndOffersLabels = (productsMap = {}, funnelProducts = []) => {
  return getProductsAndOffer(productsMap, funnelProducts)
    .map(({ _id: value, name: label }) => ({ label, value }));
};

export const getIntersectedProducts = (productsMap = {}, products = []) => {
  const matchedProducts = getProductsAndOffer(productsMap, products.map((id) => ({ productId: id })));

  return matchedProducts.filter((product) => products.includes(product._id));

};

export const getTriggerLabel = (val) => {
  const [{ label = 'Does Not Exist Event' } = {}] = rulesEvents.filter((r) => r.value === val);
  return label;
};
