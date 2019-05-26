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

const Template = ({ product: { shippingDetails = {}, ...product } = {}, onChange, onOptionSelected }) => {

  const color = product.checkoutPage && product.checkoutPage.presetColors
  const { features = {}, testimonials = {} } = product.checkoutPage || {}
  const { coupons = {} } = product
  // const showRightSide = testimonials.enabled || coupons.enabled;
  return (
    <div className="editable-product-form-container">
      <Header
        onOptionSelected={onOptionSelected}
        color={color}
      />
      <AboutProduct
        onChange={onChange}
        // image={product.image}
        containerClassName='horizontal-about-product-container'
        descriptionInnerClassName='horizontal-product-template-description'
        subContainerClassName='template-description-fullWidth'
        name={product.name}
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
        <section className="richening-components-section">
          <Image
            image={product.image || defaultLogo}
            onChange={(target) => onChange({ target })}
            name='image'
            className='product-template-image'
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