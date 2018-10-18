import React from 'react'
import common from 'components/common'
import Tabel from 'components/common/Tabels'

const { MainTitle , SmallButton,Button } = common

const AddNewButton = props => (
    <Button classes='primary-color medium-add-btn explort-csv-btn'>
        <i class="fas fa-plus"></i> Add new
    </Button>
)

export default props => (
    <React.Fragment>
        <MainTitle>Sub-Accounts</MainTitle>
        <Tabel>
            <Tabel.Head>
                <Tabel.HeadCell>First Name</Tabel.HeadCell>
                <Tabel.HeadCell>Last Name</Tabel.HeadCell>
                <Tabel.HeadCell>Email Address</Tabel.HeadCell>
                <Tabel.HeadCell>status</Tabel.HeadCell>
            </Tabel.Head>
            <Tabel.Body>
                <Tabel.Row>
                    <Tabel.Cell
                        mainContent='Mohamed'
                    />
                    <Tabel.Cell
                        mainContent="Tahboub"
                    />
                    <Tabel.Cell
                        mainContent="mohamedtahboub@outlook.com"
                    />
                    <Tabel.Cell>
                        <SmallButton classes='green-color' >Active</SmallButton>
                    </Tabel.Cell>
                </Tabel.Row>
            </Tabel.Body>
        </Tabel>
        <AddNewButton/>
    </React.Fragment>
)