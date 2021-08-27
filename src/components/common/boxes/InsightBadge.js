import React from 'react';
import PropTypes from 'prop-types';
import { getSymbolsReferences } from 'libs';
import numeral from 'numeral';
import Tooltip from '../Tooltip';
import FlexBox from './FlexBox';

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
      <FlexBox flex className='insight-chart'>
        {chart}
      </FlexBox>
      <FlexBox className='insight-box-info-tip'>
        <span>
          {description && (
            <Tooltip text={description} placement='top'>
              <i className='fas fa-info-circle' />
            </Tooltip>
          )}
        </span>
      </FlexBox>
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
