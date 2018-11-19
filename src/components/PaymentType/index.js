import React, { Component } from 'react';
import common from 'components/common';

const { InputRow } = common;


const PaymentTypePicker = ({
  type, onChange, price, ...props
}) => {
  switch (type) {
  case 'Onetime':
    return (
      <InputRow>
        <InputRow.Label>Price</InputRow.Label>
        <InputRow.PriceField onChange={onChange} currancy='$' name='price' value={price}></InputRow.PriceField>
      </InputRow>
    );
  case 'Subscription':
    return (
      <InputRow>
        <InputRow.Label classes='hide-element' />
        <InputRow.PriceField onChange={onChange} currancy='$' name='price' value={price}></InputRow.PriceField>
        <InputRow.SelectOption
          onChange={onChange}
          name='recurringPeriod'
          leftLabel='Recurring time'
          options={[
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Yearly', value: 'Yearly' }
          ]}
        />
      </InputRow>
    );
  case 'Split':
    return (
      <InputRow>
        <InputRow.Label classes='hide-element' />
        <InputRow.PriceField onChange={onChange} currancy='$' name='price' value={price}></InputRow.PriceField>
        <InputRow.SelectOption
          onChange={onChange}
          name='splits'
          leftLabel='Split payments'
          options={[
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
            { label: '5', value: '5' },
            { label: '10', value: '10' },
            { label: '20', value: '20' },
          ]}
        />
      </InputRow>
    );
  default: return null;
  }
};

export default class PaymentType extends Component {
  state = {
    type: (this.props.value && this.props.value.type) || 'Onetime',
    currentValue: {

    }
  }

  // [Onetime, Subscription, Split]
  onPaymentTypeChange = ({ target: { value } }) => this.setState({ type: value })

  onChange = ({ target: { value, name } }) => {
    console.log(value, name);
    this.setState({
      currentValue: {
        ...this.state.currentValue,
        type: this.state.type,
        [name]: value
      }
    });

    setTimeout(() => {
      this.props.onChange(this.state.currentValue);
    }, 200);
  }

  render () {
    return (
      <React.Fragment>
        <InputRow>
          <InputRow.Label>Product Type</InputRow.Label>
          <InputRow.SelectOption
            value={this.props.value && this.props.value.type}
            name='paymentType' onChange={this.onPaymentTypeChange}
            options={[
              { label: 'One Time Price', value: 'Onetime' },
              { label: 'Subscription', value: 'Subscription' },
              { label: 'Split Payments', value: 'Split' },
            ]}
          />
        </InputRow>
        <PaymentTypePicker type={this.state.type} onChange={this.onChange} price={this.props.price} />

      </React.Fragment>
    );
  }
}
