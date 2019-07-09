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
  const { coupons = {},payment ={}} = product
  const showRightSide = testimonials.enabled || coupons.enabled;
  return (
    <div className={`editable-product-form-container ${className}`}>
      <Header
        onOptionSelected={onOptionSelected}
        color={color}
      />
      <AboutProduct
        onChange={onChange}
        containerClassName='horizontal-about-product-container'
        descriptionInnerClassName='horizontal-product-template-description'
        subContainerClassName='template-description-fullWidth'
        name={product.name}
        description={product.description}
      />
      <section className="product-template-body">
        <section className="billing-components-section">
          <GuaranteeMessage
            onChange={onChange}
            guaranteed={product.checkoutPage && product.checkoutPage.guaranteed}
          />
          <Features
            onChange={onChange}
            features={features}
          />
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



        </section>
        {showRightSide && (
          <section className="richening-components-section">
            <Image
              image={product.image || defaultLogo}
              onChange={(target) => onChange({ target })}
              name='image'
              className='product-template-image item-align-center'
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