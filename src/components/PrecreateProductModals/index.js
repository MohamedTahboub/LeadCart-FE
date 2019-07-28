import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../Modals'
import ProductCategories from './ProductCategories'
import TemplatesList from './TemplatesList'
import productSample from 'data/product.json';
import * as productActions from 'actions/product';
import { connect } from 'react-redux'
import ids from 'shortid'
import common from '../common'

import './style.css'

const {
    Button
} = common
const ProductCategoryModal = ({ show,onClose, ...props }) => {
    const [next, setNext] = useState('categories')
    const [progress, setProgress] = useState(false)

    const onNext = nextInterface => () => {
        setNext(nextInterface)
    }

    const onSubmit = ({ template }) => {
        const product = productSample
        product.checkoutPage.template = template
        product.url = ids.generate()

        setProgress(true)
        props.createNewProduct(
            product,
            {
                onSuccess: (product) => {
                    setProgress(false)
                    setTimeout(() => {
                        props.history.push(`/products/${product.url}`)
                    }, 300);
                },
                onFailed: (message) => {
                    setProgress(false)

                }
            })
    }

    const onTemplateSelect = template => () => {
        onSubmit({ template })
    }

    return (
        <Modal
            containerClassName=''
            className='transparent-bg'
            isVisible={show}
            hideCloseBtn
            footer={(
                <Button
                    onClick={onClose}
                    className='percreate-product-modal-cancel-btn'
                >
                    Cancel
                </Button>
            )}
        >
            {next === 'categories' ? (
                <ProductCategories onSelect={onNext('templatesList')} />
            )
                :
                <TemplatesList onSelect={onTemplateSelect} />
            }

        </Modal>
    )
}

ProductCategoryModal.propTypes = {
    show: PropTypes.bool
}

ProductCategoryModal.defaultProps = {
    show: false,
}

export default connect(null, productActions)(ProductCategoryModal)
