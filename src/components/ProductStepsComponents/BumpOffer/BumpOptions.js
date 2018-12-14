import React, { Component } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow, MainBlock } = common;


class BumpOfferOptions extends Component {
  state = { isEnabled: false }

  componentDidMount () {
    this.setState({ isEnabled: this.props.enabled });
  }


  'bumpOfferTemplate'

  toggleBumbeOfferStatus = () => {
    const { isEnabled } = this.state;
    this.setState({ isEnabled: !isEnabled });
    this.props.onProductBumpOfferFieldChange({ name: 'enabled', value: isEnabled });
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductBumpOfferFieldChange({ name, value });
  }

  render () {
    const {
      name,
      title,
      price,
      introText,
      bodyText
    } = this.props;
    const { isEnabled } = this.state;
    return (
      <div>
        <InputRow>
          <InputRow.Label>Do you want to set up a bump offer on this product?</InputRow.Label>
          <InputRow.SwitchInput onToggle={this.toggleBumbeOfferStatus}></InputRow.SwitchInput>
        </InputRow>
        <InputRow>
          <InputRow.Label
            description='This will appear on your cart page'
          >
            Bump product name & price

          </InputRow.Label>
          <InputRow.SmallInput
            disabled={isEnabled}
            name='name'
            onChange={this.onFieldChange}
            value={name}

          />
          <InputRow.PriceField
            name='price'
            onChange={this.onFieldChange}
            value={price}
            disabled={isEnabled}
            currancy='$'
          />
        </InputRow>
        <InputRow>
          <InputRow.Label>Title</InputRow.Label>
          <InputRow.SmallInput
            name='title'
            onChange={this.onFieldChange}
            disabled={isEnabled}
            value={title}
          />
        </InputRow>
        <InputRow>
          <InputRow.Label>Intro text</InputRow.Label>
          <InputRow.SmallInput
            name='introText'
            onChange={this.onFieldChange}
            disabled={isEnabled}
            value={introText}
          >
          </InputRow.SmallInput>
        </InputRow>

        <InputRow>
          <InputRow.Label>Body text</InputRow.Label>
          <InputRow.TextAreaInput
            name='bodyText'
            onChange={this.onFieldChange}
            value={bodyText}
            disabled={isEnabled}

            min={5}
            max={30}
          >
          </InputRow.TextAreaInput>
        </InputRow>
      </div>
    );
  }
}


const mapStateToProps = ({ product: { offer } }) => ({ ...offer });
export default connect(mapStateToProps, producActions)(BumpOfferOptions);
