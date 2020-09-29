import React from 'react';
import PropTypes from 'prop-types';
import { getSymbolsReferences } from 'libs';
import numeral from 'numeral';

const InsightBadge = ({
  title,
  value = 0,
  name,
  chart,
  description,
  currency,
  format: valueFormat = '0.00',
  show
}) => {
  const { prefixSymbol, suffixSymbol } = getSymbolsReferences(name, currency);

  if (!show) return null;

  const castedValue = typeof value === 'number' ? numeral(value).format(valueFormat) : value;

  return (
    <div className='insight-box'>
      <span className='insight-title'>{title}</span>
      <span className='insight-value'>
        {prefixSymbol}
        {castedValue}
        {suffixSymbol}
      </span>
      {chart && (
        <span className='insight-chart'>
          {chart}
        </span>
      )}
      {description && (
        <div
          data-label={description}
          className='insight-box-info-tip'
        >
          <i className='fas fa-info-circle' />
        </div>
      )}
    </div>
  );
};


InsightBadge.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  chart: PropTypes.instanceOf(HTMLElement),
  icon: PropTypes.instanceOf(HTMLElement)
};


InsightBadge.defaultProps = {
  chart: null,
  icon: null
};


export default InsightBadge;
