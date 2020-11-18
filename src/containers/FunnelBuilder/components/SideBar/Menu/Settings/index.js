import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import common from 'components/common';
import PaymentsGateways from 'components/PaymentGateways';
import currencies from 'data/currencies.json';

import './style.css';

const defaultLanguage = { label: 'English', value: 'en-Us"' };
const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));

const { InputRow, FlexBox } = common;
const { TextField, SearchInput } = InputRow;

const Label = ({ children, ...props }) => (
  <InputRow.Label className='sidebar-input-label bold-text' {...props}>
    {children}
  </InputRow.Label>
);

const getTaxesOptions = (taxes) => taxes.map(({ name: label, _id: value }) => ({ label, value }));

const clearOption = {
  label: 'No Tax',
  value: null
};

const Settings = ({
  defaultCurrency,
  languagesOptions,
  funnel: {
    url,
    paymentMethods,
    language,
    currency = defaultCurrency,
    tax
  } = {},
  onChange,
  isOptInFunnel,
  taxes: allTaxes = []
}) => {
  const currentLanguage = languagesOptions.find(({ value }) => value === language);
  const currentLanguageValue = currentLanguage ? currentLanguage.value : 'English';

  const taxesOptions = [clearOption, ...getTaxesOptions(allTaxes.filter(({ enabled }) => enabled))];
  const selectedTaxOption = getTaxesOptions(allTaxes).find(({ value }) => tax === value);

  const onTaxSelectChange = ({ value }) => {
    onChange({ name: 'tax', value });
  };

  const onFiledChange = ({ target: { name, value } }) => {
    onChange({ name, value: value === 'English' ? null : value });
  };

  return (
    <FlexBox column className='margin-top-10'>
      <FlexBox flex column className='scrolling-65vh'>
        {!isOptInFunnel && (
          <Fragment>
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
                currency={currency}
              />
            </FlexBox>
          </Fragment>
        )}
        <FlexBox flex center='v-center'>
          <Label>
            language:
          </Label>
          <SearchInput
            size='small'
            width={350}
            options={languagesOptions}
            defaultValue={currentLanguageValue}
            name='language'
            onChange={onFiledChange}
            placeholder={currentLanguageValue}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox column className='mt-3'>
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

      <FlexBox column className='mt-3'>
        <Label>
          Tax Schemas:
        </Label>

        <Select
          onChange={onTaxSelectChange}
          options={taxesOptions}
          value={selectedTaxOption}
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


const mapStateToProps = ({
  translations: languages = [defaultLanguage],
  settings: { generalModel: { currency: defaultCurrency = 'USD' } = {} } = {},
  taxes
}) => {
  const languagesOptions = languages
    .map(({ name: label, _id: value = label }) => ({ label, value }));
  return { languagesOptions, defaultCurrency, taxes };
};
export default connect(mapStateToProps)(Settings);
