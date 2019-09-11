import symbolsReferencesSheet from 'data/references/symbols.json';

export default (name) => {
  const symbol = symbolsReferencesSheet[name];
  if (typeof symbol === 'object') {
    return {
      prefixSymbol: symbol.prefix ? symbol.value : null,
      suffixSymbol: symbol.suffix ? symbol.value : null
    };
  }
  return {};
};
