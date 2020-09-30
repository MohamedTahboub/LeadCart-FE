import symbolsReferencesSheet from 'data/references/symbols.json';
import { getCurrencySymbol } from '../currencies';

const updateWithDefaultCurrencyIfDollar = (symbol, defaultCurrency) => {
  if (symbol !== '$') return symbol;
  return getCurrencySymbol(defaultCurrency);
};

export default (name, defaultCurrency) => {
  const symbol = symbolsReferencesSheet[name];
  if (typeof symbol === 'object') {
    return {
      prefixSymbol: symbol.prefix ? updateWithDefaultCurrencyIfDollar(symbol.value, defaultCurrency) : null,
      suffixSymbol: symbol.suffix ? updateWithDefaultCurrencyIfDollar(symbol.value, defaultCurrency) : null
    };
  }
  return {};
};
