import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
// import config from 'config'

const { FlexBox, InputRow } = common;
const {
  TextField,
  SelectOption,
  Checkbox
} = InputRow;

const PrivateLeadcartFulfillment = ({
  metaData = {
    codeType: 'Package',
    packageType: 'Pro'
  },
  onChange
}) => {

  const toggleUnlimited = ({ target: { name } }) => {
    onChange({
      target: {
        name,
        value: !metaData.unlimited
      }
    });
  };

  return (
    <FlexBox column flexStart>
      <SelectOption
        value={metaData.codeType}
        className='my-2'
        name='action.metaData.codeType'
        onChange={onChange}
        options={[
          { label: 'Generate Brand Packages Promo Code', value: 'Package' },
          { label: 'Generate Credit Codes', value: 'Credits' }
        ]}
      />
      {metaData.codeType === 'Package' && (
        <SelectOption
          value={metaData.packageType}
          className='my-1'
          name='action.metaData.packageType'
          onChange={onChange}
          options={[
            { label: 'Basic Brand Promo Code', value: 'Basic' },
            { label: 'Pro Brand Promo Code', value: 'Pro' },
            { label: 'Premium Brand Promo Code', value: 'Premium' }
          ]}
        />
      )}
      {metaData.codeType === 'Package' && (
        <Checkbox
          className='my-1'
          checked={metaData.unlimited}
          name='action.metaData.unlimited'
          onClick={toggleUnlimited}
        >
          Unlimited Brands
        </Checkbox>
      )}
      {metaData.codeType === 'Credits' && (
        <FlexBox wrappable center='v-center'>
          <span className='bold-text gray-text mr-1'>
            How much credits each code have?
          </span>
          <TextField
            className='my-1'
            name='action.metaData.credits'
            type='number'
            placeholder='Credits'
            onChange={onChange}
            value={metaData.credits}
          />
        </FlexBox>
      )}
    </FlexBox>
  );
};

const propifyState = ({ user: { user: { email, admin: isAdmin } = {} } = {} }) => ({ isAdmin, email });
export default connect(propifyState)(PrivateLeadcartFulfillment);
