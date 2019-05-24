import React, { Component } from 'react';
import queryString from 'querystring';
import common from 'components/common';


import { connect } from 'react-redux';
import * as paymentsActions from 'actions/payments';
import * as settingsActions from 'actions/settings';
import config from 'config';
import * as brandsLogos from './importBrands';
import './styles.css';

const {
  ZAPIER_INVITATION_LINK,
  STRIP_AUTH_LINK
} = config;

const {
  Button,
  MainTitle,
  SmallBox,
  FlexBoxesContainer,
  MediumCard,
  PayPalConnectContainer
} = common;


const CardsContainer = ({ className = '', children }) => (
  <div className={`crads-container-element ${className}`}>
    {children}
  </div>
);

// const AddNewButton = (props) => (
//   <Button className='primary-color medium-add-btn'>
//     <i className='fas fa-plus' />
//     {' '}
//     Add new
//   </Button>
// );
// ColorInlinePicker
const connectStripe = () => {
  window.open(STRIP_AUTH_LINK);
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

  onConnectPaypal = (credits) => this.props.connectWithPaypal({ cred: credits })

  onZapierClicked = () => {
    window.open(ZAPIER_INVITATION_LINK, '_blank');
  }

  render () {
    const { stripe, paypal } = this.state;
    const { methods, integrations: { paypal: PaypalStatus, errors: { paypalError } } } = this.props;
    return (
      <React.Fragment key={Date.now()}>
        <MainTitle style={{ marginTop: '20px' }}>
          Payment Gateways
        </MainTitle>
        <CardsContainer>
          <MediumCard
            onClick={connectStripe}
            isActive={methods.includes('Stripe')}
            error={stripe.error}
            imgSrc={brandsLogos.stripeImage}
            isLoading={stripe.onprogress}
          />
          <PayPalConnectContainer
            imgSrc={brandsLogos.paypalImage}
            active={PaypalStatus || methods.includes('Paypal')}
            error={paypalError}
            onConnect={this.onConnectPaypal}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.razorpayLogo}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.authorizeNetLogo}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.checkoutLogo}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.braintreeLogo}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.towCheckoutLogo}
          />
        </CardsContainer>

        <MainTitle style={{ marginTop: '20px' }}>
          Autoresponders/Email Integrations
        </MainTitle>
        <CardsContainer>
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.activeCampaign}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.aweber}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.getresponse}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            className='mail-chimp-logo'
            imgSrc={brandsLogos.mailChimp}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.drip}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.ontraport}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.convertkit}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.infusionSoft}
          />
        </CardsContainer>

        <MainTitle style={{ marginTop: '20px' }}>
          Membership Platforms
        </MainTitle>
        <CardsContainer>
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.Kajabi}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.teachable}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.Thinkific}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            // className='mail-chimp-logo'
            imgSrc={brandsLogos.wishListMember}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.memberMouse}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            className='ever-lesson-logo'
            imgSrc={brandsLogos.everlesson}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.Memberful}
          />
        </CardsContainer>

        <MainTitle style={{ marginTop: '20px' }}>
        Webinar Platforms
        </MainTitle>
        <CardsContainer>
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.Demio}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.everWebinar}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.webinarJam}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            // className='mail-chimp-logo'
            imgSrc={brandsLogos.goToWebinar}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.BigMarker}
          />
        </CardsContainer>

        <MainTitle style={{ marginTop: '20px' }}>
         Dropshipping/Shipping

        </MainTitle>
        <CardsContainer>
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.dropified}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.shipStation}
          />
        </CardsContainer>


        <MainTitle style={{ marginTop: '40px' }}>
        Misc Integrations

        </MainTitle>
        <CardsContainer>
          <MediumCard
            onClick={this.onZapierClicked}
            imgSrc={brandsLogos.zapierBrand}
            headline='Get invited to Zapier'
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.twillio}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.wordpress}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.wooCommerce}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.shopify}
          />
          <MediumCard
            disabled
            onClick={() => { }}
            imgSrc={brandsLogos.taxamo}
          />
        </CardsContainer>
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
