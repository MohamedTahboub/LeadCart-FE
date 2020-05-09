export const insensitiveSearch = (searchWord = '', comparedWord = '') => comparedWord.toLowerCase().replace(/\s/g, '').includes(searchWord.toLowerCase().replace(/\s/, ''));

// eslint-disable-next-line no-extend-native
String.prototype.insertAt = function (index, characters) {
  console.log({ index, type: typeof index, insta: index instanceof String });
  if (typeof index === 'string' || index instanceof String) {
    console.log('is index');
    if ((/\d+(n(\+\d+)?)?/).test(index)) {
      const [multiplier = 1, offset = 0] = index.match(/(\d+)/g);
      if (offset >= this.length) return this;
      const beforeOffset = this.substring(0, offset);
      const afterOffset = this.substring(offset);
      console.log({ beforeOffset, afterOffset });
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
