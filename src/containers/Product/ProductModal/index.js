import React, { Component } from 'react';
import { SlideModal } from '../../../components/Modals';
import { ProductSettings, ProductEditableTemplate } from './components'
import common from 'components/common'
import { ProductSchema } from 'libs/validation';
import *  as productActions from 'actions/product';
import { connect } from 'react-redux';
import { showIntercomIcon } from 'libs'

import './style.css'

const { Button } = common;

class Product extends Component {

  state = {
    product: {},
    activeOption: '',
    activeTab: 'Available Settings',
    hiddenElements: {}
  }

  onChange = ({ target: { name, value } }) => {
    const { product } = this.state
    console.log("===>", name , value)
    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...product[key], ...nestedValue };
    }
    this.setState({ product: { ...product, [name]: value } })
  }


  onOptionSelected = (activeOption, activeTab) => {
    let tab = activeTab
    if (this.state.activeTab !== 'Available Settings')
      tab = 'Available Settings'
    this.setState({ activeOption, activeTab: tab })
  }


  onToggleElementVisibility = (elName, elLabel) => {
    const { hiddenElements = {} } = this.state
    const { value = true, label = elLabel } = hiddenElements[elName] || {}

    hiddenElements[elName] = { value: !value, label }

    this.setState({ hiddenElements })
  }

  componentDidMount = () => {
    const { product = {} } = this.props
    this.setState({ product: product })
  }

  componentDidUpdate(prev) {
    if (typeof prev.product !== 'string')
      if (prev.product._id !== this.props.product._id)
        this.setState({ product: this.props.product._id })
  }

  onSave = async () => {
    const { product: newProduct } = this.state
    const { isNew, createNewProduct, updateProduct, postCreate } = this.props

    const { isValid, errors, value: product } = await ProductSchema(newProduct);

    console.log('Product Validations ', isValid, errors, product);
    if (!isValid)
      return this.setState({ errors })

    const action = isNew ? createNewProduct : updateProduct
    const payload = isNew ? product : { details: { ...product }, productId: newProduct._id }

    action(payload, {
      onSuccess: (msg) => {
        this.props.onClose()
      },
      onFailed: (message) => this.setState({ errors: { message } })
    })

  }
  render() {
    const {
      state: {
        activeOption, activeTab, hiddenElements, product
      },
      props: {
        isVisible = true, onClose, isNew
      }
    } = this
    return (
      <SlideModal
        isVisible={isVisible}
        onClose={onClose}
        contentClassName='product-update-modal'
        bodyClassName='product-update-modal-body'
      >
        <ProductEditableTemplate product={product} onChange={this.onChange} onOptionSelected={this.onOptionSelected} />
        <ProductSettings >
          <ProductSettings.Headers onChange={this.onChange} product={product} />
          <ProductSettings.General onChange={this.onChange} product={product} />
          <ProductSettings.Available
            key='available-options'
            product={product}
            onToggleElementVisibility={this.onToggleElementVisibility}
            onOptionSelected={this.onOptionSelected}
            activeOption={activeOption}
            activeTab={activeTab}
            onChange={this.onChange}
            hiddenElements={hiddenElements}
          />
          <div className='template-settings-controls'>
            <Button onClick={this.onSave} className='primary-color margin-with-float-right'>
              <i className='fas fa-save' />
              {'Save'}
            </Button>
          </div>
        </ProductSettings>
      </SlideModal>
    );
  }
}


export default connect(null, productActions)(Product);