import React from 'react';
// import common from 'components/common';
import { connect } from 'react-redux';
import * as productActions from 'actions/product';
import { Link } from 'components/common/MainMenu';
import paypalImage from 'assets/images/paypal.png';
import stripeImage from 'assets/images/stripe.png';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import common from 'components/common';
import 'react-tabs/style/react-tabs.css';


const { Block, TabTitle, MediumCard, InputRow } = common;

const Payment = ({ productPaymentMethods, onProductPaymentFieldChange, userPayments, history, ...props }) => {
  const addProductpaymentGatway = (method) => {
    if (userPayments.includes(method)) {
      onProductPaymentFieldChange({
        name: 'methods',
        value: productPaymentMethods.includes(method)
          ? productPaymentMethods.filter((m) => m !== method)
          : [...productPaymentMethods, method]
      });
    }
  };
  return (

    <Tabs>
      <TabList>
        <Tab><TabTitle>Payment Gateway</TabTitle></Tab>
      </TabList>
      <TabPanel>
        <Block>
          {userPayments.includes('Stripe')
            && (
              <MediumCard
                imgSrc={stripeImage}
                isActive={productPaymentMethods.includes('Stripe')}
                onClick={() => addProductpaymentGatway('Stripe')}
              />
            )}
          {userPayments.includes('Paypal')
            && (
              <MediumCard
                imgSrc={paypalImage}
                isActive={productPaymentMethods.includes('Paypal')}
                onClick={() => addProductpaymentGatway('Paypal')}
              />
            )
          }
          <InputRow>
            {userPayments.length
              ? (
                <Message>
                  You Can always add new Payment methods from the
                  <Link to={{ history, page: '/settings/integrations' }}> settings/integrations</Link>
                </Message>
              )
              : (
                <Message>
                  You Dont Have Any Payment Method connected to Your Account,Add from
                  <Link to={{ history, page: '/settings/integrations' }}> Integrations</Link>

                </Message>
              )}
          </InputRow>
        </Block>
      </TabPanel>
    </Tabs>
  );
};


function Message ({ children }) {
  return (
    <div className='product-payment-message'>
      <span className='message-content'>{children}</span>
    </div>
  );
}

const mpaStateToProps = ({
  product: { payment },
  payments: userPayments
}) => ({ userPayments: userPayments.methods, productPaymentMethods: payment.methods || [] });
export default connect(mpaStateToProps, productActions)(Payment);

