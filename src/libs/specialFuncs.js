import * as immutable from 'object-path-immutable';
import defaultLanguage from 'data/defaultLanguage.json';
import { md5 } from './encoding';
import jwt from 'jsonwebtoken';
import { getPriceFormat } from './currencies';
import countries from 'data/countries';


export const filterSubscriptions = (orders = []) => orders.filter(({ payment }) => payment.paymentType === 'Subscription');
export const filteringActivities = (orders) => ({
  orders: orders.sort(sortOrders),
  subscriptions: filterSubscriptions(orders)
});


export const filterCustomers = (orders = []) => {
  const customers = {};
  orders.map(({ customer, ...order }) => {
    if (!customers[customer.email]) customers[customer.email] = { ...customer, orders: [order] };
    else customers[customer.email].orders.push(order);
    return customer;
  });

  return Object
    .keys(customers)
    .map((key) => customers[key])
    .map((customer) => ({
      lifeTimeCharges: customer.orders.reduce((total, o) => {
        if (o.payment.paymentRefunded || o.payment.subscriptionCanceled) total -= o.product.price.amount;
        if (o.offerPaymentRefunded) total -= o.product.offer.price;
        return total + o.totalCharge;
      }, 0),
      ...customer
    }))
    .sort(sortCustomers);
};

function sortCustomers (customer1, customer2) {
  return customer1.orders[customer1.orders.length - 1].createdAt - customer2.orders[customer2.orders.length - 1].createdAt;
}

function sortOrders (o1, o2) {
  return (new Date(o2.createdAt) - new Date(o1.createdAt));
}


export const RoundTow = (number) => Math.round(number * 100) / 100;


export const injectDefaultLabels = (languages) => {
  const injectLabelForLanguage = (language) => {
    const contextsWithLabels = defaultLanguage.contexts.map((context) => {
      const matchContext = language.contexts.find(({ key }) => key === context.key);
      if (!matchContext) return context;

      const words = context.words.map((word) => {
        const matchedWord = matchContext.words.find(({ key }) => key === word.key);

        if (!matchedWord) return word;

        return { ...word, ...matchedWord };
      });

      return {
        ...context,
        words
      };
    });


    return {
      ...language,
      contexts: contextsWithLabels
    };
  };
  const labeledLanguages = languages.map(injectLabelForLanguage);

  return labeledLanguages;
};


export const trimExtraText = (text, maxLength) => {
  if (text.length > maxLength) return `${text.slice(0, maxLength)} . . .`;

  return text;
};

export const includesIgnoreCase = (parent = '', child = '') => parent.toLowerCase().includes(child.toLowerCase());

export const projectObjectProperties = (projection = {}) => (obj) => {
  const projectionKeys = Object.keys(projection);
  if (!projectionKeys.length) return obj;

  return projectionKeys.reduce((projected, objKey) => {
    return {
      ...projected,
      [projection[objKey]]: obj[objKey]
    };
  }, {});
};


export const mapListToObject = (list = [], fieldKey, projection) => list.reduce((map, item, index) => {
  // eslint-disable-next-line
  const mapIndex = fieldKey
    ? typeof item === 'object'
      ? item[fieldKey]
      : index
    : index;

  const abstracted = map[mapIndex] ? { ...map[mapIndex], ...item } : item;

  map[mapIndex] = projectObjectProperties(projection)(abstracted);
  return map;
}, {});


export const throttle = (execute, initialWatchedValue, interval) => {
  let previous = 0;
  let instants = 0;


  return {
    on: (data) => {
      if (previous !== data) {
        instants += 1;
        previous = data;
        setTimeout(
          () => {
            execute(data);
          },
          interval * instants
        );
      }
    }
  };
};


export const nestedKeyValue = (obj, propertyPath) => immutable.get(obj, propertyPath, false);


export const isObjectsEquivalent = (obj1, obj2) => {
  //Loop through properties in object 1
  for (const p in obj1) {
    //Check property exists on both objects
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (typeof (obj1[p])) {
    //Deep compare objects
    case 'object':
      if (!isObjectsEquivalent(obj1[p], obj2[p])) return false;
      break;
      //Compare function code
    case 'function':
      if (typeof (obj2[p]) == 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false;
      break;
      //Compare values
    default:
      if (obj1[p] !== obj2[p]) return false;
    }
  }

  //Check object 2 for any extra properties
  for (const p in obj2)
    if (typeof (obj1[p]) == 'undefined') return false;

  return true;
};

export const getBrandActivePackage = ({ activePackage = {}, level } = {}) => {
  if (level) {
    let type = 'Basic';
    if (level >= 2) type = 'Pro';
    if (level >= 4) type = 'Premium';
    return type;
  } else {
    return activePackage.type === 'Free' ? 'Free'
      : activePackage.type === 'Premium' ? 'Premium'
        : activePackage.type === 'Pro' ? 'Pro'
          : activePackage.type === 'Basic' ? 'Basic'
            : 'Sub';
  }
};


export const getGavatarByEmail = (email = '') => {
  return `https://www.gravatar.com/avatar/${md5(email)}`;
};

export const tokenizedContent = (content, secret) => {
  return jwt.sign(content, secret);
};


export const formatPricingValue = ({ amount, type, splits = 3, recurringPeriod = 'Month', currency, format }) => {
  const formattedAmount = getPriceFormat(amount, currency, format);
  if (type === 'Subscription') return `${formattedAmount} each ${recurringPeriod.toLocaleLowerCase()}`;
  if (type === 'Split') return `${splits}x${formattedAmount}`;
  return `${formattedAmount}`;
};

const countriesDictionary = mapListToObject(countries, 'code');
export const getCountryByCode = (code = '') => {
  const country = countriesDictionary[code] || '';
  if (!(country && country.name)) return '';

  return country.name;
};


export const ImageCache = {
  __cache: {},
  read (src) {
    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.src = src;
      }).then((img) => {
        this.__cache[src] = true;
      });
    }
    if (this.__cache[src] instanceof Promise)
      throw this.__cache[src];

    return this.__cache[src];
  }
};

export function nodeHasChildElement (parentNode, childNode) {
  if ('contains' in parentNode)
    return parentNode.contains(childNode);
  else
    return parentNode.compareDocumentPosition(childNode) % 16;
}


export const downloadFile = (url, fileName) => {
  const download = document.createElement('a');
  download.setAttribute('href', url);
  download.setAttribute('target', '_blank');
  download.setAttribute('download', fileName);
  download.click();
};

export const getPaymentStatusDetails = (status) => {
  const paymentStatusTypes = {
    succeeded: {
      tip: 'This payment is complete.',
      type: 'success'
    },
    processing: {
      tip: 'The customer\'s bank is processing this payment',
      type: 'normal'
    },
    pending: {
      tip: 'The customer\'s bank is processing this payment',
      type: 'normal'
    },
    failed: {
      tip: 'Payment Failed',
      type: 'warning'
    },
    incomplete: {
      tip: 'The customer has not completed the payment.',
      type: 'normal'
    },
    requires_payment_method: {
      tip: 'Customer’s payment failed on your checkout page',
      type: 'normal'
    },
    requires_action: {
      tip: 'Customer didn\'t Authenticate the payment or transaction',
      type: 'normal'
    },
    disputed: {
      tip: 'Your customer has filed a dispute',
      type: 'normal'
    }
  };

  const statusEnum = typeof status === 'string' ? status.toLocaleLowerCase() : status;

  return paymentStatusTypes[statusEnum] || {};
};

export const getAvailablePaymentMethods = (methods = [], paymentsSettings) => {
  const enabledPaymentMethods = [...methods];

  const { sepaEnabled, fpxEnabled } = paymentsSettings || {};
  if (!Array.isArray(methods)) return [];

  const isStripeEnabled = methods.includes('Stripe');

  if (sepaEnabled && isStripeEnabled)
    enabledPaymentMethods.push('SepaDirectDebt');
  if (fpxEnabled && isStripeEnabled)
    enabledPaymentMethods.push('StripeFPX');

  return enabledPaymentMethods;
};
export const loadFontLocally = async (font = {}) => {
  const { family, url } = font;
  if (!(family && url)) return;
  try {
    const modifiedUrl = url.includes('http://') ? url.replace('http://', '//') : url;
    const fontToLoad = new FontFace(family, `url(${modifiedUrl})`);
    await fontToLoad.load();
    window.document.fonts.add(fontToLoad);
  } catch (error) {
    console.error(error);
  }
};

export const loadFontsToDocument = async (fonts = []) => {
  const fontListToLoad = fonts.map(loadFontLocally);
  await Promise.all(fontListToLoad);
};

export const delayFor = (delayInterval, arg) =>
  new Promise((res) =>
    setTimeout(() =>
      res(arg), delayInterval));
