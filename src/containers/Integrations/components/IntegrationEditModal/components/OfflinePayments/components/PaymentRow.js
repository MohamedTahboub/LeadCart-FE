import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { offlinePaymentLogo } from 'data/importBrands';
import Tooltip from 'components/common/Tooltip';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import clx from 'classnames';
import { isFunction } from 'libs/checks';
import { trimExtraText } from 'libs';

const { FlexBox } = common;

const PaymentRow = ({ _id, logo, name, notes, active, onRemoveOfflinePayment, isFormMode, onSelect }) => {

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
      <FlexBox flex={isFormMode} className={clx('title-text mx-3', { 'gray-text min-width-200': !active })}>
        {name}
      </FlexBox>
      {!isFormMode && (
        <FlexBox flex className={clx('small-text mx-3 ')}>
          {trimExtraText(notes, 70)}
        </FlexBox>
      )}
      {!isFormMode && (
        <FlexBox>
          <Tooltip text='delete this payment method' placement='top'>
            <AiOutlineDelete onClick={() => onRemoveOfflinePayment(_id, name)} className='item-clickable gray-text mr-3' size={20} />
          </Tooltip>
          <Tooltip text='Edit this payment method' placement='top'>
            <FiEdit2 onClick={() => _onEdit(_id)} className='item-clickable gray-text' size={20} />
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
