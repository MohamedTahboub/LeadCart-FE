import React, { Component } from 'react'
import Modal from 'components/Modal'

import common from 'components/common'

const { InputRow, MainBlock, Button, MainTitle } = common

export default class Coupons extends Component {
    state = { isModalVisable: false }
    toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })
    render = () => (
        <div className='coupons-page'>
            <MainBlock title='Coupons'>
                <InputRow>
                    <InputRow.Label>Allow Coupons</InputRow.Label>
                    <InputRow.SwitchInput />
                </InputRow>
                <InputRow>
                    <InputRow.Label>Configure Coupons</InputRow.Label>
                    <InputRow.AddComponentField onClick={this.toggleModal} >Add coupon</InputRow.AddComponentField>
                </InputRow>
            </MainBlock>
            <Modal onClose={this.toggleModal} isVisable={this.state.isModalVisable}>
                <MainTitle>Create Coupon</MainTitle>
                <InputRow>
                    <InputRow.Label>Coupon code</InputRow.Label>
                    <InputRow.CustomInput />
                    <InputRow.CustomInput />
                </InputRow>
                <InputRow>
                    <InputRow.Label>Coupon Description</InputRow.Label>
                    <InputRow.TextAreaInput />
                </InputRow>
                <InputRow>
                    <InputRow.Label>Coupon Type</InputRow.Label>
                    <InputRow.FlatSelect note='Is this percent or flat amount off?' />
                    <InputRow.PriceField note='How much off is your coupon.'>127.45</InputRow.PriceField>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Apply to</InputRow.Label>
                    <InputRow.SelectOption note='Attach to all or a specific product.'
                        options={[
                            { label: 'Apply to all products', value: 0 }
                        ]}
                    />
                </InputRow>
                <Button classes='primary-color margin-with-float-left' >
                    <i className="fas fa-plus"></i> Create Coupon
                    </Button>
            </Modal>
        </div>
    )
}