import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import common from 'components/common';
import PaymentsGateways from 'components/PaymentGateways';
import currencies from 'data/currencies.json';

import './style.css';
const defaultLanguage = { label: 'English', value: 'en-Us"' };
const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));

const {
  InputRow,
  FlexBox
} = common;

const {
  TextField,
  SearchInput
} = InputRow;

const Label = ({ children, ...props }) => (
  <InputRow.Label className='sidebar-input-label bold-text' {...props}>
    {children}
  </InputRow.Label>
);

const Settings = ({
  languagesOptions,
  funnel: {
    url,
    paymentMethods,
    language,
    currency = 'USD'
  } = {},
  onChange
}) => {

  const onFiledChange = ({ target: { name, value } }) => {
    onChange({ name, value: value === 'English' ? undefined : value });
  };

  return (
    <FlexBox column className='margin-top-10'>
      <FlexBox flex column>
        <FlexBox flex center='v-center'>
          <Label
            description='This will appear on your cart page,this is just for presentation purpose'
          >
            Currency:
          </Label>
          <SearchInput
            size='small'
            width={350}
            options={currenciesList}
            defaultValue={currency}
            name='currency'
            onChange={onFiledChange}
          />
        </FlexBox>
        <FlexBox flex column className='mt-3'>
          <Label>
            Payment Method:
          </Label>
          <PaymentsGateways
            name='paymentMethods'
            selected={paymentMethods}
            onChange={onFiledChange}
          />
        </FlexBox>
        <FlexBox flex center='v-center'>
          <Label>
            language:
          </Label>
          <SearchInput
            size='small'
            width={350}
            options={languagesOptions}
            defaultValue={language}
            name='language'
            onChange={onFiledChange}
            placeholder={language === undefined ? 'English' : language}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox column>
        <Label>
          Funnel Publishable Link (URL):
        </Label>
        <TextField
          className='full-width'
          name='url'
          onChange={onFiledChange}
          value={url}
        />
      </FlexBox>
    </FlexBox>
  );
};

Settings.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired
};

Settings.defaultProps = { product: {} };


const mapStateToProps = ({ translations: languages = [defaultLanguage] }) => {
  const languagesOptions = languages
    .map(({ name: label, _id: value = label }) => ({ label, value }));
  return { languagesOptions };
};
export default connect(mapStateToProps)(Settings);
