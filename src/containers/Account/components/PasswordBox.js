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

const PasswordBox = ({ onUpdate, ...props }) => {
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
          // onClose();
        },
        onFailed: (message) => {
          notification.failed(message);
          setErrors({ message });
          // onClose();
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
          <Label error={errors.password}>
                        Current Password
          </Label>
          <TextField
            name='password'
            value={values.password}
            onChange={onChange}
            error={errors.password}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.newPassword}>
                        New Password
          </Label>
          <TextField
            name='newPassword'
            value={values.newPassword}
            onChange={onChange}
            error={errors.newPassword}
          />
        </FlexBox>
        <FlexBox spaceBetween className='margin-v-10'>
          <Label error={errors.confirmedPassword}>
                        Confirm Password
          </Label>
          <TextField
            name='confirmedPassword'
            value={values.confirmedPassword}
            onChange={onChange}
            error={errors.confirmedPassword}
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

PasswordBox.propTypes = {

};

export default PasswordBox;
