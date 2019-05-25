import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import * as fulfillmentsActions from 'actions/fulfillments'
import { FulfillmentsTypesForms } from '.';
import { Modal } from 'components/Modals';
import common from 'components/common';
import { FulfillmentsValidationSchema } from 'libs/validation'

const {
    MainTitle,
    Button,
    InputRow,
} = common;

const FulfillmentForm = ({
    show,
    onClose,
    isNew,
    data = {},
    ...props
}) => {
    if (typeof data === 'boolean')
        data = {}

    const initialFulfillment = { type: 'noFulfillment', ...data }
    const [fulfillment, setFulfillment] = useState(initialFulfillment)
    const [errors, setErrors] = useState({})

    // useEffect(() => {
    //     setFulfillment(data)
    // }, [data])

    const onChange = ({ target: { name, value } }) => {

        if (name.includes('.')) {
            const [key, nestedKey] = name.split('.');
            const nestedValue = { [nestedKey]: value };
            name = key;
            value = { ...fulfillment[key], ...nestedValue };
        }

        setFulfillment({ ...fulfillment, [name]: value })
        setErrors({})
    };
    const createFulfillment = async () => {
        try {
            const { isValid, value, errors } = await FulfillmentsValidationSchema(fulfillment);
            if (!isValid) return setErrors({...errors});

            props.createFulfillment(
                value
                ,
                {
                    onSuccess: (m) => {
                        onClose()
                    },
                    onFailed: (message ) => setErrors({ message })
                });
        } catch ({ message, ...err }) {
            setErrors({ message });
        }
    }
    const updateFulfillment = async () => {

        try {
            const { isValid, value, errors } = await FulfillmentsValidationSchema(fulfillment);
            if (!isValid) return setErrors({...errors});
            
            props.updateFulfillment(
                {
                    details: value,
                    fulfillmentId: fulfillment._id
                }
                ,
                {
                    onSuccess: () => {
                        onClose()
                    },
                    onFailed: (message) => {
                        setErrors({ message })
                    }
                });
        } catch ({ message }) {
            setErrors({ message });
        }
    }
    const {
        name,
        type
    } = fulfillment
    return (
        <Modal onClose={onClose} isVisible={show}>
            <MainTitle>
                {`${isNew ? 'Create' : 'Update'} `}
                Fulfillment
      </MainTitle>
            <InputRow>
                <InputRow.Label>
                    fulfillment Name:
                </InputRow.Label>
                <InputRow.SmallInput
                    name='name'
                    value={name}
                    onChange={onChange}
                    error={errors.name}
                />
            </InputRow>
            <InputRow>
                <InputRow.Label>
                    fulfillment Type:
                </InputRow.Label>
                <InputRow.SelectOption
                    value={type}
                    name='type'
                    error={errors.type}
                    onChange={onChange}
                    className='asste-type-dropdown'
                    options={[
                        { label: 'No Fulfillment', value: 'noFulfillment' },
                        { label: 'Manual Fulfillment', value: 'manual' },
                        { label: 'Success Urls Fulfillment', value: 'successUrls' },
                        { label: 'Zapier Integrations Fulfillment', value: 'integration' }
                    ]}
                />
            </InputRow>
            <FulfillmentsTypesForms
                type={type}
                onChange={onChange}
                errors={errors}
                data={fulfillment}
            />
            {errors.message && (
                <span
                    className='error-message'
                >
                    {errors.message}
                </span>
            )}
            <Button
                onClick={isNew ? createFulfillment : updateFulfillment}
                className='primary-color margin-with-float-right'
            >
                <i className='fas fa-plus' />
                {' '}
                {`${isNew ? 'Create' : 'Update'} `}
            </Button>
        </Modal>
    );
};

FulfillmentForm.propTypes = {}
export default connect(null, fulfillmentsActions)(FulfillmentForm);
