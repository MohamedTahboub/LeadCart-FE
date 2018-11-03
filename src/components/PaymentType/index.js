import React, { Component } from 'react';
import common from 'components/common';

const { InputRow } = common;


const PaymentTypePicker = ({ type, onChange, ...props }) => {
  switch (type) {
  case 'oneTime':
    return (
      <InputRow>
        <InputRow.Label>Price</InputRow.Label>
        <InputRow.PriceField onChange={onChange} currancy='$' name='price'></InputRow.PriceField>
      </InputRow>
    );
  case 'subscription':
    return (
      <InputRow>
        <InputRow.Label classes='hide-element' />
        <InputRow.PriceField onChange={onChange} currancy='$' name='price'></InputRow.PriceField>
        <InputRow.SelectOption
          onChange={onChange}
          name='recurring'
          leftLabel='Recurring time'
          options={[
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
        />
      </InputRow>
    );
  case 'Spilt':
    return (
      <InputRow>
        <InputRow.Label classes='hide-element' />
                <InputRow.PriceField onChange={onChange} currancy='$' name='price'></InputRow.PriceField>
                <InputRow.SelectOption
          onChange={onChange}
          name='Split'
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
      type: 'oneTime',
      currentValue: {}
    }

    onPaymentTypeChange = ({ target: { value } }) => this.setState({ type: value })

    onChange = ({ target: { value, name } }) => {
      this.setState({
        currentValue: {
          [this.state.type]: {
            ...this.state.currentValue[this.state.type],
            [name]: value
          }
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
              name='paymentType' onChange={this.onPaymentTypeChange}
              options={[
                { label: 'One Time Price', value: 'oneTime' },
                { label: 'Subscription', value: 'subscription' },
                { label: 'Split Payments', value: 'Spilt' },
              ]}
            />
          </InputRow>
          <PaymentTypePicker type={this.state.type} onChange={this.onChange} />

        </React.Fragment>
      );
    }
}
