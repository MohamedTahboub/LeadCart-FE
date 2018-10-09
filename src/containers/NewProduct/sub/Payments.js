import React from 'react'
import common from 'components/common'

import paypalImage from 'assets/images/paypal.png'
import stripeImage from 'assets/images/stripe.png'

const { MainTitle, MiniCard } = common

export default props => (
    <React.Fragment>
        <MainTitle
            handle={{ label: 'Edite', iconClass: 'fa-edit' }}
        >Payment Method</MainTitle>
        <MiniCard imgSrc={stripeImage} />
        <MiniCard imgSrc={paypalImage} />
    </React.Fragment>
)