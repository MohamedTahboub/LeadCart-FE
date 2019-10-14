import React from 'react'
import CheckoutMenu from './CheckoutMenu'
import UpsellMenu from './UpsellMenu'

export default ({ type='upsell', ...props }) => {

    switch (type) {
        case 'checkout': return <CheckoutMenu {...props} />
        case 'upsell': return <UpsellMenu {...props} />
        default: return <CheckoutMenu {...props} />
    }
}