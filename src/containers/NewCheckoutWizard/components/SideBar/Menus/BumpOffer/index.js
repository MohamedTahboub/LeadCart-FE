import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import {
  MenuItem,
  MenuTitle,
  MenuContent,
  MenuFlexContent
} from '../MenuElements';
import './style.css';

const castFulfillmentList = (fulfillments) => fulfillments.map(({ name: label, _id: value }) => ({ label, value }));

const {
  Collapse,
  MiniTwitterPicker,
  InputRow
} = common;

const { Panel } = Collapse;

const BumpOffer = ({
  fulfillments,
  onChange,
  product: {
    offer: {
      fulfillment,
      name,
      price,
      style
    } = {}
  }
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
    <MenuItem>
      <MenuTitle>Bump Offer</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1']}>
          <Panel header='Offer General Settings' key='1'>
            <InputRow>
              <InputRow.Label description='This will appear on your cart page,this is just for presentation purpose'>
                Offer Name:
              </InputRow.Label>
              <InputRow.SmallInput
                className='sidebar-offer-input'
                name='offer.name'
                onBlur={onChange}
                value={name}
              />
            </InputRow>
            <InputRow>
              <InputRow.Label>
                Offer Price:
              </InputRow.Label>
              <InputRow.PriceField
                name='offer.price'
                onBlur={onChange}
                value={price}
                currency='$'
              />
            </InputRow>
            <InputRow>
              <InputRow.Label>Fulfillment</InputRow.Label>
              <InputRow.SearchInput
                // size='small'

                onChange={onChange}
                options={castFulfillmentList(fulfillments)}
                defaultValue={fulfillment}
                name='offer.fulfillment'
              />
            </InputRow>
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
          </Panel>
        </Collapse>
      </MenuContent>
    </MenuItem>
  );
};
BumpOffer.propTypes = {

};

const mapProps = ({
  fulfillments: {
    list: fulfillments = []
  } = {}
}) => ({
  fulfillments
});

export default connect(mapProps)(BumpOffer);
