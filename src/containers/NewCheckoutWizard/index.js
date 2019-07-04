import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { SideBar, Header } from './components';
import { ProductEditableTemplate } from '../Product/ProductModal/components'
import { connect } from 'react-redux'
import { ProductSchema } from 'libs/validation';
import *  as productActions from 'actions/product';
import *  as flashMessages from 'actions/flashMessage';

import './style.css'

const {
  Page,
  PageHeader,
  PageContent,
  // NewThingCard,
  // MainTitle,
  // Button
} = common;

const NewCheckoutWizard = ({ products, subdomain, ...props }) => {

  const [fields, setFields] = useState({});
  const [displayType, setDisplayType] = useState('desktop');
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState({ product: true })

  const onChange = ({ target: { name, value } }) => {

    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...fields[key], ...nestedValue };
    }
    setFields({ ...fields, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  useEffect(() => {
    const { url } = props.match.params
    const product = products.find(({ url: u }) => u === url) || {}
    setFields(product);
    if(product._id)
      setLoading({ product: false })
    return () => {
      setFields({});
    };
  }, [products]);

  const onDisplayChange = (type) => {
    setDisplayType(type)
  }

  const onSave = async () => {

    const {
      isValid,
      errors,
      value: product
    } = await ProductSchema(fields);

    if (!isValid) {
      props.showFlashMessage({
        type: 'failed',
        message: `Check the products Fields And Try a gain\n${errors}`
      })
      return setErrors(errors)
    }

    props.updateProduct(
      {
        productId: fields._id,
        details: product
      },
      {
        onSuccess: (msg) => {
          props.showFlashMessage({
            type: 'success',
            message: `Your Changes Saved Successfully`
          })
        },
        onFailed: (message) => {
          props.showFlashMessage({
            type: 'failed',
            message: `Check the Fields And Try a gain\n${errors}`
          })
        }
      })

  }

  return (
    <div className={`checkout-wizard-page ${loading.product ? 'loading' : ''}`}>
      {loading.product && <div className="loading-layer"></div>}
      <Header
        onChange={onChange}
        onDisplayChange={onDisplayChange}
        type={displayType}
        subdomain={subdomain}
        product={fields}
        onSave={onSave}
      />
      <SideBar onChange={onChange} product={fields} />
      <div className="checkout-wizard-container" >
        <ProductEditableTemplate
          className={`${displayType}`}
          product={fields}
          onChange={onChange}
          errors={errors}
        // onOptionSelected={this.onOptionSelected}
        />
      </div>
    </div>
  )
};

NewCheckoutWizard.propTypes = {

};

NewCheckoutWizard.defaultProps = {
  products: []
}

const mapStateToProps = ({
  products: { products } = {},
  user: { user: { subDomain: subdomain } }
}) => ({ products, subdomain })
export default connect(mapStateToProps, { ...productActions, ...flashMessages })(NewCheckoutWizard);
