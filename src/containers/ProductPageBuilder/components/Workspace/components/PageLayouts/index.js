import React from 'react'
import common from 'components/common';
import {
    OneColumnLayout,
    TwoColumnLayout
} from './components';

const { LayoutSwitch } = common;

const ProductLayout = ({ layout, ...props }) => {

    console.log(layout)
    return (
        <LayoutSwitch active={layout}>
            <OneColumnLayout id='one-column' {...props} />
            <TwoColumnLayout id='two-column' {...props} />
        </LayoutSwitch>
    )
}

ProductLayout.defaultProps = { layout: 'one-column' };

export default ProductLayout;