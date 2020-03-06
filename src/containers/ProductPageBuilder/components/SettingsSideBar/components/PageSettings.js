import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
// import { connect } from 'react-redux';
import currencies from 'data/currencies.json';
import PaymentType from 'components/PaymentType';
import PaymentGateway from 'components/PaymentGateways';
import { useContext } from '../../../actions';

import {
  SettingBox,
} from './common';

const currenciesList = currencies.map((c) => ({ value: c.code, label: c.name }));
const {
  Collapse,
  MiniTwitterPicker,
  FulfillmentRowCard,
  Currency,
  Tabs,
  Tab,
  InputRow,
  FlexBox

} = common;

const { Panel } = Collapse;

const formatOptions = [
  {
    label: '(1134.65)',
    value: 'amount'
  },
  {
    label: '(1135)',
    value: 'amount_no_decimals'
  },
  {
    label: '(1,134.65)',
    value: 'amount_with_comma_separator'
  },
  {
    label: '(1,135)',
    value: 'amount_with_comma_separator_no_decimals'
  }
];
const currency = 'USD';
const {
  Label,
  SwitchInput,
  TextField,
  SearchInput,
  SelectOption
} = InputRow;

const PageSettings = ({
  ...props
}) => {
  const {
    state: {
      product = {},
    },
    actions
  } = useContext();

  const {
    type,
    pageStyles = {}
  } = product;


  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };

  return (
    <Tabs active='settings' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
      <Tab id='settings' title='Settings'>
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Product Type:
          </Label>
          <SelectOption
            value={type}
            name='type'
            onChange={onChange}
            className='bump-offer-style-dropdown'
            options={[
              { label: 'Checkout Product', value: 'checkoutProduct' },
              { label: 'Upsell/Downsell Product', value: 'upsellProduct' },
              { label: 'ThankYou Product', value: 'thankyouPage' }
            ]}
          />
        </InputRow>
      </Tab>

      <Tab id='styles' title='styles'>
        <SettingBox
          title='Colors'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Screen Background Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.screenBackground'
              value={pageStyles.screenBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Product Background Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.productBackground'
              value={pageStyles.productBackground}
              onChange={onChange}
            />
          </InputRow>
        </SettingBox>

        <SettingBox title='Border Style'>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Border Radius:
            </Label>
            <SelectOption
              value={pageStyles.borderRadius}
              name='pageStyles.borderRadius'
              onChange={onChange}
              className='bump-offer-style-dropdown'
              options={[
                { label: '0 px', value: '0' },
                { label: '1 px', value: '1' },
                { label: '2 px', value: '2' },
                { label: '3 px', value: '3' },
                { label: '4 px', value: '4' },
                { label: '5 px', value: '5' },
                { label: '6 px', value: '6' },
                { label: '7 px', value: '7' },
                { label: '8 px', value: '8' },
                { label: '9 px', value: '9' },
                { label: '10 px', value: '10' },
              ]}
            />
          </InputRow>
        </SettingBox>

      </Tab>
    </Tabs>
  );
};
PageSettings.propTypes = {

};


export default PageSettings;
