import React from 'react';
import ProductDetailes from 'components/ProductStepsComponents/Details';
import Boosters from 'components/ProductStepsComponents/Boosters';
import CheckoutTemplates from 'components/ProductStepsComponents/Checkout';
import PaymentGateway from 'components/ProductStepsComponents/PaymentGateway';
import Fullfillment from 'components/ProductStepsComponents/Fullfillment';
import Scripts from 'components/ProductStepsComponents/Scripts';
import ThankyouPage from 'components/ProductStepsComponents/ThankyouPage';
import BumpOffer from 'components/ProductStepsComponents/BumpOffer';
// import OrderBump from './sub/OrderBump'
// import AdvanecdSetting from './sub/AdvanecdSetting'


class ActiveStep extends React.Component {
  render () {
    switch (this.props.currentStep) {
    case 'checkoutPage': return <CheckoutTemplates />;
    case 'mandatoryDetails': return <ProductDetailes />;
    case 'boosters': return <Boosters />;
    case 'payment': return <PaymentGateway />;
    case 'fullfillment': return <Fullfillment />;
    case 'settings': return <Scripts />;
    case 'offer': return <BumpOffer />;
    case 'thankYouPage': return <ThankyouPage />;
    default: return <ProductDetailes />;
    }
  }
}


export default ActiveStep;
