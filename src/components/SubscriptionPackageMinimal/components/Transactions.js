import React from 'react'
// import PropTypes from 'prop-types'
import common from '../../common'
import moment from 'moment'

const {
    Table,
    MainBlock,
    Avatar
} = common;

const Transactions = ({ list }) => {
    return (
        <MainBlock title='Transactions History'>
            <Table>
                <Table.Head>
                    <Table.SmallCell />
                    <Table.HeadCell>Package</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>Issued On</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {list
                        .map((transaction, orderInList) => {
                            const {
                                _id,
                                amount = 0,
                                description,
                                name,
                                updatedAt
                            } = transaction
                            return (
                                <Table.Row
                                    key={`${_id}-${orderInList}`}
                                    orderInList={orderInList}
                                    className='transaction-table-row'
                                >
                                    <Table.SmallCell>
                                        <Avatar name={name} />
                                    </Table.SmallCell>
                                    <Table.Cell mainContent={name} />
                                    <Table.Cell mainContent={description} />
                                    <Table.Cell mainContent={`$ ${amount}`} />
                                    <Table.Cell mainContent={moment(updatedAt).format('MMMM DD, YYYY')} />

                                </Table.Row>
                            )
                        })}

                </Table.Body>
            </Table>
        </MainBlock>
    )
}

Transactions.propTypes = {

}

export default Transactions
