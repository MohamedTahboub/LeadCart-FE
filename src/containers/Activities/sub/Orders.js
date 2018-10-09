import React from 'react';
import { LineChart } from 'components/LeadCartCharts'
import common from 'components/common'
import Tabel from 'components/common/Tabels'
import './style.css'

import customersList from 'data/customers'

const { Avatar, SmallButton, MainTitle } = common

export default props => (
    <React.Fragment>
        <div className='chart-preview section-box margin-top-20'>
            <div className='chart-head'>
                <div className='chart-head-child'>
                    <span className='chart-title'>Orders Statistics</span>
                    <span className='chart-total-profite'>
                        <span className='chart-profit-value'>
                            10 789
                    </span>

                    </span>
                </div>

                <div className='chart-head-child'></div>

                <div className='chart-head-child'>
                    <div className='chart-preview-options'>
                        <span className='chart-option'>day</span>
                        <span className='chart-option'>week</span>
                        <span className='chart-option'>month</span>
                        <span className='chart-option'>year</span>
                    </div>
                </div>
            </div>

            <div className='chart-body'>
                <LineChart />
            </div>
        </div>
        <MainTitle>Order List</MainTitle>
        <Tabel>
            <Tabel.Head>
                <Tabel.SmallCell />
                <Tabel.HeadCell>Name</Tabel.HeadCell>
                <Tabel.HeadCell>Email</Tabel.HeadCell>
                <Tabel.HeadCell>Status</Tabel.HeadCell>
                <Tabel.HeadCell>Processor</Tabel.HeadCell>
                <Tabel.HeadCell>Quantity</Tabel.HeadCell>
                <Tabel.HeadCell>Coupon</Tabel.HeadCell>
                <Tabel.HeadCell>Type</Tabel.HeadCell>
                <Tabel.HeadCell>Order Date</Tabel.HeadCell>
            </Tabel.Head>
            <Tabel.Body>
                <Tabel.Row>
                    <Tabel.SmallCell >
                        <Avatar name='Nimesil' />
                    </Tabel.SmallCell>
                    <Tabel.Cell
                        mainContent='Nimesil Forte'
                    />
                    <Tabel.Cell
                        mainContent="vincent@gmail.com"
                    />
                    <Tabel.Cell>
                        <SmallButton classes='green-color' >Active</SmallButton>
                    </Tabel.Cell>

                    <Tabel.Cell mainContent='_' ></Tabel.Cell>
                    <Tabel.Cell mainContent='132' ></Tabel.Cell>
                    <Tabel.Cell mainContent='None' ></Tabel.Cell>
                    <Tabel.Cell mainContent='_' ></Tabel.Cell>
                    <Tabel.Cell mainContent='21 Jun 2018' ></Tabel.Cell>
                </Tabel.Row>
            </Tabel.Body>
        </Tabel>
        <span className="btn primary-color explort-csv-btn">Explore.CSV</span>
    </React.Fragment>
)