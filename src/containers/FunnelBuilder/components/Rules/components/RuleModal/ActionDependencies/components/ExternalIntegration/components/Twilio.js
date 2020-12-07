import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as IntegrationsActions from 'actions/integrations';
import common from 'components/common';
import PhoneNumberInput from 'components/common/Inputs/PhoneNumberInput';
import { isFunction } from 'libs/checks';
import { notification } from 'libs';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const { FlexBox, Spinners, InputRow, Button } = common;
const { Label, TextAreaInput } = InputRow;
const { Loader } = Spinners;

const allowedFields = ['fromNumber', 'text'];
const TwilioIntegration = ({ metaData = {}, integrationKey, onChange, ...props }) => {
  console.log({ metaData });
  const [fields, setValues] = useState(metaData);
  const [loading, setLoading] = useState(false);
  const [toggleTest, setToggleTest] = useState(false);

  const postActions = {
    onSuccess: (data) => {

      setLoading(false);
      notification.success(`A test SMS was sent ${fields.toNumber ? `to ${fields.toNumber}` : ''}`);
    },
    onFailed: (message) => {
      setLoading(false);
      notification.failed(message);
    }
  };

  const sendTestSMS = () => {
    setLoading(true);
    props.sendTwilioTestSMS(fields, postActions);
  };

  useEffect(() => {
    setValues(metaData);
  }, []);

  const _onChange = ({ target: { value, name } }) => {
    setValues({ ...fields, [name]: value });
    console.log({ name, value });
    if (isFunction(onChange) && allowedFields.includes(name)) {
      onChange({
        target: {
          value,
          name: `action.metaData.${name}`
        }
      });
    }
  };

  const toggleTestNumber = () => setToggleTest((open) => !open);
  return (
    <FlexBox column flex>
      <FlexBox flex className='my-3' center='v-center'>
        <Label className='gray-text'>From Phone Number</Label>
        <PhoneNumberInput
          name='fromNumber'
          onChange={_onChange}
          value={fields.fromNumber}
          className='funnel-rule-phone-input'
        />
      </FlexBox>
      <FlexBox flex flexStart className='mb-3'>
        <Label notes='you can tag the customer first name or last name using {field}, e.g. Hi {firstName} {lastName}.' className='gray-text'>Message Content</Label>
        <TextAreaInput
          placeholder='E.g. Hi {firstName} {lastName}'
          name='text'
          onChange={_onChange}
          countable={false}
          value={fields.text}
        />
      </FlexBox>
      <FlexBox flex flexEnd className='mb-2'>
        {!toggleTest && (
          <span className='large-text gray-text item-clickable animate' onClick={toggleTestNumber}>
                 Want to test before saving?
          </span>
        )}
      </FlexBox>
      {toggleTest && (
        <FlexBox center='v-center'>
          <span className='title-text gray-text mr-2'>To Number</span>
          <PhoneNumberInput
            placeholder='to number phone'
            name='toNumber'
            onChange={_onChange}
            className='funnel-rule-phone-input'
          />
          <Button onprogress={loading} onClick={sendTestSMS} className='light-btn mx-2'>Send test SMS</Button>

          <FlexBox center='v-center' className='small-text gray-text item-clickable animate' onClick={toggleTestNumber}>
            <AiOutlineCloseCircle color='currentColor' size={22}/>
            <span>
                Close the test form
            </span>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  );
};

TwilioIntegration.propTypes = {};

export default connect(null, IntegrationsActions)(TwilioIntegration);
