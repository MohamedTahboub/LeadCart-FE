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
  ShippingDetails,
  BumpOffer,
  Testimonials
} from '../../components'

// import './style.css'

const Template = ({ className = '', product: { shippingDetails = {}, ...product } = {}, onChange, onOptionSelected }) => {

  const { themeColor: color, features = {}, testimonials = {} } = product.pagePreferences || {}
  const { coupons = {}, payment = {} } = product
  const showRightSide = features.enabled || testimonials.enabled || coupons.enabled;
  return (
    <div className={`editable-product-form-container ${className}`}>
      <Header
        onOptionSelected={onOptionSelected}
        color={color}
      />
      <AboutProduct
        onChange={onChange}
        pagePreferences={product.pagePreferences}
        description={product.description}
      />
      <section className="product-template-body">
        <section className="billing-components-section">
          <BillingDetails color={color} />

          <ShippingDetails
            data={shippingDetails}
            onChange={onChange}
            color={color}
          />

          <PaymentMethods
            step={shippingDetails.enabled ? 3 : 2}
            onOptionSelected={onOptionSelected}
            methods={payment.methods}
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
            terms={product.pagePreferences && product.pagePreferences.termsAndConditions}
          />

          <CompleteOrderBtn
            text={product.pagePreferences && product.pagePreferences.orderButtonText}
            color={color}
            onChange={onChange}
          />

          <GuaranteeMessage
            onChange={onChange}
            guaranteeImage={product.pagePreferences && product.pagePreferences.guaranteeImage}
            guaranteed={product.pagePreferences && product.pagePreferences.guaranteed}
          />

        </section>
        {showRightSide && (
          <section className="richening-components-section">
            <Features
              onChange={onChange}
              features={features}
              color={color}
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