import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'libs';
import common from 'components/common';
const {
  //   MainTitle,
  //   Page,
  //   PageHeader,
  //   PageContent,
  InputRow,
  FlexBox,
  //   Tabel,
  Button,
  //   FlexBoxesContainer
} = common;

const { Label, TextField } = InputRow;

const AccountDetails = ({ onUpdate, ...porps }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const onSubmit = () => {
    onUpdate(
      values,
      {
        onSuccess: () => {
          notification.success('Password Changed Successfully');
        //   onClose();
        },
        onFailed: (message) => {
          notification.failed(message);
          setErrors({ message });
        //   onClose();
        }
      }
    );
  };

  return (
    <FlexBox column className='white-bg soft-edges padding-20 margin-10'>
      <FlexBox>
        <div className='title-text'>User Details</div>
      </FlexBox>
      <FlexBox column spaceBetween>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.lastName}>
                        First Name
          </Label>
          <TextField
            name='firstName'
            value={values.firstName}
            onChange={onChange}
            error={errors.firstName}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.lastName}>
                        Last Name
          </Label>
          <TextField
            name='lastName'
            value={values.lastName}
            onChange={onChange}
            error={errors.lastName}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.email}>
                        Email
          </Label>
          <TextField
            name='email'
            value={values.email}
            disabled
          />
        </FlexBox>
      </FlexBox>
      <FlexBox flexEnd>
        <Button onClick={onSubmit} className='primary-color'>
                    Update
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

AccountDetails.propTypes = {

};

export default AccountDetails;
