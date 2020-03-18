import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';

import common from 'components/common';
const {

  InputRow,
  FlexBox,
  Badge,
  Table,
  Button,
  //   FlexBoxesContainer
} = common;

const { Label, TextField, SelectOption } = InputRow;

const CreateModal = ({
  onClose, onCreate, open, ...props
}) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
    setErrors({});
  };

  const onSubmit = () => {
    onCreate(values, () => {
      onClose();
      setValues({});
      setErrors({});
    });
  };

  return (
    <Modal isVisible onClose={onClose} key='brand-form'>
      <div className='title-text'>Create New Brand</div>
      <FlexBox column spaceBetween>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.name}>
            Brand Name
          </Label>
          <TextField
            name='name'
            value={values.name}
            onChange={onChange}
            error={errors.name}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.subdomain}>
            subdomain
          </Label>
          <TextField
            name='subDomain'
            value={values.subdomain}
            onChange={onChange}
            error={errors.subdomain}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.package}>
            Package
          </Label>
          <SelectOption
            name='package'
            className='flex-box flex'
            value={values.package}
            onChange={onChange}
            options={[
              {
                label: 'Premium', value: 'Premium'
              },
              { label: 'Pro', value: 'Pro' },
              {
                label: 'Basic', value: 'Basic',
              }
            ]}
            error={errors.package}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox flexEnd>
        <Button onClick={onSubmit} className='primary-btn'>
          Create
        </Button>
      </FlexBox>
    </Modal>
  );
};

CreateModal.propTypes = {

};

export default CreateModal;
