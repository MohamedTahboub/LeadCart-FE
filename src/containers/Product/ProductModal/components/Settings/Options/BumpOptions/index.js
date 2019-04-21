import React from 'react';
import common from 'components/common';

const { InputRow, Title, MiniTwitterPicker } = common;
const fulfillmentList = [
  { label: 'Undetermined', value: 'default' },
  { label: 'Product X fulfillment', value: 'theXId' },
  { label: 'Test Product  fulfillment', value: 'theXIsd' }
];
const BumpOptions = ({
  name,
  price,
  onChange
}) => (
  <div>
    <Title>Bump Offer Settings:</Title>
    <InputRow>
      <InputRow.Label description='This will appear on your cart page,this is just for presentation purpose'>
          Offer name:
      </InputRow.Label>
      <InputRow.SmallInput
        name='offer.name'
        onChange={onChange}
        value={name}
      />
    </InputRow>
    <InputRow>
      <InputRow.Label>
          Offer price:
      </InputRow.Label>
      <InputRow.PriceField
        name='offer.amount'
        onChange={onChange}
        value={price}
        currancy='$'
      />
    </InputRow>
    <InputRow>
      <InputRow.Label>Fulfillment</InputRow.Label>
      <InputRow.SearchInput
        // size='small'
        options={fulfillmentList}
        defaultValue={fulfillmentList[0].value}
        name='fulfillment'
      />
    </InputRow>
    <Title>Bump Offer Styles:</Title>
    <InputRow>
      <InputRow.Label>
            Background Color:
      </InputRow.Label>
      <MiniTwitterPicker />
    </InputRow>
  </div>
);

export default BumpOptions;
