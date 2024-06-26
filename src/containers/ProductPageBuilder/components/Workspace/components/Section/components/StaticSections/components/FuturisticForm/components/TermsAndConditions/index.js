import React from 'react';
import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';
import { FiLink } from 'react-icons/fi';

import './style.css';
const { FlexBox, ResizableInput, Tooltip, InputRow } = common;

const { Checkbox } = InputRow;
const TermsAndConditions = ({
  texts = {},
  onChange,
  enabled,
  isRequired
}) => {

  const {
    termsAndConditionsText = 'I have read and agree to the',
    termsAndConditionsLinkText = 'terms and conditions.',
    termsAndConditionsUrl = 'https://leadcart.io/terms-and-conditions'
  } = texts;

  if (!enabled) return null;
  return (
    <FlexBox center='v-center'>
      {isRequired ? (
        <Checkbox className='terms-checkbox'>
          <ResizableInput
            onChange={onChange}
            name={'texts.termsAndConditionsText'}
            value={termsAndConditionsText}
            defaultValue={'Edit'}
            style={{ background: 'transparent' }}
          />
        </Checkbox>
      ) : (
        <ResizableInput
          onChange={onChange}
          name={'texts.termsAndConditionsText'}
          value={termsAndConditionsText}
          defaultValue={'Edit'}
          style={{ background: 'transparent' }}
        />
      )}
      <ResizableInput
        onChange={onChange}
        name={'texts.termsAndConditionsLinkText'}
        value={termsAndConditionsLinkText}
        defaultValue={'Edit'}
        className='primary-text'
        style={{ background: 'transparent' }}
      />
      <InlinePopup
        className='standalone ml-2'
        icon={({ color }) => (
          <Tooltip placement='topRight' text='Edit Terms & Conditions Link'>
            {<FiLink color={color} />}
          </Tooltip>
        )}
        position='right'
        popUpContent={(
          <ResizableInput
            onChange={onChange}
            name={'texts.termsAndConditionsUrl'}
            value={termsAndConditionsUrl}
            defaultValue={'Edit'}
            style={{ background: 'transparent' }}
          />
        )}
      />
    </FlexBox>
  );
};

TermsAndConditions.propTypes = {};

export default TermsAndConditions;
