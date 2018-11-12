import React, { Component } from 'react';
import queryString from 'query-string';
import common from 'components/common';
import zapierBrand from 'assets/images/zapier_brand.png';

import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';
import { connect } from 'react-redux';
import * as paymentsActions from 'actions/payments';
import { paymentMethodsLinks } from 'config';
import './styles.css';


const {
  Button, MainTitle, SmallBox, FlexBoxesContainer, MediumCard
} = common;

const AddNewButton = (props) => (
  <Button classes='primary-color medium-add-btn'>
    <i className='fas fa-plus' />
    {' '}
    Add new
  </Button>
);
// ColorInlinePicker
const connectStripe = () => {
  window.open(paymentMethodsLinks.stripe);
};


class MarketPlace extends Component {
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
    } = queryString.parse(this.props.history.location.search);


    if (activat_method === 'stripe' || activat_method === 'paypal') {
      if (!error) {
        this.setState({ [activat_method]: { inprogress: true } });
        this.props.activatPaymentMethod({
          type: activat_method,
          code
        });
      } else {
        this.setState({ [activat_method]: { error: error_description, inprogress: false } });
      }
    }
  }

  componentDidUpdate = () => {
    const { activat_method } = queryString.parse(this.props.history.location.search);
    if (this.state[activat_method].inprogress)
      if (this.props[activat_method].isActive || this.props[activat_method].error)
        this.setState({ [activat_method]: { inprogress: false } });
  }

  render() {
    const { stripe, paypal } = this.state;
    const { stripe: $stripe, paypal: $paypal } = this.props;
    return (
      <React.Fragment key={Date.now()}>
        <MainTitle>Payment </MainTitle>
        <MediumCard
          onClick={connectStripe} isActive={$stripe.isActive} imgSrc={stripeImage} error={stripe.error || $stripe.error}
          isLoading={stripe.inprogress}
        />
        <MediumCard imgSrc={paypalImage} isActive={$paypal.isActive} error={paypal.error || $paypal.error} isLoading={paypal.inprogress} />
        <MainTitle>
          Zapier
        </MainTitle>
        <FlexBoxesContainer>
          <SmallBox classes={['zapier-spcial-box']} clic>
            <img className='zapier-brand-image' src={zapierBrand} alt='zapier brand' />
            <input type='text' className='zapier-client-oauth' placeholder='Enter Zapier client Id' />
          </SmallBox>
        </FlexBoxesContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  stripe: state.payments.stripe,
  paypal: state.payments.paypal
});
export default connect(mapStateToProps, paymentsActions)(MarketPlace);
