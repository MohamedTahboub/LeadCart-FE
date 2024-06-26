import { mapListToObject } from 'libs';
import rulesEvents from 'data/rulesEvents';
const subscriptionEvents = ['SUBSCRIPTION_CANCELLED', 'SUBSCRIPTION_PAYMENT_FAILED'];

const getProductsAndOffer = (productsMap, neededProductNodes) => {
  return neededProductNodes.map(({ productId }) => productsMap[productId] || {})
    .filter((product) => Object.keys(product).length)
    .map((product) => {
      let offers = [];
      if (Array.isArray(product.sections)) {
        offers = product.sections
          .filter(({ type }) => type === 'bumpOffer')
          .filter((offer) => offer.content && offer.content.price)
          .map(({ id, _id = id, content = {} }) => ({ _id, name: `${content.name || 'Untitled'}(offer)` }));
      }

      return [product, ...offers];
    })
    .flat();
};
export const constructProductsAndOffersLabels = (productsMap = {}, funnelProducts = []) => {
  return getProductsAndOffer(productsMap, funnelProducts)
    .filter(({ category }) => category ? category !== 'thankyoupage' : true)
    .map(({ _id: value, name: label }) => ({ label, value }));
};

export const getIntersectedProducts = (productsMap = {}, products = []) => {
  const productsAndOffers = Object.values(productsMap)
    .map((product) => {
      let offers = [];
      if (Array.isArray(product.sections)) {
        offers = product.sections
          .filter(({ type }) => type === 'bumpOffer')
          .filter((offer) => offer.content && offer.content.price)
          .map(({ id, _id = id, content = {} }) => ({ _id, name: `${content.name || 'Untitled'}(offer)` }));
      }

      return [product, ...offers];
    })
    .flat();

  const productsAndOffersMap = mapListToObject(productsAndOffers, '_id');
  const matchedProducts = getProductsAndOffer(productsAndOffersMap, products.map((id) => ({ productId: id })));

  const matched = matchedProducts.filter((product) => products.includes(product._id));

  return Object.values(mapListToObject(matched, '_id'));

};

export const getTriggerLabel = (val) => {
  const [{ label = 'Does Not Exist Event' } = {}] = rulesEvents.filter((r) => r.value === val);
  return label;
};


export const getProductsPricingOptions = (products = [], globalProductsMap = {}) => {
  return products
    .map((p) => p.value ? globalProductsMap[p.value] : globalProductsMap[p])
    .filter((product = {}) => (Array.isArray(product.pricingOptions) && product.pricingOptions.length))
    .map((product) => product.pricingOptions)
    .flat()
    .map(({ label, id: value }) => ({ label, value }));
};

export const getAvailablePricingOptionsDetails = (pricingOptions = [], productsIds, productsMap) => {
  return getProductsPricingOptions(productsIds, productsMap)
    .filter((option) => pricingOptions.includes(option.value));
};

export const hasWebhook = (triggerGroups = []) => {
  return Boolean(triggerGroups.find(({ action = {} }) => action.type === 'WEBHOOKS'));
};

export const updateWithWebhookDefault = (rule = {}) => {
  return {
    ...rule,
    triggerGroups: rule.triggerGroups.map((triggerGroup) => {
      if (triggerGroup?.action?.type === 'WEBHOOKS') {
        return {
          ...triggerGroup,
          action: {
            ...triggerGroup?.action,
            metaData: {
              ...triggerGroup?.action?.metaData,
              payloadFormat: triggerGroup?.action?.metaData?.payloadFormat || 'JSON'
            }
          }
        };
      }
      return triggerGroup;
    })
  };
};

export const filterProperEvents = (allEvents, { isOptInFunnel, isSubscriptionCheckout } = {}) => {
  let events = allEvents.filter(({ value }) => (isOptInFunnel ? value === 'LEAD_CAPTURE' : value !== 'LEAD_CAPTURE'));

  if (!isSubscriptionCheckout)
    events = events.filter(({ value }) => !(subscriptionEvents.includes(value)));

  return events;
};
