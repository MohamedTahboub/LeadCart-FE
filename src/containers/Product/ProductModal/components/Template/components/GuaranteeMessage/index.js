import React from 'react';
import guaranteeImage from 'assets/images/guarantee.png';

import common from 'components/common'

import './style.css'

const { FloatButton } = common
const GuaranteeMessage = ({ guaranteed, onChange }) => {
  return (
    guaranteed ?
      <div className='template-guarantee-badge'>
        <FloatButton
          name='checkoutPage.guaranteed'
          onClick={() => onChange({
            target: {
              name: 'checkoutPage.guaranteed',
              value: !guaranteed
            }
          }
          )}
        >
          <i className="fas fa-eye-slash" />
        </FloatButton>
        <img src={guaranteeImage} alt='guarantee badge' className='template-guarantee-badge-image' />
      </div>
      :
      null
  );
};

export default GuaranteeMessage;