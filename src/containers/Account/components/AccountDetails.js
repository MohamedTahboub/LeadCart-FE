import React, { useState, useEffect } from 'react';
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

const AccountDetails = ({ onUpdate, user, ...porps }) => {
  const [values, setValues] = useState(user);
  const [errors, setErrors] = useState({});
  const [progress, onProgress] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };
  const onSubmit = () => {
    const userDetails = {
      firstName: values.firstName,
      lastName: values.lastName,
    };
    onProgress(true);
    onUpdate(
      userDetails,
      {
        onSuccess: () => {
          notification.success('Your Details Changes Successfully');
          onProgress(false);
          //   onClose();
        },
        onFailed: (message) => {
          onProgress(false);
          setErrors({ message });
          notification.failed(message);
          //   onClose();
        }
      }
    );
  };

  useEffect(() => {
    setValues(user);
  }, [user]);
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
            autoComplete='off'
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
            autoComplete='off'
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
      <FlexBox flexEnd={!errors.message} spaceBetween={errors.message} center='v-center'>
        {errors.message && <div className='error-text'>{errors.message}</div>}
        <Button
          onClick={onSubmit}
          className='primary-color'
          onprogress={progress}
          disabled={progress}
        >
          Update
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

AccountDetails.propTypes = {

};
AccountDetails.default = {
  user: {}
};

export default AccountDetails;
