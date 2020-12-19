import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import Toggle from 'components/common/Inputs/Toggle';

const notesForSepa = 'Please make sure that you have enabled SEPA from your stripe account';
const FPXNotes = `Financial Process Exchange (FPX) payment method is 
only available to Stripe accounts in Malaysia. If your business is in this country,
 you can switch your country by going to your stripe account settings before using it`;


const { FlexBox, InputRow } = common;
const { Label } = InputRow;

const StripeSettings = ({ onChange, service = {}, ...props }) => {
  const { sepaEnabled, fpxEnabled } = service;


  return (
    <FlexBox column>
      <FlexBox className='mb-5'>
        <Label notes={notesForSepa} >
          Enable SEPA Direct Debit
        </Label>
        <Toggle
          name='sepaEnabled'
          value={sepaEnabled}
          onToggle={(target) => onChange({ target })}
        />
      </FlexBox>
      <FlexBox>
        <Label notes={FPXNotes} >
          FPX payments
        </Label>
        <Toggle
          name='fpxEnabled'
          value={fpxEnabled}
          onToggle={(target) => onChange({ target })}
        />
      </FlexBox>
    </FlexBox>
  );
};

StripeSettings.propTypes = {};

export default StripeSettings;
