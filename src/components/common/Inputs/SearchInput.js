
import React from 'react';
import Select from 'antd/lib/select';
import 'antd/dist/antd.css';
import ids from 'shortid';

const Option = Select.Option;

export default ({
  className = '',
  value,
  size = 'default',
  name,
  placeholder,
  error,
  defaultValue,
  onChange: onParentChange,
  options = []
}) => {
  const onChange = (value) => {
    if (value) onParentChange({ target: { name, value } });
  };
  console.log(value , defaultValue)
  // const defaultOption = 22 <Option value={defaultValue.value}>{defaultValue.label}</Option>;
  return (
    <Select
      showSearch
      value={value ||defaultValue}
      size={size}
      style={{ width: 200 }}
      className={`${className} ${error ? 'invalid-field' : ''}`}
      defaultValue={defaultValue}
      placeholder={placeholder || 'Select'}
      optionFilterProp='children'
      onChange={onChange}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {options.map((o) => <Option key={ids.generate()} value={o.value}>{o.label}</Option>)}
    </Select>
  );
};
