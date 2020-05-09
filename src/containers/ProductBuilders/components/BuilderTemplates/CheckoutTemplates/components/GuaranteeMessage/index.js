import React from 'react';
import defaultGuaranteeImage from 'assets/images/guarantee.png';
import Image from 'components/common/Image';
import common from 'components/common';

import './style.css';

const { FloatButton } = common;
const GuaranteeMessage = ({
  guaranteed = {},
  onChange
}) => (
  guaranteed.enabled
    ? (
      <div className='template-guarantee-badge'>
        <FloatButton
          name='pagePreferences.guaranteed'
          position={{ padding: '0 5px', left: '-6px' }}
          onClick={() => onChange({
            target: {
              name: 'pagePreferences.guaranteed',
              value: { ...guaranteed, enabled: !guaranteed.enabled }
            }
          })}
        >
          <i className='fas fa-eye-slash' />
        </FloatButton>
        <Image
          image={guaranteed.url || defaultGuaranteeImage}
          onChange={(target) => onChange({
            target: {
              name: 'pagePreferences.guaranteed',
              value: {
                ...guaranteed,
                url: target.value
              }
            }
          })}
          name='pagePreferences.guaranteeImage'
          className='template-guarantee-badge-image'
          alt='guarantee badge'
        />
      </div>
    )
    : null
);
export default GuaranteeMessage;
