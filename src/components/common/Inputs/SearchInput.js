
import React from 'react';
import Select from 'antd/lib/select';
import ids from 'shortid';

const { Option } = Select;

export default ({
  className = '',
  value,
  size = 'default',
  name,
  disabled,
  placeholder,
  width = 200,
  error,
  defaultValue,
  onChange: onParentChange,
  onSearch,
  dropdownClassName,
  options = []
}) => {
  const onChange = (value) => {
    if (value && onParentChange) onParentChange({ target: { name, value } });
  };
  return (
    <Select
      showSearch
      value={value || defaultValue}
      disabled={disabled}
      size={size}
      style={{ width }}
      className={`${className} ${error ? 'invalid-field' : ''}`}
      defaultValue={defaultValue}
      placeholder={placeholder || 'Select'}
      optionFilterProp='children'
      onChange={onChange}
      dropdownClassName={dropdownClassName}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      notFoundContent={null}
      showArrow={false}
      onSearch={onSearch}
    >
      {options.map((o) => <Option key={ids.generate()} value={o.value}>{o.label}</Option>)}
    </Select>
  );
};
