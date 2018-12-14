import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow } = common;


class ProductTerms extends Component {
  state = {
    isTermsEnabled: false,
    termsAndConditions: {}
  }

  componentDidMount () {
    const { termsAndConditions } = this.props;
    this.setState({
      isTermsEnabled: termsAndConditions.enabled,
      termsAndConditions
    });
  }

  onTermsUrlChange = ({ target: { name, value } }) => {
    this.props.onProductBoostersFieldChange({
      name: 'termsAndConditions',
      value: { enabled: this.state.isTermsEnabled, [name]: value }
    });
  }

  onTermsEnabled = () => {
    const isTermsEnabled = !this.state.isTermsEnabled;
    this.setState({ isTermsEnabled });

    this.props.onProductBoostersFieldChange({
      name: 'termsAndConditions',
      value: { enabled: isTermsEnabled }
    });
  }

  render () {
    const { termsAndConditions, isTermsEnabled } = this.state;
    return (
      <Fragment>
        <InputRow margin='45'>
          <InputRow.Label
            notes='This requires customers to check that they agree to the terms and conditions.'
          >
            Terms & Conditions Checkbox

          </InputRow.Label>
          <InputRow.SwitchInput name='termsAndConditionsState' onToggle={this.onTermsEnabled} value={isTermsEnabled}></InputRow.SwitchInput>
        </InputRow>
        {isTermsEnabled && (
          <InputRow margin='45'>
            <InputRow.Label
              name='termsAndConditions'
              notes='This creates a link to your custom Terms & Conditions page below the Checkout Button on your SamCart checkout page.'
            >
              Terms & Conditions URL

            </InputRow.Label>
            <InputRow.UrlInput
              prefix='http://'
              name='url'
              value={termsAndConditions.url}
              onChange={this.onTermsUrlChange}
            />
          </InputRow>
        )}
      </Fragment>
    );
  }
}


const mapStateToProps = ({ product: { boosters: { termsAndConditions = {} } } }) => ({ termsAndConditions });
export default connect(mapStateToProps, producActions)(ProductTerms);
