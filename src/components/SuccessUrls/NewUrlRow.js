import React, { useState, useEffect } from 'react';
import common from 'components/common';
// import moment from 'moment';

// const todayDate = (Date.now() - (24 * 60 * 60 * 1000));

const {
  InputRow,
  SelectBox
} = common;


const TimeInterval = ({
  activeDuration = '',
  id,
  ...props
}) => {
  const [fields, setFields] = useState({
    interval: 'day',
    value: 7,
    isInfinite: true,
    maxValue: 31
  });

  useEffect(() => {
    if (activeDuration.includes(',')) {
      const [value, interval] = activeDuration.split(',');
      setFields({
        ...fields,
        value,
        interval,
        isInfinite: false
      });
    } else if (activeDuration === 'infinite') {
      setFields({ ...fields, isInfinite: true });
    }
  }, [activeDuration]);

  const onChange = (name, value) => {
    const newFields = { ...fields, [name]: value };
    setFields(newFields);


    const activeDuration = newFields.isInfinite ? 'infinite' : `${newFields.value},${newFields.interval}`;
    console.log({
      name: 'activeDuration',
      value: activeDuration
    });
    props.onChange({
      target: {
        name: 'activeDuration',
        value: activeDuration
      }
    });
  };

  const toggleIsInfinite = () => {
    const infinite = !fields.isInfinite;

    onChange('isInfinite', infinite);
  };

  // const onIntervalChange = (value) => {
  //   onChange({
  //     ...fields,
  //     interval: value,
  //     maxValue: value === 'day' ? 31 : 12
  //   });
  // };

  const onFieldChange = ({ target: { name, value } }) => {
    onChange(name, value);
  };


  return (
    <div className='success-url-interval'>
      <InputRow.Label
        className='success-url-interval-label-text'
      >
        Valid For
      </InputRow.Label>
      <InputRow.TextField
        disabled={fields.isInfinite}
        type='number'
        onChange={onFieldChange}
        name='value'
        value={fields.value}
        className='success-url-interval-value'
        min='0'
      />
      <select
        className='success-url-interval-interval'
        disabled={fields.isInfinite}
        onChange={onFieldChange}
        name='interval'
        value={fields.interval}
      >
        <option value='day'>
          {`${+fields.value > 1 ? 'Days' : 'Day'}`}
        </option>
        <option value='month'>
          {`${+fields.value > 1 ? 'Months' : 'Month'}`}
        </option>
      </select>
      <SelectBox
        className='success-url-interval-select'
        name={id}
        checked={fields.isInfinite}
        onChange={toggleIsInfinite}
        label='Ever'
      />
    </div>
  );
};

const newRow = ({
  onChange,
  onDelete,
  activeDuration,
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
    <TimeInterval
      id={id}
      onChange={(e) => onChange(e, id)}
      activeDuration={activeDuration}
    />
    <span className='danger-color success-url-delete-btn'>
      <i onClick={() => onDelete(id)} className='fas fa-trash-alt' />
    </span>
  </InputRow>
);
export default newRow;
