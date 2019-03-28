import React from 'react';
import common from 'components/common'

const { InputRow, Title } = common;
const BumpOptions = ({
  name,
  price,
  onChange
}) => {
  return (
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
    </div>
  );
};

export default BumpOptions;