export const insensitiveSearch = (searchWord = '', comparedWord = '') => comparedWord.toLowerCase().replace(/\s/g, '').includes(searchWord.toLowerCase().replace(/\s/, ''));
