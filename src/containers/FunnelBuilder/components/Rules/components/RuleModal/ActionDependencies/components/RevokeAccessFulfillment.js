import React from 'react';
import common from 'components/common';

const { FlexBox } = common;

const RevokeAccessFulfillment = () => (
  <FlexBox column center='v-center h-center' className='pt-3'>
    <p className='mx-auto gray-color aligned-center pb-1'>
      No Options needed for this action,
      we'll handle this dependant on the product grant access data,
      and revoke the access from the respective user accordingly.
    </p>
  </FlexBox>
);

export default RevokeAccessFulfillment;
