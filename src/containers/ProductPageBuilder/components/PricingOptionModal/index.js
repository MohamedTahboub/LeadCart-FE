import React, { useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import ids from 'shortid';
import PaymentType from 'components/PaymentType';
import priceFormatOptions from 'data/priceFormatOptions';
import * as immutable from 'object-path-immutable';
import { useContext } from '../../actions';

const {
  MainTitle,
  Button,
  FlexBox,
  InputRow
} = common;

const { Label, TextField, SearchInput } = InputRow;

const defaultPriceOption = { format: 'amount', payment: { type: 'Onetime' }, price: {} };

const NewPricingOptionModal = () => {
  const { state: { productPricing: { openModal } = {} }, actions } = useContext();
  const [priceOption, setOptionPrice] = useState(defaultPriceOption);

  const onChange = ({ target: { value, name } }) => {
    const newPriceOption = immutable.set(priceOption, name, value);
    setOptionPrice(newPriceOption);
  };

  const onClose = () => {
    actions.onTogglePricingOptionModal();
  };

  const _onAdd = () => {
    const { label, format, payment: { type, splits, recurringPeriod } = {}, price: { amount } = {} } = priceOption;

    const constructedOption = {
      id: ids.generate(),
      label,
      format,
      type,
      recurringPeriod,
      splits,
      amount
    };
    actions.addProductPriceOption(constructedOption);
    setOptionPrice(defaultPriceOption);
    setTimeout(onClose, 200);
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={openModal}
      closeBtnClassName='scripts-modal-close-btn'
    >
      <MainTitle bottomLine>New Pricing Option</MainTitle>
      <FlexBox column>
        <InputRow>
          <Label>Label:</Label>
          <TextField
            className='default-pricing-field-length'
            value={priceOption.label}
            name='label'
            onChange={onChange}
          />
        </InputRow>
        <InputRow>
          <Label>Price Format:</Label>
          <SearchInput
            size='small'
            width={150}
            options={priceFormatOptions}
            defaultValue={priceOption.format}
            name='format'
            onChange={onChange}
          />
        </InputRow>
        <PaymentType
          payment={priceOption.payment}
          onChange={onChange}
          name='type'
          price={priceOption.price}
        />
      </FlexBox>

      <FlexBox flex spaceBetween className='mt-3'>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={_onAdd} className='primary-color'>Add</Button>
      </FlexBox>
    </Modal>
  );
};


NewPricingOptionModal.propTypes = {};
NewPricingOptionModal.defaultProps = { scripts: {} };
export default NewPricingOptionModal;
