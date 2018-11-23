import React, { Component } from 'react';
import queryString from 'querystring';
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


class Integratons extends Component {
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
    const { activat_method } = queryString.parse(this.props.history.location.search.replace('?', ''));
    if (activat_method && this.state[activat_method].inprogress) if (this.props.methods.includes(activat_method) || this.props.errors) this.setState({ [activat_method]: { inprogress: false } });
  }

  render () {
    const { stripe, paypal } = this.state;
    const { methods } = this.props;
    return (
      <React.Fragment key={Date.now()}>
        <MainTitle>Payment </MainTitle>
        <MediumCard
          onClick={connectStripe} isActive={methods.includes('Stripe')}
          error={stripe.error}
          imgSrc={stripeImage}
          isLoading={stripe.inprogress}
        />
        <MediumCard imgSrc={paypalImage} isActive={methods.includes('Paypal')} className='disabled-card' />
        <MainTitle>
          Zapier
        </MainTitle>
        <FlexBoxesContainer>
          <SmallBox classes={['zapier-spcial-box']}>
            <img className='zapier-brand-image' src={zapierBrand} alt='zapier brand' />
            <input type='text' className='zapier-client-oauth' placeholder='Enter Zapier client Id' />
          </SmallBox>
        </FlexBoxesContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  methods: state.payments.methods
});
export default connect(mapStateToProps, paymentsActions)(Integratons);
