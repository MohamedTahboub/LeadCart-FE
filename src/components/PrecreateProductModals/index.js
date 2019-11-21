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
import ids from 'shortid'
import common from '../common'



/*
    "products":{
        "defaults":{
            "temp5":{
                "description":"<h1>Product Name</h1><p><br></p><h1 class=\"ql-align-justify\"><span class=\"ql-size-small\">Get The Simple Script That Effortlessly Convinces Your Customers To Spend More Money With You...FOR FREE!</span></h1>",
                "features":"<h2><strong>What You Get</strong></h2><p class=\"ql-align-center\"><br></p><p><strong style=\"color: rgb(68, 68, 68);\" class=\"ql-size-large\">👉 Ability to create any membership type</strong></p><p><strong style=\"color: rgb(68, 68, 68);\" class=\"ql-size-large\">👉 Ability to define membership access level</strong></p><p><strong style=\"color: rgb(68, 68, 68);\" class=\"ql-size-large\">👉 Ability to define customized membership requirements</strong></p><p><strong style=\"color: rgb(68, 68, 68);\" class=\"ql-size-large\">👉 Design templates editor in Control Panel</strong></p><p><strong style=\"color: rgb(68, 68, 68);\" class=\"ql-size-large\">👉 \"Bad words\" customization filter</strong></p><p><br></p><p><br></p>"
            }

*/
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
    const [progress, setProgress] = useState(false)
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

        if (template === 'temp5') {
            const {
                description: defaultDescription,
                features: defaultFeatures
            } = hardCodedMessages.products.defaults.temp5

            product.description = defaultDescription
            if (product.features && product.features.title) {
                product.features.title = defaultFeatures
            }
        }
        setProgress(true)
        props.createNewProduct(
            product,
            {
                onSuccess: (product) => {
                    setProgress(false)
                    setTimeout(() => {
                        props.history.push(`/${category}/${product.id}`)
                    }, 300);
                },
                onFailed: (message) => {
                    setProgress(false)

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
