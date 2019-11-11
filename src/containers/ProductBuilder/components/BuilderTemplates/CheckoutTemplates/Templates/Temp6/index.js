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
  MediaAsset,
  BumpOffer,
  Testimonials
} from '../../components'

// import './style.css'

const Template = ({ className = '', product: { shippingDetails = {}, ...product } = {}, onChange, onOptionSelected }) => {

  const color = product.pagePreferences && product.pagePreferences.themeColor
  const { features = {}, testimonials = {} } = product.pagePreferences || {}
  const { coupons = {}, payment = {} } = product
  const showRightSide = testimonials.enabled || coupons.enabled;
  return (
    <div id={product._id} className={`editable-product-form-container ${className}`}>
      <Header
        onOptionSelected={onOptionSelected}
        color={color}
      />
      <MediaAsset
        onChange={onChange}
        product={product}
      />
      <AboutProduct
        onChange={onChange}
        pagePreferences={product.pagePreferences}
        containerClassName='horizontal-about-product-container'
        descriptionInnerClassName='horizontal-product-template-description'
        subContainerClassName='template-description-fullWidth'
        withoutImage
      />
      <section className="product-template-body">
        <section className="billing-components-section">
          <GuaranteeMessage
            onChange={onChange}
            guaranteeImage={product.pagePreferences && product.pagePreferences.guaranteeImage}
            guaranteed={product.pagePreferences && product.pagePreferences.guaranteed}
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
            terms={product.pagePreferences && product.pagePreferences.termsAndConditions}
          />

          <CompleteOrderBtn
            text={product.pagePreferences && product.pagePreferences.orderButtonText}
            color={color}
            onChange={onChange}
          />



        </section>
        {showRightSide ? (
          <section className="richening-components-section">
            <Image
              image={product.pagePreferences.image || defaultLogo}
              onChange={(target) => onChange({ target })}
              name='pagePreferences.image'
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
        )
          : (
            <Image
              image={product.pagePreferences.image || defaultLogo}
              onChange={(target) => onChange({ target })}
              name='pagePreferences.image'
              className='product-template-image item-align-center'
            />
          )}
      </section>
    </div>
  );
}

export default Template;