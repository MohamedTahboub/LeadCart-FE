import React, { useEffect, useState } from 'react';
import common from 'components/common';
import moment from 'moment';
import { MdAddCircleOutline } from 'react-icons/md';
const {
  InputRow,
  SelectBox,
  FlexBox
} = common;

const { Label, TextField, SelectOption } = InputRow;

const TimeInterval = ({ onChange }) => {
  const initialValue = {
    interval: 'day',
    value: 7,
    isInfinite: true,
    maxValue: 31
  };
  const [fields, setFields] = useState(initialValue);

  useEffect(() => {
    const activeDuration = fields.isInfinite ? 'infinite' : `${fields.value},${fields.interval}`;
    onChange({
      target: {
        name: 'activeDuration',
        value: activeDuration
      }
    });

  }, [fields]);


  const _onChange = (name, value) => {
    const newFields = { ...fields, [name]: value };
    setFields(newFields);
  };


  const toggleIsInfinite = () => {
    const infinite = !fields.isInfinite;
    _onChange('isInfinite', infinite);
  };

  const onFieldChange = ({ target: { name, value } }) => {
    _onChange(name, value);
  };

  return (
    <FlexBox center='v-center'>
      <Label
        className='success-url-interval-label-text'
      >
        Valid For
      </Label>
      <TextField
        disabled={fields.isInfinite}
        type='number'
        onChange={onFieldChange}
        name='value'
        value={fields.value}
        className='success-url-interval-value'
        min='0'
      />
      <SelectOption
        value={fields.interval}
        name='interval'
        onChange={onFieldChange}
        options={[
          { label: `${+fields.value > 1 ? 'Days' : 'Day'}`, value: 'day' },
          { label: `${+fields.value > 1 ? 'Months' : 'Month'}`, value: 'month' }
        ]}
        disabled={fields.isInfinite}
        className='select-period'
      />
      <SelectBox
        className='success-url-interval-select'
        checked={fields.isInfinite}
        onChange={toggleIsInfinite}
        label='Ever'
      />
    </FlexBox>
  );
};

const initialUrlValue = { url: '', activeDuration: moment() };
const NewRow = ({ onAdd }) => {
  const [url, setUrl] = useState(initialUrlValue);

  const _onAdd = () => {
    onAdd(url);
    setUrl(initialUrlValue);
  };

  const _onChange = ({ target: { name, value } }) => {
    setUrl({ ...url, [name]: value });
  };

  return (
    <FlexBox center='v-center p-2'>
      <TextField
        value={url.url}
        name='url'
        onChange={_onChange}
      />
      <TimeInterval
        onChange={_onChange}
        url={url.url}
      />
      <MdAddCircleOutline onClick={_onAdd} />
    </FlexBox>
  );
};
export default NewRow;
