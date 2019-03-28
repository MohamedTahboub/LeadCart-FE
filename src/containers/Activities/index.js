import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CustomerList from './sub/CustomerList'
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
    SubTabs } = common


export default (props) => {

    const onExportToCSV = (fileName, dataRows) => {
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
                    defaultTab='Customers'
                    tabs={{
                        'Customers': <CustomerList onExport={onExportToCSV} />,
                        'Orders': <Orders onExport={onExportToCSV} />,
                        'Subscriptions': <Subscriptions onExport={onExportToCSV} />
                    }}
                />
            </PageContent>
        </Page>
    );
}
