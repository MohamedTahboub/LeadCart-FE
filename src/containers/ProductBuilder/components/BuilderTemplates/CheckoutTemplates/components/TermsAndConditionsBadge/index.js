import React from 'react';
import common from 'components/common';

import './style.css';

const { FloatButton } = common;

const TermsAndConditionsBadge = ({ onChange, terms = {} }) => {
  const onLinkClick = (e) => {
    e.preventDefault();
  };

  const onHideTerms = () => {
    onChange({
      target: {
        name: 'termsAndConditions.enable',
        value: { ...terms, enabled: false }
      }
    });
  };
  return (
    terms.enabled ? (
      <div className='template-terms-container'>
        <FloatButton
          onClick={onHideTerms}
          position={{ padding: '0 5px', left: 0 }}
        >
          <i className='fas fa-eye-slash' />
        </FloatButton>
        By placing an order you are stating that you agree to the
        <a
          onClick={onLinkClick}
          href={terms.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          Terms & Conditions
        </a>
      </div>
    )
      : null
  );
};

export default TermsAndConditionsBadge;