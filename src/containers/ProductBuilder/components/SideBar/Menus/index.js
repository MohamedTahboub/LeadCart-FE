import React from 'react'
import CheckoutMenu from './CheckoutMenu'
import UpsellMenu from './UpsellMenu'

export default ({ category, ...props }) => {

    switch (category) {
        case 'Checkout': return <CheckoutMenu {...props} />
        case 'UpSell': return <UpsellMenu {...props} />
        default: return <CheckoutMenu {...props} />
    }
}