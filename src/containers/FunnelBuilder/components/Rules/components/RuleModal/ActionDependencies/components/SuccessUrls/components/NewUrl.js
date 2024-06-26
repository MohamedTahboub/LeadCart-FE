import React, { useEffect, useState } from 'react';
import common from 'components/common';
import { MdAddCircleOutline } from 'react-icons/md';
import { string } from 'yup';
const { InputRow, FlexBox, Button } = common;
const { Label, TextField, SelectOption, Toggle } = InputRow;
const urlSchema = string().url();


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
    //eslint-disable-next-line
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
    <FlexBox center='v-center' className='time-interval'>
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

      <section className='success-url-interval-select'>
        <label>Forever</label>
        <Toggle
          value={fields.isInfinite}
          onToggle={toggleIsInfinite}
          beforeLabel=''
          afterLabel=''
        />
        <label>Specific Time</label>
      </section>
    </FlexBox>
  );
};

const initialUrlValue = { url: '', activeDuration: 'infinite' };
const NewRow = ({ onAdd }) => {
  const [url, setUrl] = useState(initialUrlValue);
  const [error, setError] = useState();

  const _onAdd = async () => {
    if (!urlSchema.isValidSync(url.url) || !url.url)
      return setError('Enter a valid URL path');

    onAdd(url);
    setUrl(initialUrlValue);
    setError();
  };

  const _onChange = ({ target: { name, value } }) => {
    setUrl({ ...url, [name]: value });
  };

  return (
    <FlexBox column center='h-center'>
      <FlexBox center='v-center p-2 df-warp'>
        <TextField
          value={url.url}
          name='url'
          onChange={_onChange}
          className='success-url-input'
          placeholder='Success Url'
        />

        <section className='success-url-time'>
          <TimeInterval
            onChange={_onChange}
            url={url.url}
          />
          <Button className='add-success-url' onClick={_onAdd}>
            <MdAddCircleOutline className='add-success-url-icon' />
            <span>Add Success URL</span>
          </Button>
        </section>

      </FlexBox>
      {error && (
        <span className='error-text aligned-center'>
          {error}
        </span>
      )}
    </FlexBox>
  );
};
export default NewRow;
