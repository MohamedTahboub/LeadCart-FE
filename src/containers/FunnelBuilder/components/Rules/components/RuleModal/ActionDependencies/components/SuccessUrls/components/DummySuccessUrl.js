import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
// import { trimExtraText } from 'libs';

const { FlexBox } = common;

const getStatement = (duration = '') => {
  const [value, period] = duration === 'infinite' ? [duration] : duration.split(',');
  const isPlural = !isNaN(value) && (+value > 1);
  return value === 'infinite' ? 'valid forever' : `valid for ${value} ${period}${isPlural ? 's' : ''}`;
};
const DummySuccessUrl = ({ id, activeDuration, url, onDelete }) => {


  const _onDelete = () => onDelete(id);


  const expirationStatement = getStatement(activeDuration);
  return (
    <FlexBox center='v-center' className='white-bg parent-hover p-2'>
      <span className='success-order'>
        {id + 1}
      </span>
      <span className='bold-text truncate max-width-400 mx-2 underlined-text without-hover'>
        {url}
      </span>
      <span className='bold-text'>
        {expirationStatement}
      </span>
      <span className='danger-color success-url-delete-btn show-on-parent-hover'>
        <i onClick={_onDelete} className='fas fa-trash-alt' />
      </span>
    </FlexBox>
  );
};

DummySuccessUrl.propTypes = {};

export default DummySuccessUrl;
