import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';

import './style.css';
const { InputRow, Title, MiniTwitterPicker } = common;

const castFulfillmentList = (fulfillments) => fulfillments.map(({ name: label, _id: value }) => ({ label, value }));

const BumpOptions = ({
  fulfillments,
  product: {
    offer: {
      name,
      price,
      fulfillment,
      style = {}
    } = {}
  } = {},
  onChange
}) => {
  const onStyleChange = ({ target: { name, value } }) => {
    onChange({
      target: {
        name: 'offer.style',
        value: { ...style, [name]: value }
      }
    });
  };
  return (
    <div>
      <Title>Bump Offer Settings:</Title>
      <InputRow>
        <InputRow.Label description='This will appear on your cart page,this is just for presentation purpose'>
          Offer name:
        </InputRow.Label>
        <InputRow.SmallInput
          name='offer.name'
          onBlur={onChange}
          value={name}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>
          Offer price:
        </InputRow.Label>
        <InputRow.PriceField
          name='offer.price'
          onBlur={onChange}
          value={price}
          currancy='$'
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Fulfillment</InputRow.Label>
        <InputRow.SearchInput
          // size='small'
          options={castFulfillmentList(fulfillments)}
          defaultValue={fulfillment}
          name='fulfillment'
        />
      </InputRow>
      <Title>Bump Offer Styles:</Title>
      <InputRow>
        <InputRow.Label>
          Background:
        </InputRow.Label>
        <MiniTwitterPicker
          name='containerBackground'
          value={style.containerBackground}
          onChange={onStyleChange}
        />
        <InputRow.Label>
          Container text:
        </InputRow.Label>
        <MiniTwitterPicker
          name='containerTextColor'
          value={style.containerTextColor}
          onChange={onStyleChange}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>
          Header Background:
        </InputRow.Label>
        <MiniTwitterPicker
          name='headerBackground'
          value={style.headerBackground}
          onChange={onStyleChange}
        />
        <InputRow.Label>
          Header text:
        </InputRow.Label>
        <MiniTwitterPicker
          name='headerTextColor'
          value={style.headerTextColor}
          onChange={onStyleChange}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>
          Border Color:
        </InputRow.Label>
        <MiniTwitterPicker
          name='borderColor'
          value={style.borderColor}
          onChange={onStyleChange}
        />
        <InputRow.Label>
          Border Style:
        </InputRow.Label>
        <InputRow.SelectOption
          value={style.borderStyle}
          name='borderStyle'
          onChange={onStyleChange}
          className='bump-offer-style-dropdown'
          options={[
            { label: 'Solid', value: 'solid' },
            { label: 'Dashed', value: 'dashed' }
          ]}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>
          Border Width:
        </InputRow.Label>
        <InputRow.SelectOption
          value={style.borderWidth}
          name='borderWidth'
          onChange={onStyleChange}
          className='bump-offer-style-dropdown'
          options={[
            { label: '0 px', value: '0' },
            { label: '1 px', value: '1' },
            { label: '2 px', value: '2' },
            { label: '3 px', value: '3' },
            { label: '4 px', value: '4' }
          ]}
        />
        <InputRow.Label>
          Border Radius:
        </InputRow.Label>
        <InputRow.SelectOption
          value={style.borderRadius}
          name='borderRadius'
          onChange={onStyleChange}
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
          ]}
        />
      </InputRow>
    </div>
  );
};

const mapProps = ({ fulfillments: { list: fulfillments = [] } = {} }) => ({
  fulfillments
});
export default connect(mapProps)(BumpOptions);
