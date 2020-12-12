import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { offlinePaymentLogo } from 'data/importBrands';
import Tooltip from 'components/common/Tooltip';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import clx from 'classnames';
import { isFunction } from 'libs/checks';

const { FlexBox } = common;

const PaymentRow = ({ _id, logo, name, active, isFormMode, onSelect }) => {

  const _onEdit = (id) => {
    if (isFunction(onSelect))
      onSelect(active ? undefined : id);
  };

  const _onSelect = () => {
    if (isFormMode)
      _onEdit(_id);
  };

  return (
    <FlexBox flex={!active} className={clx('offline-payment-row', { active, 'item-clickable': isFormMode })} center='v-center' onClick={_onSelect}>
      <img src={logo} alt={name} className='offline-payment-logo' />
      <FlexBox flex className={clx('title-text mx-3', { 'gray-text': !active })}>
        {name}
      </FlexBox>
      {!isFormMode && (
        <FlexBox>
          <Tooltip text='delete this payment method'>
            <AiOutlineDelete className='item-clickable gray-text mr-3' size={20} placement='top'/>
          </Tooltip>
          <Tooltip text='Edit this payment method'>
            <FiEdit2 onClick={() => _onEdit(_id)} className='item-clickable gray-text' size={20} placement='top' />
          </Tooltip>
        </FlexBox>
      )}
    </FlexBox>
  );
};

PaymentRow.defaultProps = {
  logo: offlinePaymentLogo,
  name: 'Offline Payment'
};
PaymentRow.propTypes = {};

export default PaymentRow;
