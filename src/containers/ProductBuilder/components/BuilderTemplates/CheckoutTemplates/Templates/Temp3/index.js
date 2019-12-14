import React from 'react';
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


const Template = ({
  className = '',
  product: {
    shippingDetails = {},
    ...product
  } = {},
  onChange,
  language,
  onOptionSelected
}) => {

  const color = product.pagePreferences && product.pagePreferences.themeColor
  const { features = {}, testimonials = {} } = product.pagePreferences || {}
  const { coupons = {}, payment = {} } = product
  return (
    <div id={product._id} className={`editable-product-form-container ${className}`}>
      <Header
        onOptionSelected={onOptionSelected}
        color={color}
        language={language}
      />
      <AboutProduct
        {...product}
        onChange={onChange}
        pagePreferences={product.pagePreferences}
        containerClassName='horizontal-about-product-container'
        descriptionInnerClassName='horizontal-product-template-description'
        subContainerClassName='template-description-fullWidth'
        withoutImage
      />
      <section className="product-template-body">
        <section className="billing-components-section">
          <BillingDetails
            color={color}
            language={language}
          />

          <ShippingDetails
            data={shippingDetails}
            onChange={onChange}
            color={color}
            language={language}
          />

          <PaymentMethods
            step={shippingDetails.enabled ? 3 : 2}
            onOptionSelected={onOptionSelected}
            methods={payment.methods}
            // onShowSetting
            // onFieldChange
            language={language}
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
            language={language}
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
        <section className="richening-components-section">
          <Image
            image={product.image || defaultLogo}
            onChange={(target) => onChange({ target })}
            name='image'
            className='product-template-image item-align-center'
          />
          <Features
            onChange={onChange}
            features={features}
          />

          <CouponActivation
            color={color}
            onChange={onChange}
            coupons={coupons}
            language={language}
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