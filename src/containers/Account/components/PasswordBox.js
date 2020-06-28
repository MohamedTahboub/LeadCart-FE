import React, { useState } from 'react';

import { notification } from 'libs';
import { notEmptyObj } from 'libs/checks';
import common from 'components/common';

const { InputRow, FlexBox, Button } = common;
const { Label, TextField } = InputRow;

const PasswordBox = ({ onUpdate, ...props }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [progress, onProgress] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
    if (notEmptyObj(errors)) setErrors({});
  };
  const onSubmit = () => {
    onProgress(true);
    onUpdate(
      values,
      {
        onSuccess: () => {
          notification.success('Password Changed Successfully');
          setValues({});
          onProgress(false);
        },
        onFailed: (message) => {
          notification.failed(message);
          setErrors({ message });
          onProgress(false);
        }
      }
    );
  };

  return (
    <FlexBox column className='white-bg soft-edges padding-20 margin-10'>
      <FlexBox>
        <div className='title-text'>Change Password</div>
      </FlexBox>
      <FlexBox column spaceBetween>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.currentPassword}>
            Current Password
          </Label>
          <TextField
            name='currentPassword'
            value={values.currentPassword}
            onChange={onChange}
            type='password'
            error={errors.currentPassword}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.newPassword}>
            New Password
          </Label>
          <TextField
            name='newPassword'
            type='password'
            value={values.newPassword}
            onChange={onChange}
            error={errors.newPassword}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.newPasswordConfirmation}>
            Confirm Password
          </Label>
          <TextField
            name='newPasswordConfirmation'
            type='password'
            value={values.newPasswordConfirmation}
            onChange={onChange}
            error={errors.newPasswordConfirmation}
          />
        </FlexBox>
      </FlexBox>
      <FlexBox flexEnd={!errors.message} spaceBetween={errors.message} center='v-center'>
        {errors.message && <div className='error-text'>{errors.message}</div>}
        <Button
          onprogress={progress}
          disabled={progress}
          onClick={onSubmit} className='primary-color'
        >
          Update
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default PasswordBox;
