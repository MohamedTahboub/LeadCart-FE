import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const ChartTypeCard = ({
  activeType,
  label,
  value,
  warning,
  prefix,
  suffix,
  data,
  onClick,
  labelFormat = '0.00',
  name
}) => {
  const onChange = () => onClick(name);

  const labelValue = (value || data[name]) || 0;
  const castedValue = typeof labelValue === 'number' ? numeral(labelValue).format(labelFormat) : 0;
  return (
    <div
      onClick={onChange}
      role='presentation'
      className={`chart-preview-card ${activeType === name ? 'active' : ''}`}
    >
      <div className='label'>{label}</div>
      <div className={`value ${warning ? 'warning' : ''}`}>
        {prefix}
        {castedValue}
        {suffix}
      </div>
    </div>
  );
};

ChartTypeCard.propTypes = {
  activeType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.objectOf({}),
  prefix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement)
  ]),
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement)
  ]),
  name: PropTypes.string.isRequired,
  warning: PropTypes.bool
};
ChartTypeCard.defaultProps = {
  warning: false,
  data: {},
  prefix: null,
  suffix: null,
};
export default ChartTypeCard;
