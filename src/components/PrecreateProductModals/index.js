import React, { useState , useEffect } from 'react'
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

const getTemplateColor = (template) => {
    const schema =  {
        "temp1": "rgb(6, 147, 227)",
        "temp2": "rgb(247, 141, 167)",
        "temp3": "rgb(0, 208, 132)",
        "temp4": "rgb(255, 105, 0)",
        "temp5": "rgb(235, 20, 76)",
        "temp6": "#3F51B5",
    }
    return schema[template] ? schema[template] : schema['temp1']
}


const ProductCategoryModal = ({ show, onClose, ...props }) => {
    const [next, setNext] = useState('categories')
    const [progress, setProgress] = useState(false)

    const onNext = nextInterface => () => {
        setNext(nextInterface)
    }

    useEffect(()=>{
        return ()=>{
            setNext('categories')
        }
    },[show]);

    const onSubmit = ({ template }) => {
        const product = productSample
        product.checkoutPage.template = template
        product.checkoutPage.presetColors = getTemplateColor(template)
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
