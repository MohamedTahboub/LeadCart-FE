import React from 'react';

import common from 'components/common';
import { useContext } from '../../../../../../../../actions';
import { Inputs, OrderButton } from './components';

const { FlexBox } = common;
const { InputField } = Inputs;

const OptInForm = ({ language, section }) => {
  const {
    texts: { orderBtn = 'Complete Order' } = {},
    styles: { themeColor = '#2d3d68' } = {}
  } = section;

  const { actions } = useContext();


  const onSectionFieldChange = ({ target: { name, value } } = {}) => {
    actions.onSectionSettingChange({
      section: section,
      field: {
        name: name,
        value: value
      }
    });
  };


  const {
    fullNameLabel = 'Full Name',
    fullNamePlaceholder = 'Full Name',
    emailLabel = 'Email',
    emailPlaceholder = 'Enter your email'
  } = language.optInForm || {};


  return (
    <FlexBox className='p-3' column >
      <InputField
        flex
        label={fullNameLabel}
        className='mb-3'
        placeholder={fullNamePlaceholder}
      />

      <InputField
        flex
        label={emailLabel}
        className='mb-3'
        placeholder={emailPlaceholder}
      />

      <FlexBox column flex center='v-center'>
        <OrderButton
          className='my-3'
          name='texts.orderBtn'
          text={orderBtn}
          onChange={onSectionFieldChange}
          themeColor={themeColor}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default OptInForm;
