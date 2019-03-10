
import React from 'react';
import Select from 'antd/lib/select';
import 'antd/dist/antd.css';

const Option = Select.Option;

export default ({
  className, name, placeholder, defaultValue, onChange: onParentChange, options = []
}) => {
  const onChange = (value) => {
    if (value) onParentChange({ target: { name, value } });
  };

  // const defaultOption = 22 <Option value={defaultValue.value}>{defaultValue.label}</Option>;
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      defaultValue={defaultValue}
      placeholder={placeholder || 'Select'}
      optionFilterProp='children'
      onChange={onChange}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {options.map((o) => <Option key={o.id} value={o.value}>{o.label}</Option>)}
    </Select>
  );
};
