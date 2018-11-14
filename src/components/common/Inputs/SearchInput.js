
import React from 'react';
import Select from 'antd/lib/select';
import 'antd/dist/antd.css';


const Option = Select.Option;

export default class SearchInput extends React.Component {
  state = {
    data: this.props.data || [],
    filtered: [],
    value: undefined,
  }

  handleSearch = (value) => {
    this.setState({
      filtered: this.state.data.filter((el) => el[this.props.target].includes(value))
    });
  }


  handleChange = (value) => {
    this.setState({ value });
    this.props.onChange({ target: { name: this.props.name, value } });
  }

  render () {
    const { target, placeholder, style: _style } = this.props;
    const style = _style || { width: 200 };
    const options = this.state.filtered.map((d) => <Option key={d[target]}>{d[target]}</Option>);
    return (
      <Select
        showSearch
        value={this.state.value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  }
}

//   <SearchInput
//    data={data}
//    placeholder="input search text"
//    style={{ width: 200 }}
//    onSelect={console.log}
//    />
