import React, { Fragment } from 'react';

import { getIcon } from 'data/faqIcons';

const ContentIcon = ({ id, open, styles }) => {
  const { customOpenIcon = '', customCloseIcon = '', isCustom, iconsColor } = styles;
  const { OpenIcon, CloseIcon } = getIcon(isCustom);

  return (
    <Fragment>
      {
        isCustom === true ?
          (open !== id ?
            customOpenIcon && customCloseIcon &&
            <div className='faq-customIcon'>
              <img src={customOpenIcon} alt='' />
            </div>
            :
            customOpenIcon && customCloseIcon &&
            <div className='faq-customIcon'>
              <img src={customCloseIcon} alt='' />
            </div>

          )
          :
          (
            open !== id ?
              <OpenIcon style={{ color: `${iconsColor}` }} className='faq-listItem-icon' />
              :
              <CloseIcon style={{ color: `${iconsColor}` }} className='faq-listItem-icon' />
          )
      }

    </Fragment>
  );
};

export default ContentIcon;
