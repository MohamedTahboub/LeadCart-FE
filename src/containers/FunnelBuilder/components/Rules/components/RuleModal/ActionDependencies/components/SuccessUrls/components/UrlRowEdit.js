import React, { useEffect, useState } from 'react';
import common from 'components/common';


const {
  InputRow,
  SelectBox,
  FlexBox
} = common;

const { Label, TextField, SelectOption } = InputRow;

const TimeInterval = ({
  activeDuration = '7,days',
  id,
  ...props
}) => {

  const [fields, setFields] = useState({
    interval: 'day',
    value: 7,
    isInfinite: true,
    maxValue: 31
  });

  // useEffect(() => {
  //   if (activeDuration.includes(',')) {
  //     const [value, interval] = activeDuration.split(',');
  //     setFields({
  //       ...fields,
  //       value,
  //       interval,
  //       isInfinite: false
  //     });
  //   } else if (activeDuration === 'infinite') {
  //     setFields({ ...fields, isInfinite: true });
  //   }
  // }, [activeDuration]);

  const onChange = (name, value) => {
    const newFields = { ...fields, [name]: value };
    setFields(newFields);


    const activeDuration = newFields.isInfinite ? 'infinite' : `${newFields.value},${newFields.interval}`;

    // props.onChange({
    //   target: {
    //     name: 'activeDuration',
    //     value: activeDuration
    //   }
    // });
  };

  const toggleIsInfinite = () => {
    const infinite = !fields.isInfinite;
    onChange('isInfinite', infinite);
  };

  const onFieldChange = ({ target: { name, value } }) => {
    onChange(name, value);
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
        name={id}
        checked={fields.isInfinite}
        onChange={toggleIsInfinite}
        label='Ever'
      />
    </FlexBox>
  );
};

const NewRow = ({
  onChange,
  onDelete,
  activeDuration,
  url,
  id
}) => (
  <FlexBox center='v-center parent-hover p-2'>
    <span className='success-order'>
      {id + 1}
    </span>
    <TextField
      value={url}
      name='url'
      // onBlur={(e) => onChange(e, id)}
    />
    <TimeInterval
      id={id}
      // onChange={(e) => onChange(e, id)}
      activeDuration={activeDuration}
    />
    <span className='danger-color success-url-delete-btn show-on-parent-hover'>
      <i onClick={() => onDelete(id)} className='fas fa-trash-alt' />
    </span>
  </FlexBox>
);
export default NewRow;
