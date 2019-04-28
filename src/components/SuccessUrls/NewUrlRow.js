import React from 'react';
import common from 'components/common';
import moment from 'moment';

const todayDate = (Date.now() - (24 * 60 * 60 * 1000));
const {
  InputRow,
} = common;


const newRow = ({
  onChange,
  onDelete,
  expirationDate,
  url,
  id
}) => (
  <InputRow className='success-url-row'>
    <span className='success-order'>
      {id + 1}
    </span>
    <InputRow.NormalInput
      value={url}
      name='url'
      onBlur={(e) => onChange(e, id)}
    />
    <InputRow.DatePicker
      name='expirationDate'
      value={moment(expirationDate)}
      type='date'
      disabledDate={(date) => date < todayDate}
      placeholder='Expiration Date'
      className='margin-left-15'
      onChange={(date) => onChange({ target: { name: 'expirationDate', value: date.format() } }, id)}
    />
    <span className='danger-color success-url-delete-btn'>
      <i onClick={() => onDelete(id)} className='fas fa-trash-alt' />
    </span>
  </InputRow>
);
export default newRow;
