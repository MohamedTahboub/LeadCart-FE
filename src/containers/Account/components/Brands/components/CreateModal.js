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
  };

  const onSubmit = () => {
    onCreate(values, () => {
      onClose();
    });
  };
  return (
    <Modal isVisible onClose={onClose}>
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
            name='subdomain'
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
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.supportEmail}>
            Support Email
          </Label>
          <TextField
            name='supportEmail'
            value={values.supportEmail}
            onChange={onChange}
            error={errors.supportEmail}
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
