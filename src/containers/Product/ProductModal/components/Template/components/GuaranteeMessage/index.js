import React from 'react';
import defaultGuaranteeImage from 'assets/images/guarantee.png';
import Image from 'components/common/Image';
import common from 'components/common';

import './style.css';

const { FloatButton } = common;
const GuaranteeMessage = ({
  guaranteed,
  guaranteeImage = defaultGuaranteeImage,
  onChange
}) => (
  guaranteed
    ? (
      <div className='template-guarantee-badge'>
        <FloatButton
          name='checkoutPage.guaranteed'
          position={{ padding: '0 5px', left: '-6px' }}
          onClick={() => onChange({
            target: {
              name: 'checkoutPage.guaranteed',
              value: !guaranteed
            }
          })}
        >
          <i className='fas fa-eye-slash' />
        </FloatButton>
        <Image
          image={guaranteeImage}
          onChange={(target) => onChange({ target })}
          name='checkoutPage.guaranteeImage'
          className='template-guarantee-badge-image'
          alt='guarantee badge'
        />
      </div>
    )
    : null
);

export default GuaranteeMessage;
