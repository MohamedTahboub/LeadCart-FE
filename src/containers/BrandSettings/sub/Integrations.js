import React, { useState, useEffect } from 'react';
import queryString from 'querystring';
import common from 'components/common';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as paymentsActions from 'actions/payments';
import * as settingsActions from 'actions/settings';
import config from 'config';
import { property } from 'libs';
import * as brandsLogos from './importBrands';

import './styles.css';
const {
  ZAPIER_INVITATION_LINK,
  STRIP_AUTH_LINK
} = config;

const {
  MainTitle,
  WarningMessage,
  Dialog,
  MediumCard,
  PayPalConnectContainer
} = common;


const CardsContainer = ({ className = '', children }) => (
  <div className={`crads-container-element ${className}`}>
    {children}
  </div>
);

const CardHandler = ({ children }) => <div className='card-handler'>{children}</div>;

const onZapierClicked = () => {
  window.open(ZAPIER_INVITATION_LINK, '_blank');
};


const Integrations = ({
  methods: PaymentMethods,
  activatPaymentMethod,
  connectWithPaypal,
  history,
  ...props
}) => {
  // const [state, setState] = useState({});
  const [onProgress, setProgress] = useState({});
  const [errors, setErrors] = useState({});
  const [showStripeOverridingWaring, setShowStripeOverridingWarning] = useState(false);


  const navigateTOIntegrationPage = () => {
    history.push('/settings/integrations');
  };

  useEffect(() => {
    const {
      activat_method,
      code,
      // scope,
      error,
      error_description
    } = queryString.parse(history.location.search.replace('?', ''));

    if (activat_method === 'stripe' || activat_method === 'paypal') {
      setProgress({ [activat_method]: true });
      if (!error) {
        activatPaymentMethod({
          type: activat_method,
          code
        },
        {
          onSuccess: (arg) => {
            setProgress({ [activat_method]: false });
            navigateTOIntegrationPage();
          },
          onFailed: (message) => {
            setErrors({ [activat_method]: message });
            setProgress({ [activat_method]: false });
            navigateTOIntegrationPage();
          }
        });
      } else {
        setErrors({ [activat_method]: error_description });
        setProgress({ [activat_method]: false });
      }
    }
  }, []);


  const isMethodActive = (method) => {
    const isConnected = PaymentMethods.find(({ name }) => name === method);
    return errors[method.toLowerCase()] ? false : isConnected;
  };

  const getHandlerName = (method) => {
    if (isMethodActive(method)) {
      const { handler = 'unknown app connected' } = isMethodActive(method);
      return handler;
    }
    return 'Not Connected';
  };

  const connectStripe = () => {
    if (isMethodActive('Stripe')) setShowStripeOverridingWarning(true);
    else window.open(STRIP_AUTH_LINK);
  };
  return (
    <React.Fragment key={Date.now()}>
      <MainTitle style={{ marginTop: '20px' }}>
        Payment Gateways
      </MainTitle>
      <CardsContainer>
        <MediumCard
          onClick={connectStripe}
          isActive={isMethodActive('Stripe')}
          error={errors.stripe}
          imgSrc={brandsLogos.stripeImage}
          headline={<CardHandler>{getHandlerName('Stripe')}</CardHandler>}
          isLoading={onProgress.stripe}
        />
        <PayPalConnectContainer
          imgSrc={brandsLogos.paypalImage}
          active={isMethodActive('Paypal')}
          error={errors.paypal}
          headline={<CardHandler>{getHandlerName('Paypal')}</CardHandler>}
          onConnect={connectWithPaypal}
          isLoading={onProgress.paypal}
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
        <MediumCard
          disabled
          onClick={() => { }}
          imgSrc={brandsLogos.mooSend}
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
          onClick={onZapierClicked}
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
      <Dialog
        onClose={() => setShowStripeOverridingWarning(false)}
        show={showStripeOverridingWaring}
        confirmBtnText='Continue'
        confirmBtnIcon={null}
        title='You have already integrated Stripe with your account'
        description={(
          <WarningMessage>
            {property('settings.integrations.stripe.overridingWarning')}
          </WarningMessage>
        )}
        onConfirm={() => {
          setShowStripeOverridingWarning(false);
          setTimeout(() => {
            window.open(STRIP_AUTH_LINK);
          }, 100);
        }}
      />
    </React.Fragment>
  );
};


Integrations.propTypes = {
  methods: PropTypes.arrayOf({}),
  activatPaymentMethod: PropTypes.func.isRequired,
  connectWithPaypal: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};
Integrations.defaultProps = {
  methods: [],
};
const mapStateToProps = ({
  payments: { methods = [] } = {}
}) => ({
  methods
});
export default connect(mapStateToProps, { ...paymentsActions, ...settingsActions })(Integrations);
