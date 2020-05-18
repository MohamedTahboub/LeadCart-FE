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
