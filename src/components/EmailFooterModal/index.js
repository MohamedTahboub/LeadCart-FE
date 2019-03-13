import React, { Component } from 'react'
import { Modal } from '../Modals'
import common from '../common'
import { connect } from 'react-redux'
import * as emailsActions from 'actions/emails'

const { InputRow, Button, MainTitle } = common;


class EmailFooterModal extends Component {
    state = { details: {} }
    componentDidMount() {
        const { supportEmail } = this.props
        this.setState({
            details: {
                support: supportEmail ? supportEmail : ""
            }
        })
    }
    onFieldChange = ({ target: { name, value } }) => {
        if (value.trim().length) {
            const { details } = this.state
            this.setState({
                details: {
                    ...details,
                    [name]: value
                }
            })
        }
    }

    onEnable = () => {
        const { details } = this.state
        // vaidate the fields and the data types

        this.props.enableEmailFooter(details)
        console.log(details)
    }
    render() {
        const {
            props: { onClose, isVisible, supportEmail, ...props },
            state: { enabling, errors, success }
        } = this
        return (
            <Modal isVisible={isVisible} onClose={onClose} >
                <MainTitle>Enable Email Footer Details</MainTitle>
                <InputRow>
                    <InputRow.Label >Support Email</InputRow.Label>
                    <InputRow.NormalInput name='support' value={supportEmail} onChange={this.onFieldChange}></InputRow.NormalInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label >Company Phone No.</InputRow.Label>
                    <InputRow.NormalInput name='phone' onChange={this.onFieldChange}></InputRow.NormalInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label >Company Address</InputRow.Label>
                    <InputRow.NormalInput name='address' onChange={this.onFieldChange}></InputRow.NormalInput>
                </InputRow>
                <Button
                    onClick={this.onEnable}
                    className={`primary-color margin-with-float-right ${enabling ? 'spinner' : ''}`}
                >
                    <i className='fas fa-plus' />
                    {' '}
                    Save and Enable
              </Button>
            </Modal>
        )
    }
}

const mapStateToProps = ({ user: { user: { email: supportEmail } } }) => ({ supportEmail })
export default connect(mapStateToProps, emailsActions)(EmailFooterModal)