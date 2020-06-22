import React from 'react';
import PropTypes from 'prop-types';
import { trimExtraText } from 'libs';

export const ProductsNamesList = ({ names = [] }) => {
  const [lastName, ...restNames] = names.reverse();
  let namesChain = names.length > 1 ? `${restNames.join(', ')} and ${lastName}` : names.toString();
  if (!names.length) namesChain = 'All Products';

  return (
    <span
      className='truncate'
      data-tip={namesChain}
    >
      {trimExtraText(namesChain, 20)}
    </span>
  );
};
ProductsNamesList.propTypes = { names: PropTypes.arrayOf(PropTypes.string) };
ProductsNamesList.defaultProps = { names: [] };
