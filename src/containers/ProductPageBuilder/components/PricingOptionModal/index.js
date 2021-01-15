import React, { useEffect, useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import ids from 'shortid';
import PaymentType from 'components/PaymentType';
import * as immutable from 'object-path-immutable';
import { useContext } from '../../actions';
import { hasKeys } from 'libs/checks';

const {
  MainTitle,
  Button,
  FlexBox,
  InputRow
} = common;

const { Label, TextField } = InputRow;

const defaultPriceOption = { format: 'amount', payment: { type: 'Onetime' }, price: {} };

const NewPricingOptionModal = ({ currency }) => {
  const { state: { productPricing: { openModal, isEditMode, toEdit: toEditPriceOption = defaultPriceOption } = {} }, actions } = useContext();
  const [priceOption, setOptionPrice] = useState(toEditPriceOption);

  const onChange = ({ target: { value, name } }) => {
    const newPriceOption = immutable.set(priceOption, name, value);
    setOptionPrice(newPriceOption);
  };

  useEffect(() => {
    if (isEditMode && hasKeys(toEditPriceOption))
      return setOptionPrice(toEditPriceOption);
    else
      return setOptionPrice(defaultPriceOption);
  }, [toEditPriceOption, isEditMode, openModal]);

  const onClose = () => {
    actions.onTogglePricingOptionModal();
  };

  const _onAdd = () => {
    const { label, payment: { type, splits, recurringPeriod } = {}, price: { amount } = {} } = priceOption;

    const constructedOption = {
      id: ids.generate(),
      label,
      type,
      recurringPeriod,
      splits,
      amount
    };
    actions.addProductPriceOption(constructedOption);
    setOptionPrice(defaultPriceOption);
    setTimeout(onClose, 200);
  };
  const onUpdate = () => {
    const { label, payment: { type, splits, recurringPeriod } = {}, price: { amount } = {} } = priceOption;

    const constructedOption = {
      id: ids.generate(),
      label,
      type,
      recurringPeriod,
      splits,
      amount
    };
    actions.updateProductPriceOption(constructedOption);
    setTimeout(onClose, 200);
  };

  const priceOptionPayment = {
    type: priceOption.type,
    splits: priceOption.splits,
    recurringPeriod: priceOption.recurringPeriod,
    ...(priceOption.payment || {})
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={openModal}
      closeBtnClassName='scripts-modal-close-btn'
    >
      <MainTitle bottomLine>
        {`${isEditMode ? 'Edit' : 'New'}`} Pricing Option
      </MainTitle>
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
        <PaymentType
          payment={priceOptionPayment}
          onChange={onChange}
          name='type'
          price={{ amount: priceOption.amount, ...(priceOption.price || {}) }}
          currency={currency}
        />
      </FlexBox>

      <FlexBox flex spaceBetween className='mt-3'>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={isEditMode ? onUpdate : _onAdd} className='primary-color'>{isEditMode ? 'Update' : 'Add'}</Button>
      </FlexBox>
    </Modal>
  );
};


NewPricingOptionModal.propTypes = {};
NewPricingOptionModal.defaultProps = { scripts: {} };
export default NewPricingOptionModal;
