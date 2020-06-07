import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import SuccessLinks from 'components/SuccessUrls';

const { FlexBox } = common;
const SuccessUrls = ({ successUrls, onChange }) => {
  return null;
  // return (
  //   <FlexBox column>
  //     <SuccessLinks
  //       name='action.metaData.successUrls'
  //       list={successUrls}
  //       onChange={onChange}
  //     />
  //   </FlexBox>
  // );
};

SuccessUrls.propTypes = {};
SuccessUrls.defaultProps = { successUrls: [] };

export default SuccessUrls;
