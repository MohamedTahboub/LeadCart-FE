import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../Modals'
import ProductCategories from './ProductCategories'
import { CheckoutTemplates, UpsellsTemplates } from './TemplatesList'
import productSample from 'data/product.json';
import hardCodedMessages from 'assets/hardCodedMessages.json'
import upsellSample from 'data/upsell.json';
import * as productActions from 'actions/product';
import { connect } from 'react-redux'
import common from '../common'
import { notification } from 'libs'

import './style.css'

const {
    Button
} = common

const getTemplateColor = (template) => {
    const schema = {
        "temp1": "rgb(6, 147, 227)",
        "temp2": "rgb(247, 141, 167)",
        "temp3": "rgb(0, 208, 132)",
        "temp4": "rgb(255, 105, 0)",
        "temp5": "rgb(235, 20, 76)",
        "temp6": "rgb(247, 141, 167)",
    }
    return schema[template] ? schema[template] : schema['temp1']
}

const NextPage = ({ page, ...props }) => {
    switch (page) {
        case "categories": return <ProductCategories  {...props} />
        case "checkoutTemplates": return <CheckoutTemplates {...props} />
        case "upsellsTemplates": return <UpsellsTemplates {...props} />
        default: return <ProductCategories  {...props} />
    }
}


const ProductCategoryModal = ({ show, onClose, ...props }) => {
    const [next, setNext] = useState('categories')
    // const [progress, setProgress] = useState(false)
    const [category, setCategory] = useState('checkout');

    const onNext = (nextInterface, category) => () => {
        if (category) {
            setCategory(category)
        }
        setNext(nextInterface)
    }

    useEffect(() => {
        return () => {
            setNext('categories')
        }
    }, [show]);

    const onSubmit = (template) => () => {
        const product = category === 'checkout' ? productSample : upsellSample
        product.pagePreferences.template = template
        product.pagePreferences.themeColor = getTemplateColor(template)
        // product.url = ids.generate()
        // product.category = category

        if (template === 'temp6') {
            const {
                description: defaultDescription,
                features: defaultFeatures
            } = hardCodedMessages.products.defaults.temp6

            product.pagePreferences.description = defaultDescription
            if (product.pagePreferences.features && product.pagePreferences.features.title) {
                product.pagePreferences.features.title = defaultFeatures
            }
        }
        // setProgress(true)
        props.createNewProduct(
            product,
            {
                onSuccess: (product) => {
                    // setProgress(false)
                    console.log('notification' , notification)
    
                    notification.success('Product Created')
                    setTimeout(() => {
                        props.history.push(`/${category}/${product.id}`)
                    }, 300);
                },
                onFailed: (message) => {
                    notification.success(message)
                    // setProgress(false)

                }
            })
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
            <NextPage
                page={next}
                onSelect={onNext}
                onSubmit={onSubmit}
            />
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
