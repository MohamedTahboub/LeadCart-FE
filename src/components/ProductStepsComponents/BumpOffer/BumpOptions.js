import React, { Component } from 'react';
import common from 'components/common';

const { InputRow, MainBlock } = common;


class BumpOfferOptions extends Component {
    state = { isEnabled: false }

    toggleBumbeOfferStatus = () => {
      this.setState({ isEnabled: !this.state.isEnabled });
      // this.refs.bumpOptions.animat([{ opacity: 0 }, { opacity: 1 }], 1000);
    }

    render () {
      return (
        <React.Fragment>

          <InputRow>
            <InputRow.Label>Do you want to set up a bump offer on this product?</InputRow.Label>
            <InputRow.SwitchInput onToggle={this.toggleBumbeOfferStatus}></InputRow.SwitchInput>
          </InputRow>

          {this.state.isEnabled && (
            <React.Fragment>
              <InputRow>
                <InputRow.Label
                  description='This will appear on your cart page'
                >
                                Bump product name & price

                </InputRow.Label>
                <InputRow.SmallInput></InputRow.SmallInput>
                <InputRow.PriceField currancy='$'>1.99</InputRow.PriceField>
              </InputRow>
              <InputRow>
                <InputRow.Label>Title</InputRow.Label>
                <InputRow.SmallInput></InputRow.SmallInput>
              </InputRow>
              <InputRow>
                <InputRow.Label>Intro text</InputRow.Label>
                <InputRow.SmallInput></InputRow.SmallInput>
              </InputRow>

              <InputRow>
                <InputRow.Label>Body text</InputRow.Label>
                <InputRow.TextAreaInput></InputRow.TextAreaInput>
              </InputRow>

            </React.Fragment>
          )}

        </React.Fragment>
      );
    }
}

export default BumpOfferOptions;

