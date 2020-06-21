
import * as immutable from 'object-path-immutable';
import defaultLanguage from 'data/defaultLanguage.json';
import { md5 } from './encoding';
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


        total += o.totalCharge;
        return total;
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
    const contextsWithLabels = language.contexts.map((context) => {
      const matchContext = defaultLanguage.contexts.find(({ key }) => key === context.key);
      if (!matchContext) return context;

      const words = context.words.map((word) => {
        const matchedWord = matchContext.words.find(({ key }) => key === word.key);

        if (!matchedWord) return word;

        return { ...word, label: matchedWord.value };
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
