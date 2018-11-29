import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow } = common;


class ProductTerms extends Component {
    state = {
      isTermsEnabled: this.props.checkout.termsAndConditions
    }

    onFieldChange = ({ target: { name, value } }) => {
      this.props.onProductCheckoutFieldChange({ name, value });
    }

    onTermsEnabled = () => {
      const isTermsEnabled = !this.state.isTermsEnabled;
      this.setState({ isTermsEnabled });

      this.props.onProductCheckoutFieldChange({
        name: 'termsAndConditions',
        value: { enabled: isTermsEnabled }
      });
    }

    render () {
      const { termsAndConditions = {} } = this.props.checkout;
      return (
        <Fragment>
          <InputRow margin='45'>
            <InputRow.Label
              notes='This requires customers to check that they agree to the terms and conditions.'
            >
        Terms & Conditions Checkbox

            </InputRow.Label>
            <InputRow.SwitchInput name='termsAndConditionsState' onToggle={this.onTermsEnabled} value={termsAndConditions.enabled}></InputRow.SwitchInput>
          </InputRow>
          {termsAndConditions.enabled && (
            <InputRow margin='45'>
              <InputRow.Label
                name='termsAndConditions'
                notes='This creates a link to your custom Terms & Conditions page below the Checkout Button on your SamCart checkout page.'
              >
          Terms & Conditions URL

              </InputRow.Label>
              <InputRow.UrlInput prefix='http://' name='termsAndConditionsUrl' value={termsAndConditions.url} onChange={this.onTermsChanges}></InputRow.UrlInput>
            </InputRow>
          )}
        </Fragment>
      );
    }
}


const mapStateToProps = ({ product: { checkout } }) => ({ checkout });
export default connect(mapStateToProps, producActions)(ProductTerms);
