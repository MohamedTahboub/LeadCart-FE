import React from 'react';
import PropTypes from 'prop-types';
import { usePagination } from 'libs/hooks';
import clx from 'classnames';
import styles from './style.module.css';
import { isFunction } from 'libs/checks';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { FlexBox as Flex } from 'components/common/boxes';

const PaginationItem = ({ children, active, className, disabled, ...props }) => {

  const itemClasses = clx(className, styles.paginationItem, {
    [styles.active]: active,
    [styles.disabled]: disabled
  });
  return (
    <Flex center className={itemClasses} {...props}>
      {children}
    </Flex>
  );
};
PaginationItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

const Pagination = ({
  currentPage,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  pagesNumbers,
  goToPage,
  witBackground,
  withBackground = witBackground,
  backgroundColor,
  navigationIconProps
}) => {

  // const toPage = (page) => () => {
  //   goToPage(page);
  // };

  const toFirstPage = () => {
    if (!Array.isArray(pagesNumbers)) return;
    const [firstPageIndex] = pagesNumbers;
    goToPage(firstPageIndex);
  };

  const toLastPage = () => {
    if (!Array.isArray(pagesNumbers)) return;
    const lastPageIndex = pagesNumbers[pagesNumbers.length - 1];
    goToPage(lastPageIndex);
  };


  const iconClassNames = clx(styles.icon, { [styles.withBackground]: withBackground });
  const paginationItemStyles = { '--bg-color': backgroundColor };

  return (
    <Flex center='v-center' className={styles.paginationToolbar} data-testid='pagination-toolbar'>
      <PaginationItem data-testid='pagination-to-start-page-btn' style={paginationItemStyles} disabled={!hasPrevious} className={iconClassNames}
        onClick={toFirstPage}
      >
        <BiArrowToLeft color='currentColor' {...navigationIconProps} />
      </PaginationItem>
      <PaginationItem data-testid='pagination-to-previous-page-btn' style={paginationItemStyles} disabled={!hasPrevious} className={iconClassNames}
        onClick={onPrevious}
      >
        <RiArrowLeftSLine color='currentColor' {...navigationIconProps} />
      </PaginationItem>
      <Flex>
        {currentPage + 1} of {pagesNumbers.length}
      </Flex>
      <PaginationItem data-testid='pagination-to-next-page-btn' style={paginationItemStyles} disabled={!hasNext} className={iconClassNames}
        onClick={onNext}
      >
        <IoIosArrowForward color='currentColor' {...navigationIconProps} />
      </PaginationItem>
      <PaginationItem data-testid='pagination-to-last-page-btn' style={paginationItemStyles} disabled={!hasNext} className={iconClassNames}
        onClick={toLastPage}
      >
        <BiArrowToRight color='currentColor' {...navigationIconProps} />
      </PaginationItem>
    </Flex>
  );
};

Pagination.propTypes = {
  currentPageList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object])),
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  hasNext: PropTypes.bool,
  hasPrevious: PropTypes.bool,
  withBackground: PropTypes.bool,
  pagesNumbers: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  goToPage: PropTypes.func
};
Pagination.defaultProps = { navigationIconProps: { size: 16 }, backgroundColor: '#F6F7FA', withBackground: true };

export const withPagination = (Table) => (props) => {
  const { paginationOptions = {}, paginationTheme, data, hasPagination = true, width = '100%', footer, ...restProps } = props;

  const shouldShowPaginationBar = data?.length > paginationOptions.eachPageLimit && hasPagination;
  const {
    currentPageList,
    ...paginationProps
  } = usePagination(data, paginationOptions);

  const renderPagination = (<Pagination {...paginationProps} theme={paginationTheme} currentPageList={currentPageList} />);
  const renderFooter = isFunction(footer) ? footer({ renderPagination, paginationProps }) : (
    <Flex center='h-center' style={{ margin: '20px 0' }}>
      {renderPagination}
    </Flex>
  );

  return (
    <Flex column style={{ width }} flex>
      <Flex flex>
        <Table {...restProps} data={shouldShowPaginationBar ? currentPageList : data} />
      </Flex>
      {shouldShowPaginationBar ? renderFooter : null}
    </Flex>
  );
};

export default Pagination;

export const getDynamicPaginationOptions = (ref, units, initialOptions) => {
  const { unitHeight = 0, ignoreSize = 0 } = units || {} ;
  if (!(ref?.current?.getBoundingClientRect && isFunction(ref.current.getBoundingClientRect))) return { eachPageLimit: 10, ...initialOptions };
  const { height: containerHeight } = ref?.current?.getBoundingClientRect();
  const eachPageLimit = parseInt((containerHeight - ignoreSize) / unitHeight);
  console.log({
    containerHeight,
    ignoreSize,
    unitHeight,
    eachPageLimit
  });
  return {
    ...initialOptions,
    eachPageLimit: eachPageLimit > 0 ? eachPageLimit : 1
  };
};
