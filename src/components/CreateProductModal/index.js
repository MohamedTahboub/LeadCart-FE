import React, { Component } from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import * as modalsActions from 'actions/modals';
import PaymentType from 'components/PaymentType';
import common from 'components/common';

import './style.css';

const { InputRow, Button, MainTitle } = common;
class CreateProductModal extends Component {
  state = {
    currentProduct: false
  }

  onCreateNewProduct = () => {
    // create and success or fail message and redirect to products
    this.setState({
      currentProduct: true
    });
    this.props.createNewProduct();
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onNewProductFieldChange({ name, value });
  }

  onProductImageUploaded = (image) => {
    this.props.onNewProductFieldChange({ name: 'image', value: image });
  }

  onPaymentChange = ({ payment, price: amount }) => {
    // const { price: amount, ...paymentMethod } = payment;
    // const casted = { type: paymentMethod.type };

    if (payment.type === 'Subscription') {
      payment.recurringPeriod = {
        Monthly: 'MONTH',
        Yearly: 'YEAR'
      }[payment.recurringPeriod || 'Monthly'];
    }

    this.props.onNewProductFieldChange({ name: 'price', value: { amount: +(amount) } });
    this.props.onNewProductFieldChange({ name: 'payment', value: payment });
  }

  componentDidUpdate (preprop) {
    if (preprop.url !== this.props.url) {
      this.setState({
        url: this.props.url
      });
    }
  }

  componentDidUpdate = () => {
    const {
      url, history, isAproductCreated, toggleCreateProductModal
    } = this.props;
    if (isAproductCreated && this.state.currentProduct) {
      setTimeout(() => {
        toggleCreateProductModal();
        history.push(`/product/${this.state.url}/details`);
      }, 320);
      this.setState({ currentProduct: false, url });
    }
  }

  render () {
    const {
      toggleCreateProductModal, isVisible, subdomain, isAproductCreated, errors = {}
    } = this.props;
    return (
      <Modal onClose={toggleCreateProductModal} isVisible={isVisible}>
        <MainTitle>Create Product</MainTitle>
        <InputRow>
          <InputRow.Label error={errors.name}>Product Name</InputRow.Label>
          <InputRow.NormalInput name='name' error={errors.name} onChange={this.onFieldChange}></InputRow.NormalInput>
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.url}>URL</InputRow.Label>
          <InputRow.UrlSuffixInput name='url' onChange={this.onFieldChange} subdomain={subdomain} error={errors.url}></InputRow.UrlSuffixInput>
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.description}>Description</InputRow.Label>
          <InputRow.TextAreaInput name='description' onChange={this.onFieldChange} error={errors.description}>This is nimesil forte!</InputRow.TextAreaInput>
        </InputRow>

        <PaymentType type='' onChange={this.onPaymentChange} error={errors.payment} />
        {errors.message && <span className='error-message'>{errors.message}</span>}
        {(isAproductCreated && this.state.currentProduct) && <span className='success-message'>Created successfully</span>}
        <Button onClick={this.onCreateNewProduct} classes='primary-color margin-with-float-right'>
          <i className='fas fa-plus' />
          {' '}
          Create Product
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = ({ product: { newProduct, mandatoryDetails }, user, modals }) => ({
  url: newProduct.url,
  isAproductCreated: newProduct.isAproductCreated,
  errors: newProduct.errors,
  subdomain: user.user.subDomain,
  isVisible: modals.product.isVisible,
  productDetails: newProduct,
});

export default connect(mapStateToProps, { ...producActions, ...modalsActions })(CreateProductModal);
