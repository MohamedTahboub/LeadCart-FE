
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


  handleChange = (value, el) => {
    this.setState({ value });
    this.props.onChange({ target: { name: this.props.name, value, id: el.props.id } });
  }


  render () {
    const {
      target, defaultValue, placeholder, style: _style
    } = this.props;
    const style = _style || { width: 200 };
    const options = this.state.filtered.map((d) => <Option key={d[target]} id={d._id}>{d[target]}</Option>);
    return (
      <Select
        showSearch
        defaultValue={defaultValue || 'Search'}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption
        showArrow
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
