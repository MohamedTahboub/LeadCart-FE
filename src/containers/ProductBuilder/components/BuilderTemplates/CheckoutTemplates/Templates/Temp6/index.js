import React from 'react';
import { MediaAsset } from '../../../../common'
import QuillEditor from 'components/QuillEditor';

import {
  Header,
  BillingDetails,
  CompleteOrderBtn,
  CouponActivation,
  GuaranteeMessage,
  OrderSummary,
  PaymentMethods,
  TermsAndConditionsBadge,
  ShippingDetails,
  BumpOffer,
  Testimonials
} from '../../components'


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
      <QuillEditor
        value={product.pagePreferences && product.pagePreferences.description}
        onEdit={(value) => {
          onChange({
            target: {
              name: "pagePreferences.description",
              value
            }
          })
        }}
      />
      <section className="product-template-body">
        <section className="billing-components-section">
          <GuaranteeMessage
            onChange={onChange}
            guaranteeImage={product.pagePreferences && product.pagePreferences.guaranteeImage}
            guaranteed={product.pagePreferences && product.pagePreferences.guaranteed}
          />
          <div className="feature-editor">
            <QuillEditor
              value={features.title}
              onEdit={(value) => {
                onChange({
                  target: {
                    name: "pagePreferences.features",
                    value: {
                      ...features,
                      title: value
                    }
                  }
                })
              }}
            />
          </div>
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
        {showRightSide && (
          <section className="richening-components-section">
            <CouponActivation
              color={color}
              onChange={onChange}
              coupons={coupons}
            />
          </section>
        )}
      </section>
      <Testimonials
        testimonialClassName='margin-h-20'
        testimonialsWrapperClassName="df-h-between margin-h-20 margin-t-20"
        titleClassName="aligned-center"
        onChange={onChange}
        testimonials={testimonials}
      />
    </div>
  );
}

export default Template;