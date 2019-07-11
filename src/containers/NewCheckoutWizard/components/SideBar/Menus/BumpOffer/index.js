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
  FulfillmentRowCard,
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

  const onFulfillmentChange = (fulfillmentId) => () => {
    onChange({
      target: {
        name: 'offer.fulfillment',
        value: fulfillmentId
      }
    });
  };
  return (
    <MenuItem>
      <MenuTitle>Bump Offer</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1', '3']}>
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
          </Panel>
          <Panel header='Fulfillment' className='offer-fulfillment-panel' key='2'>
            {fulfillments.map((ful) => (
              <FulfillmentRowCard
                key={ful._id}
                activeFulfillment={fulfillment}
                onSelect={onFulfillmentChange}
                {...ful}
              />
            ))}
          </Panel>
          <Panel header='Appearance' className='offer-appearance-panel' key='3'>
            <InputRow>
              <InputRow.Label>
                Background:
              </InputRow.Label>
              <MiniTwitterPicker
                name='containerBackground'
                value={style.containerBackground}
                onChange={onStyleChange}
              />
            </InputRow>
            <InputRow>
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
            </InputRow>
            <InputRow>
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

            </InputRow>
            <InputRow>
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
            </InputRow>

            <InputRow>
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
