import uuid from 'uuid/v4';
import * as immutable from 'object-path-immutable';

import config from 'config';

export const insensitiveSearch = (searchWord = '', comparedWord = '') => comparedWord.toLowerCase().replace(/\s/g, '').includes(searchWord.toLowerCase().replace(/\s/, ''));

export const GetCardType = (number) => {
  // visa
  let re = new RegExp('^4');
  if (number.match(re) != null)
    return 'visa';

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
    return 'mastercard';

  // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null)
    return 'amex';

  // Discover
  re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
  if (number.match(re) != null)
    return 'discover';

  // Diners
  re = new RegExp('^36');
  if (number.match(re) != null)
    return 'diners-club-international';

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]');
  if (number.match(re) != null)
    return 'diners-club-international';

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null)
    return 'jcb';

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null)
    return 'visa';

  return 'default';
};

// eslint-disable-next-line no-extend-native
String.prototype.insertAt = function (index, characters) {
  if (typeof index === 'string' || index instanceof String) {
    if ((/\d+(n(\+\d+)?)?/).test(index)) {
      const [multiplier = 1, offset = 0] = index.match(/(\d+)/g);
      if (offset >= this.length) return this;
      const beforeOffset = this.substring(0, offset);
      const afterOffset = this.substring(offset);
      const withInsertion = afterOffset.split('').reduce((accum, char, ix) => {
        if (ix % multiplier === 0)
          accum.push(char);
        else
          accum[accum.length - 1] += char;
        return accum;
      }, []).join(characters);
      return `${beforeOffset}${withInsertion}`;
    } else {
      throw new Error('Unknown index categorization, should look like "3n+1"');
    }
  } else {
    return this.substring(0, index) + characters + this.substring(index);
  }
};

// eslint-disable-next-line no-extend-native
String.prototype.toPlain = function () {
  return this.toLowerCase().replace(/\s/g, '');
};

export function ObjectChecker (object) {
  this.object = { ...object };
  this.atKeys = (paths) => {
    this.paths = paths;
    return this;
  };
  this.joinKeys = (pathsToJoin) => {
    const newPath = uuid();
    this.paths.push(newPath);
    this.object[newPath] = pathsToJoin.reduce((combinedValue, path) => combinedValue + this.object[path].toString(), '');
    return this;
  };
  this.containing = (searchValue) => {
    const { paths, object } = this;
    return paths.some((path) => object[path].includes && object[path].toLowerCase().includes(searchValue.toPlain()));
  };
  return this;
}

export const checkObject = (object) => new ObjectChecker(object);


export const getNestedKey = (keyPath) => ({ from: (obj) => immutable.get(obj, keyPath) });

const getKeyName = (key = '') => {
  let name = key;
  if (key.includes(':')) {
    const [newName] = key.split(':').reverse();
    name = newName;
  } else if (key.includes('.')) {
    const [newName] = key.split('.').reverse();
    name = newName;
  }
  return name;
};

export const passProps = (...args) => {
  const keys = args;

  return (state) => {
    if (Array.isArray(keys) && keys.length) {
      return keys.reduce((props, key) => {
        if (!props[key]) {
          const keyName = getKeyName(key);
          const keyValue = getNestedKey(key).from(state);
          props[keyName] = keyValue;
        }
        return props;
      }, {});
    }
    return state;
  };
};

const getValidDomain = (domains = []) => domains.find(({ verified, connected }) => verified && connected);


export const getMarketPlaceUrl = ({ domains = [], subDomain }) => {
  const { USER_SUB_DOMAIN_URL } = config;
  const validDomain = getValidDomain(domains);

  if (validDomain?.domain)
    return `https://${validDomain.domain}/`;
  else
    return `${USER_SUB_DOMAIN_URL.replace('subDomain', subDomain)}`;
};


export const isNewObjHasChange = (oldObj, newObj) => {
  const chekPropsWithRef = (oldObj, newObj) => {
    if (Array.isArray(oldObj) && oldObj?.length === newObj?.length) {
      const hasObjects = Boolean(oldObj.filter((ele) => typeof ele === 'object').length);
      if (hasObjects) {
        return Boolean(oldObj.find((ele, i) => isNewObjHasChange(oldObj[i], newObj[i])));
      } else {
        const res = JSON.stringify(oldObj.sort()) !== JSON.stringify(newObj.sort());
        if (res) return true;
      }

    } else if (Array.isArray(oldObj) && oldObj?.length !== newObj?.length) {
      return true;
    } else {
      return isNewObjHasChange(oldObj, newObj);
    }
  };


  for (const prop in newObj)
    if (!oldObj.hasOwnProperty(prop) && Boolean(newObj[prop])) return true;

  for (const prop in oldObj) {
    if (typeof oldObj[prop] === 'object' && oldObj[prop] !== null) {
      if (chekPropsWithRef(oldObj[prop], newObj[prop]))
        return chekPropsWithRef(oldObj[prop], newObj[prop]);

    } else if (!Object.is(oldObj[prop], newObj[prop])) {
      return true;
    }
  }


  return false;
};


export const getNewNameWithNumber = ({ data = [], baseName = 'Name', isCapitalized }) => {
  const defaultNumbersName = data
    .filter(({ name }) => name.toLowerCase().includes(baseName.toLowerCase()))
    .map((ele) => Number(ele?.name.toLowerCase().split(baseName.toLowerCase())[1]))
    .sort((a, b) => a - b);

  const newDefaultNumber = defaultNumbersName.map((number, index) => {
    if (number !== index + 1)
      return index + 1;
    else return undefined;
  }).sort()[0] || defaultNumbersName.length + 1;

  const capitalizedName = baseName.split(' ').map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
  return `${isCapitalized ? capitalizedName : baseName} ${newDefaultNumber}`;
};


export const getSectionBackground = ({ styles = {}, defaultBackground = 'transparent', hasParent = false }) => {
  const {
    backgroundFirstGradientColor = '#052d53',
    backgroundSecondGradientColor = '#1890ff',
    backgroundType = 'color',
    gradientType = 'linear',
    gradientColorsDirection = 'to bottom',
    imageBackground,
    backgroundColor: sectionBackgroundColor = defaultBackground,
    containerBackgroundColor = 'transparent'
  } = styles;

  const backgroundColor = hasParent ? containerBackgroundColor : sectionBackgroundColor;
  const isOneColorBackground = backgroundType === 'color';
  const isLinearGradient = gradientType === 'linear';
  const colorsDirection = isLinearGradient ? gradientColorsDirection : 'circle';
  const isGradientColor = backgroundType === 'gradientColor';
  const isImageBackground = backgroundType === 'image';
  const backgroundImage = isGradientColor ? `${gradientType}-gradient(${colorsDirection},${backgroundFirstGradientColor},${backgroundSecondGradientColor}` : `url(${imageBackground})`;
  const backgroundImageStyle = isImageBackground ? { 'background-position': 'center center', 'background-repeat': 'no-repeat', 'background-size': 'cover' } : {};
  const sectionBackground = isOneColorBackground ? { backgroundColor } : { backgroundImage, ...backgroundImageStyle };

  return sectionBackground;

};
