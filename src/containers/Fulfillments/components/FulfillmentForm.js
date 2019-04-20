import React, { useState, useEffect } from 'react';
import { FulfillmentsTypesForms } from '.';
import { Modal } from 'components/Modals';
import common from 'components/common';

const {
    MainTitle,
    Button,
    InputRow,
} = common;

const FulfillmentForm = ({
    show,
    onClose,
    isNew,
    data = {}
}) => {
    console.log('Fulfillment' , data)
    const initialFulfillment = { ...data, type: 'noFulfillment' }
    const [fulfillment, setFulfillment] = useState(initialFulfillment)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setFulfillment(data)
    }, [data])

    const onChange = ({ target: { name, value } }) => {

        if (name.includes('.')) {
            const [key, nestedKey] = name.split('.');
            const nestedValue = { [nestedKey]: value };
            name = key;
            value = { ...fulfillment[key], ...nestedValue };
        }

        const data = { ...fulfillment, [name]: value }
        setFulfillment(data)
        console.log(data)
    };
    const createFulfillment = () => {
        console.log('Create', fulfillment)
    }
    const updateFulfillment = () => {
        console.log('Update', fulfillment)
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
                        { label: 'Zapire Integrations Fulfillment', value: 'integration' }
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
export default FulfillmentForm;
