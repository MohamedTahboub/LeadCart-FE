import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import SuccessUrls from 'components/SuccessUrls';

const { FlexBox } = common;
const successUrls = ({ successUrls, onChange }) => {
  return (
    <FlexBox column>
      <SuccessUrls
        name='metaData.successUrls'
        list={successUrls}
        onChange={onChange}
      />
    </FlexBox>
  );
};

successUrls.propTypes = {};

export default successUrls;
