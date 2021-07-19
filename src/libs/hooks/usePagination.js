import { useEffect, useState } from 'react';
import { objectHasLength } from 'libs/checks';


export const getPagesIndices = (list, eachPageLimit = 1) => {
  const pages = {};

  if (!Array.isArray(list)) return {};
  for (let i = 0; i < list.length; i += eachPageLimit) {
    const currentPage = Object.keys(pages).length;
    pages[currentPage] = {
      pageNumber: currentPage,
      start: i,
      ends: i + eachPageLimit > list.length ? list.length : i + eachPageLimit
    };
  }
  return pages;
};

export const getActivePageItems = (list, pagesReference = {}, pageNumber) => {
  const { start, ends } = pagesReference[pageNumber] || {};
  if (!Array.isArray(list)) return [];
  const matchList = list.slice(start, ends);

  return Array.isArray(matchList) ? matchList : [];
};


export const usePagination = (list, options = {}) => {
  const { eachPageLimit = 10, startPage = 0 } = options;
  const [originalList, setOriginalList] = useState(list);
  const [activePageNumber, setActivePageNumber] = useState(startPage);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(true);

  const pagesIndices = getPagesIndices(originalList, eachPageLimit);

  useEffect(() => {
    if (Array.isArray(list)) setOriginalList(list);
    else setOriginalList([]);
  }, [list]);

  const goToPage = (page) => {
    setActivePageNumber(Number(page));
  };
  const onNext = () => {
    if (hasNext) goToPage(activePageNumber + 1);
  };
  const onPrevious = () => {
    if (hasPrevious) goToPage(activePageNumber - 1);
  };

  useEffect(() => {
    const isNextPageHaveItems = objectHasLength(pagesIndices[activePageNumber + 1] || {});
    const isPreviousPageHaveItems = objectHasLength(pagesIndices[activePageNumber - 1] || {});
    if (hasNext !== isNextPageHaveItems) setHasNext(isNextPageHaveItems);
    if (hasPrevious !== isPreviousPageHaveItems)
      setHasPrevious(isPreviousPageHaveItems);
  }, [activePageNumber, pagesIndices, setHasPrevious, hasNext, hasPrevious]);

  return {
    ...options,
    currentPageList: getActivePageItems(
      originalList,
      pagesIndices,
      activePageNumber
    ),
    currentPage: activePageNumber,
    onNext,
    pagesNumbers: Object.keys(pagesIndices),
    hasNext,
    onPrevious,
    hasPrevious,
    goToPage
  };
};

export default usePagination;
