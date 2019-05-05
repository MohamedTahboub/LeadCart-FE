import React, { Component } from 'react';
import {
  Header,
  AboutProduct,
  BillingDetails,
  CompleteOrderBtn,
  CouponActivation,
  Features,
  GuaranteeMessage,
  OrderSummary,
  PaymentMethods,
  TermsAndConditionsBadge,
  BumpOffer,
  Testimonials
} from './components'

import './style.css'
import Product from '../..';

const Template = ({ product = {}, onChange, onOptionSelected }) => {

  const color = product.checkoutPage && product.checkoutPage.presetColors
  const { features = {}, testimonials = {} } = product.checkoutPage || {}
  const { coupons = {} } = product
  const showRightSide = features.enabled || testimonials.enabled || coupons.enabled;
  return (
    <div className="editable-product-form-container">
      <Header
        onOptionSelected={onOptionSelected}
        color={color}
      />
      <AboutProduct
        onChange={onChange}
        image={product.image}
        name={product.name}
        description={product.description}
      />
      <section className="product-template-body">
        <section className="billing-components-section">
          <BillingDetails color={color} />
          <PaymentMethods
            onOptionSelected={onOptionSelected}
            methods
            onShowSetting
            onFieldChange
          />
          <BumpOffer
            onOptionSelected={onOptionSelected}
            onChange={onChange}
            offer={product.offer}
          />
          <OrderSummary
            price={product.price}
            productName={product.name}
            payment={product.payment}
          />
          <TermsAndConditionsBadge
            onChange={onChange}
            onOptionSelected={onOptionSelected}
            terms={product.checkoutPage && product.checkoutPage.termsAndConditions}
          />

          <CompleteOrderBtn
            text={product.checkoutPage && product.checkoutPage.checkoutButtonText}
            color={color}
            onChange={onChange}
          />

          <GuaranteeMessage
            onChange={onChange}
            guaranteed={product.checkoutPage && product.checkoutPage.guaranteed}
          />

        </section>
        {showRightSide && (
          <section className="richening-components-section">
            <Features
              onChange={onChange}
              features={features}
            />
            <Testimonials
              onChange={onChange}
              testimonials={testimonials}
            />

            <CouponActivation
              color={color}
              onChange={onChange}
              coupons={coupons}
            />
          </section>
        )}
      </section>
    </div>
  );
}

export default Template;