import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
const { FlexBox, ResizableInput, InputRow } = common;

const { Checkbox } = InputRow;


const MarketingConsent = ({
  texts = {},
  onChange,
  enabled,
  isRequired
}) => {

  const { marketingConsentText = 'Agree to receive marketing email from this company.' } = texts;


  if (!enabled) return null;


  return (
    <FlexBox center='v-center'>
      {isRequired ? (
        <Checkbox >
          <ResizableInput
            onChange={onChange}
            name={'texts.marketingConsentText'}
            value={marketingConsentText}
            defaultValue={'Edit'}
            style={{ background: 'transparent' }}
          />
        </Checkbox>
      ) : (
        <ResizableInput
          onChange={onChange}
          name={'texts.marketingConsentText'}
          value={marketingConsentText}
          defaultValue={'Edit'}
          style={{ background: 'transparent' }}
        />
      )}
    </FlexBox>
  );
};

MarketingConsent.propTypes = {};

export default MarketingConsent;
