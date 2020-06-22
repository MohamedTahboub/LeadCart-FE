import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';

const { FlexBox } = common;

const DummySuccessUrl = ({ id, activeDuration, url, onDelete }) => {

  const _onDelete = () => onDelete(id);

  return (
    <FlexBox className='white-bg parent-hover p-2'>
      <span className='success-order'>
        {id + 1}
      </span>
      <span className='truncate'>
        {url}
      </span>
      <span>
        {activeDuration}
      </span>
      <span className='danger-color success-url-delete-btn show-on-parent-hover'>
        <i onClick={_onDelete} className='fas fa-trash-alt' />
      </span>
    </FlexBox>
  );
};

DummySuccessUrl.propTypes = {};

export default DummySuccessUrl;
