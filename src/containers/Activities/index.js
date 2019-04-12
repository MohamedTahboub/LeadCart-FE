import React, { useState } from 'react';
import Orders from './sub/Orders'
import Subscriptions from './sub/Subscriptions'

import './style.css'
// import ProductDetailes from './sub/ProductDetails'

import common from 'components/common'

const {
    MainTitle,
    Page,
    PageHeader,
    PageContent,
    SubTabs
} = common


export default (props) => {
    const [csvData, setCsvData] = useState('')
    const [activeTab, setActiveTab] = useState('Orders');

    const onExportToCSV = () => {
        const dataRows = csvData;
        const fileName = `${activeTab}.csv}`
        const download = document.createElement('a');
        const filehref = `data:text/csv;charset=utf-8,${encodeURIComponent(dataRows)}`;
        download.setAttribute('href', filehref);
        download.setAttribute('download', fileName);
        download.click();
    }

    return (
        <Page className='products-details-page'>
            <PageHeader>
                <MainTitle>Activities</MainTitle>
                <div
                    onClick={onExportToCSV}
                    className='btn primary-color'
                >
                    Explore.CSV
                </div>
            </PageHeader>
            <PageContent>
                <SubTabs
                    defaultTab='Orders'
                    onTabChange={setActiveTab}
                    tabs={{
                        'Orders': <Orders updateCsvData={data => setCsvData(data)} />,
                        'Subscriptions': <Subscriptions updateCsvData={data => setCsvData(data)} />
                    }}
                />
            </PageContent>
        </Page>
    );
}
