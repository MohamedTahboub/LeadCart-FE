import React, { Component } from 'react';
import queryString from 'querystring';
import common from 'components/common';
import zapierBrand from 'assets/images/zapier_brand.png';

import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';
import { connect } from 'react-redux';
import * as paymentsActions from 'actions/payments';
import * as settingsActions from 'actions/settings';
import { paymentMethodsLinks } from 'config';
import './styles.css';
const zapierInvitationUrl = 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/';

const {
  Button,
  MainTitle,
  SmallBox,
  FlexBoxesContainer,
  MediumCard,
  PayPalConnectContainer
} = common;

const AddNewButton = (props) => (
  <Button className='primary-color medium-add-btn'>
    <i className='fas fa-plus' />
    {' '}
    Add new
  </Button>
);
// ColorInlinePicker
const connectStripe = () => {
  window.open(paymentMethodsLinks.stripe);
};


class Integrations extends Component {
  state = {
    stripe: {

    },
    paypal: {

    },
    zapier: {

    },
    mounts: 0
  }

  componentDidMount = () => {
    const {
      activat_method, code, scope, error, error_description
    } = queryString.parse(this.props.history.location.search.replace('?', ''));

    console.log(queryString.parse(this.props.history.location.search.replace('?', '')));

    if (activat_method === 'stripe' || activat_method === 'paypal') {
      if (!error) {
        this.setState({ [activat_method]: { onprogress: true } });
        this.props.activatPaymentMethod({
          type: activat_method,
          code
        });
      } else {
        this.setState({ [activat_method]: { error: error_description, onprogress: false } });
      }
    }
  }

  componentDidUpdate = () => {
    const { activat_method } = queryString.parse(this.props.history.location.search.replace('?', ''));
    if (activat_method && this.state[activat_method].onprogress) if (this.props.methods.includes(activat_method) || this.props.errors) this.setState({ [activat_method]: { onprogress: false } });
  }

  onConnectPaypal = (credits) => {
    this.props.connectWithPaypal({ cred: credits });
  }

  onZapierClicked = () => {
    window.open(zapierInvitationUrl, '_blank');
  }

  render () {
    const { stripe, paypal } = this.state;
    const { methods, integrations: { paypal: PaypalStatus, errors: { paypalError } } } = this.props;
    return (
      <React.Fragment key={Date.now()}>
        <MainTitle style={{ marginTop: '20px' }}>Payment Gateways </MainTitle>
        <MediumCard
          onClick={connectStripe}
          isActive={methods.includes('Stripe')}
          error={stripe.error}
          imgSrc={stripeImage}
          isLoading={stripe.onprogress}
        />
        <PayPalConnectContainer
          imgSrc={paypalImage}
          active={PaypalStatus || methods.includes('Paypal')}
          error={paypalError}
          onConnect={this.onConnectPaypal}
        />

        <MainTitle style={{ marginTop: '40px' }}>
          WebHooks
        </MainTitle>
        <FlexBoxesContainer>
          <MediumCard
            onClick={this.onZapierClicked}
            imgSrc={zapierBrand}
            headline='Get invited to Zapier'
          />
        </FlexBoxesContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({
  payments: { methods = [] } = {},
  settings: { integrations = {} } = {}
}) => ({
  methods,
  integrations
});
export default connect(mapStateToProps, { ...paymentsActions, ...settingsActions })(Integrations);
