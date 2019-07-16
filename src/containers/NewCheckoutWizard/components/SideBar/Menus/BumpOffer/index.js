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
      enabled,
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
  const onToggleBumpOffer = () => {
    onChange({
      target: {
        name: 'offer.enabled',
        value: !enabled
      }
    });
  };

  return (
    <MenuItem>
      <MenuTitle>Bump Offer</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1', '2', '3']}>
          <Panel header='Appearance' key='1'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label' className='sidebar-input-label'>Show</InputRow.Label>
              <InputRow.SwitchInput
                value={enabled}
                onToggle={onToggleBumpOffer}
                className='sidebar-switch-input'
              />
            </InputRow>
          </Panel>
          <Panel header='Settings' key='2'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label' description='This will appear on your cart page,this is just for presentation purpose'>
                Offer Name:
              </InputRow.Label>
              <InputRow.TextField
                className='default-pricing-field-length'
                name='offer.name'
                onBlur={onChange}
                value={name}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                Offer Price:
              </InputRow.Label>
              <InputRow.TextField
                className='default-pricing-field-length'
                name='offer.price'
                onBlur={onChange}
                value={price}
                currency='$'
              />
            </InputRow>
          </Panel>
          <Panel header='Appearance' className='offer-appearance-panel' key='3'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                Background:
              </InputRow.Label>
              <MiniTwitterPicker
                name='containerBackground'
                value={style.containerBackground}
                onChange={onStyleChange}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                Container text:
              </InputRow.Label>
              <MiniTwitterPicker
                name='containerTextColor'
                value={style.containerTextColor}
                onChange={onStyleChange}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                Header Background:
              </InputRow.Label>
              <MiniTwitterPicker
                name='headerBackground'
                value={style.headerBackground}
                onChange={onStyleChange}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                Header text:
              </InputRow.Label>
              <MiniTwitterPicker
                name='headerTextColor'
                value={style.headerTextColor}
                onChange={onStyleChange}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
                Border Color:
              </InputRow.Label>
              <MiniTwitterPicker
                name='borderColor'
                value={style.borderColor}
                onChange={onStyleChange}
              />

            </InputRow>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
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
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
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

            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>
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
          <Panel header='Fulfillment' className='offer-fulfillment-panel' key='4'>
            {fulfillments.map((ful) => (
              <FulfillmentRowCard
                key={ful._id}
                activeFulfillment={fulfillment}
                onSelect={onFulfillmentChange}
                {...ful}
              />
            ))}
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
