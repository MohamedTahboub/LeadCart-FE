import React, { Component } from 'react';
import Image from 'components/common/Image';
import defaultLogo from 'assets/images/new-product-icon.png';
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

const Template = ({ className='' ,product: { shippingDetails = {}, ...product } = {}, onChange, onOptionSelected }) => {

  const color = product.checkoutPage && product.checkoutPage.presetColors
  const { features = {}, testimonials = {} } = product.checkoutPage || {}
  const { coupons = {} , payment ={}} = product
  const showRightSide = testimonials.enabled || coupons.enabled;
  return (
    <div className={`editable-product-form-container ${className}`}>
      <Header
        onOptionSelected={onOptionSelected}
        color={color}
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
            terms={product.checkoutPage && product.checkoutPage.termsAndConditions}
          />

          <CompleteOrderBtn
            text={product.checkoutPage && product.checkoutPage.checkoutButtonText}
            color={color}
            onChange={onChange}
          />
          <GuaranteeMessage
            onChange={onChange}
            guaranteeImage={product.checkoutPage && product.checkoutPage.guaranteeImage}
            guaranteed={product.checkoutPage && product.checkoutPage.guaranteed}
          />


        </section>

        <section className="richening-components-section">
          <AboutProduct
            onChange={onChange}
            descriptionInnerClassName={'vertical-product-template-description'}
            image={product.image}
            name={product.name}
            description={product.description}
          />
    
          <Features
            onChange={onChange}
            features={features}
          />

          <CouponActivation
            color={color}
            onChange={onChange}
            coupons={coupons}
          />
        </section>
      </section>
      <Testimonials
        testimonialsWrapperClassName="df-h-between margin-h-20 margin-t-20"
        testimonialClassName='margin-h-20'
        onChange={onChange}
        testimonials={testimonials}
      />
    </div>
  );
}

export default Template;