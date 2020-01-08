import React, { Fragment, useState } from 'react';
import CustomInputField from 'components/CustomInputField';
import { connect } from 'react-redux';
import * as accountActions from 'actions/account';
import whiteBrandLogo from 'assets/images/leadcart-white-brand.png';
import * as yup from 'yup';
import { IoMdSend, IoMdCheckmarkCircle } from 'react-icons/io';
import './styles.css';


import common from 'components/common';
const {
  FormLogo,
  Feature,
  FlexBox,
  Button,
  InputRow,
  InputGroup
} = common;


const ForgetPassword = (props) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const isValid = await (yup.string().email().required()).isValid(email);

    if (!isValid) return setError('Please macke sure you enter a valida email address');

    setProcessing(true);
    props.forgotPassword(
      { email },
      {
        onSuccess: () => {
          setProcessing(false);
          setSuccess(true);
        },
        onFailed: (message) => {
          setProcessing(false);
          setSuccess(false);
          setError(message);
        }
      }
    );
  };

  const onChange = () => {
    setError('');
  };

  return (
    <FlexBox className='full-page background-image-elements' center='h-center v-center' column>
      <FlexBox className='header-logo-container' wrappable>
        <FlexBox className='min-width-300' flex center='v-center'>
          <img src={whiteBrandLogo} alt='leadcart brand' className='lc-white-logo' />
        </FlexBox>
        <FlexBox flex className='min-width-300' />
        <FlexBox flex className='min-width-300' />
      </FlexBox>
      <FlexBox flex center='v-center'>
        <FlexBox spaceBetween className='form-container padding-bottom-40' wrappable>
          <FlexBox flex spaceBetween className='full-width margin-bottom-30' center='v-center'>
            <span className='login-header-title'>
            {`${!success ? 'Recover Your Password':'Please check your email.'}`}
            </span>
            <a className='gray-text bold-text not-underlined underlined-text small-text animate' href='/login'>
              Back to sign in
            </a>
          </FlexBox>


          {!success ? (
            <Fragment>
              <div className='full-width gray-text large-text margin-bottom-30 bold-text'>
                Enter your email address and we’ll send you a link to
                <br />
                reset your password.
              </div>
              <form onSubmit={onSubmit} className='full-width'>
                <InputGroup
                  name='email'
                  label='Email'
                  type='email'
                  // placeholder='Email Address'
                  error={error}
                  onChange={onChange}
                />

                <Button
                  disabled={processing}
                  type='submit'
                  className='primary-color large-text access-btn'
                >
                  <FlexBox center='h-center' className='full-width'>
                    Send
                    <IoMdSend className='white-text margin-left-20' />
                  </FlexBox>
                </Button>
              </form>
            </Fragment>
          )
            : (
              <FlexBox center='h-center' className='full-width gray-text large-text margin-bottom-30 bold-text'>
                We sent an email to your Inbox, which contains
                <br />
                a link to reset your LeadCart password.
              </FlexBox>
            )}
        </FlexBox>
      </FlexBox>
      <footer className='copyright-text'>
        © LeadCart. All rights reserved 2020
      </footer>
    </FlexBox>
  );
};

export default connect(null, accountActions)(ForgetPassword);
