import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { useContext } from '../../../../../../../../actions';

import ids from 'shortid';
import { AddNewMethodBtn, ShippingMethodsList } from './components';
const { FlexBox, Tooltip } = common;

const defaultMethod = {
  name: 'Method Name',
  cost: 9
};

const ShippingMethods = (props) => {
  const {
    state: { product: { shippingMethods = [] } = {} },
    actions
  } = useContext();

  const [selected, setSelectedMethod] = useState();

  const selectedMethod = shippingMethods.find(({ id }) => id === selected);

  const onChange = ({ id, name, value }) => {
    actions.onUpdateShippingMethodDetails({
      id,
      [name]: value
    });
  };
  const onAddNewMethod = () => {
    actions.addNewShippingMethod({
      id: ids.generate(),
      ...defaultMethod
    });
  };
  const onSelect = (id) => {
    setSelectedMethod(id);
  };

  const selectedName = selectedMethod?.name;

  return (
    <FlexBox flex column className='my-3'>
      {selectedName && (
        <FlexBox flex center='h-center' className='my-2 bold-text'>
          Shipping to {selectedName}
        </FlexBox>
      )}
      <ShippingMethodsList
        list={shippingMethods}
        onChange={onChange}
        selected={selected}
        onSelect={onSelect}
      />
      <FlexBox flex center='h-center' className='my-3'>
        <Tooltip placement='bottom' text='Add new shipping method'>
          <AddNewMethodBtn onClick={onAddNewMethod} />
        </Tooltip>
      </FlexBox>
    </FlexBox>
  );
};

ShippingMethods.propTypes = {};

export default ShippingMethods;
