import { getNestedKey } from 'helpers/common';
import { useEffect, useState } from 'react';

export const getSearchTargetContexts = (item = {}, targets = []) => {
  const isString = typeof item === 'string';
  if (isString) return item;

  const wordList = targets.map((target) => getNestedKey(target).from(item)).join(' ');
  return String(wordList);
};

export default (searchList = [], options = {}) => {
  const { targets, caseSensitive = true } = options;
  const [filtered, setFiltered] = useState(searchList);
  const [searchKey, setSearchKey] = useState();


  const onSearch = (searchKey) => {
    setSearchKey(searchKey);
    if (!searchKey || !searchKey.trim())
      return setFiltered(searchList);
    const matches = searchList.filter((item) => {
      const searchContext = getSearchTargetContexts(item, targets);
      if (caseSensitive)
        return searchContext.toLowerCase().includes((searchKey || '').toLowerCase());

      return searchContext.includes(searchKey);
    });
    setFiltered(matches);
  };

  useEffect(() => {
    return () =>
      setFiltered(searchList);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFiltered(searchList);
  }, [searchList]);

  return [filtered, onSearch, searchKey];
};
