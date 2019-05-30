import React, { useState } from 'react';
import { connect } from 'react-redux'
import Orders from './sub/Orders'
import Subscriptions from './sub/Subscriptions'

import './style.css'
// import ProductDetailes from './sub/ProductDetails'

import common from 'components/common'




const exportToCsv = (orders) => {
    const titles = 'Name,Email Address,Phone Number,Product Name,Payment Processor,offer included,coupon used,coupon discount,total Charge,product payment Type\n';

    const convertToCSVFormat = orders
        .map(({
            customer: {
                firstName,
                lastName,
                email,
                phoneNumber
            },
            product: {
                name: productName,
                offer: { name: offerName = 'No', price: offerPrice = 0 } = {},
                coupon: { code = '- -', CouponDiscount = 0 } = {}
            } = {},
            payment: {
                paymentType,
                paymentMethod
            },
            totalCharge
        }) => `${firstName} ${lastName},${email},${phoneNumber},${productName},${paymentMethod},${offerName} - ${offerPrice},${code},${CouponDiscount},${totalCharge},${paymentType}`).join('\n');
    return titles + convertToCSVFormat
};


const {
    MainTitle,
    Page,
    PageHeader,
    PageContent,
    SubTabs
} = common





const Activities = ({ orders, subscriptions }) => {
    const [activeTab, setActiveTab] = useState('Orders');

    const onExportToCSV = () => {
        const dataRows = exportToCsv(activeTab === 'Orders' ? orders : subscriptions);
        const fileName = `${activeTab}.csv`
        const download = document.createElement('a');
        const fileHref = `data:text/csv;charset=utf-8,${encodeURIComponent(dataRows)}`;
        download.setAttribute('href', fileHref);
        download.setAttribute('download', fileName);
        download.click();
    }

    return (
        <Page className='products-details-page'>
            <PageHeader>
                <MainTitle>Transactions</MainTitle>
                <div
                    onClick={onExportToCSV}
                    className='btn primary-color'
                >
                    Export csv
                </div>
            </PageHeader>
            <PageContent>
                <SubTabs
                    defaultTab='Orders'
                    onTabChange={setActiveTab}
                    tabs={{
                        'Orders': <Orders orders={orders} />,
                        'Subscriptions': <Subscriptions subscriptions={subscriptions} />
                    }}
                />
            </PageContent>
        </Page>
    );
}



const mapStateToProps = ({ activities: { orders = [], subscriptions = [] } }) => ({
    orders,
    subscriptions
});
export default connect(mapStateToProps)(Activities);
