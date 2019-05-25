import React, { useState, useEffect } from 'react'
import { Modal } from '../Modals'
import common from '../common'
import { connect } from 'react-redux'
import * as emailsActions from 'actions/emails'
import SocialMedia from './socialMedia'
import { emailFooterSchema } from 'libs/validation';

const { InputRow, Button, MainTitle } = common;


const EmailFooterModal = ({
    isVisible,
    supportEmail,
    socialMedia = [],
    companyAddress,
    companyPhone,
    ...props
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({})
    const [footerDetails, setFooterDetails] = useState({
        socialMedia,
        companyAddress,
        companyPhone,
    })

    const onChange = ({ target: { name, value } }) => {
        setFooterDetails({ ...footerDetails, [name]: value });
    }

    const onSubmitEmailFooter = async () => {
        

        const { isValid, value: footerValue, errors } = await emailFooterSchema(footerDetails);
        if (!isValid) return setErrors(errors);

        setSubmitting(true)
        props.updateEmailFooter(footerValue, {
            onSuccess: () => {
                setSubmitting(false)
                props.onClose()
            },
            onFailed: (error) => {
                setSubmitting(false)
                setErrors(error)
            }
        })
    }
    return (
        <Modal isVisible={isVisible} onClose={props.onClose} >
            <MainTitle>Enable Email Footer Details</MainTitle>
            <InputRow>
                <InputRow.Label >Support Email</InputRow.Label>
                <InputRow.NormalInput
                    name='support'
                    value={supportEmail}
                    onChange={onChange}
                    disabled
                ></InputRow.NormalInput>
            </InputRow>
            <InputRow>
                <InputRow.Label error={errors.companyPhone} >Company Phone:</InputRow.Label>
                <InputRow.NormalInput
                    value={footerDetails.companyPhone}
                    error={errors.companyPhone}
                    name='companyPhone'
                    onChange={onChange}
                />
            </InputRow>
            <InputRow>
                <InputRow.Label error={errors.companyAddress} >Company Address:</InputRow.Label>
                <InputRow.NormalInput
                    value={footerDetails.companyAddress}
                    name='companyAddress'
                    onChange={onChange}
                    error={errors.companyAddress}
                />
            </InputRow>
            <SocialMedia
                onChange={onChange}
                links={footerDetails.socialMedia}
            />
            <Button
                onClick={onSubmitEmailFooter}
                className={`primary-color margin-with-float-right ${submitting ? 'spinner' : ''}`}
            >
                <i className='fas fa-plus' />
                {' '}
                Save
              </Button>
        </Modal>
    )
}

const mapStateToProps = ({
    emails: {
        settings: {
            socialMedia,
            companyAddress,
            companyPhone
        }={}
    }={},
    settings: {
        generalModel: {
            supportEmail
        }
    }
}) => ({
    supportEmail,
    socialMedia,
    companyAddress,
    companyPhone
})
export default connect(mapStateToProps, emailsActions)(EmailFooterModal)