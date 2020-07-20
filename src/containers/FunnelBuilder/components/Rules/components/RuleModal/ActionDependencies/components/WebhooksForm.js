import React from 'react';
import common from 'components/common';

const {
  FlexBox,
  InputRow
} = common;

const { Label, TextField, TextAreaInput, SelectOption } = InputRow;

const WebhooksForm = ({
  onChange,
  url,
  label,
  payloadFormat
}) => {

  return (
    <FlexBox column>
      <FlexBox center='h-center' className='mb-2'>
        <span className='large-text bold-text'>
          What's your webhook details
        </span>
      </FlexBox>
      <FlexBox flexStart column flex>
        <InputRow>
          <FlexBox center='v-center' className='ml-2'>
            <Label>
              Label:
            </Label>
            <TextField
              name='action.metaData.label'
              placeholder='Webhook label'
              onChange={onChange}
              value={label}
            />
          </FlexBox>
        </InputRow>
        <InputRow>
          <FlexBox center='v-center' className='ml-2'>
            <Label>
              Webhook link:
            </Label>
            <TextField
              name='action.metaData.url'
              placeholder='Webhook Url'
              className='webhook-url-field'
              onChange={onChange}
              value={url}
            />
          </FlexBox>
        </InputRow>
        <InputRow>
          <FlexBox center='v-center' className='ml-2'>
            <Label note='Choose the Format you want to receive the webhook data in.'>
              Result Format:
            </Label>
            <SelectOption
              value={payloadFormat}
              className='my-1'
              name='action.metaData.payloadFormat'
              onChange={onChange}
              options={[
                { label: 'Form Data', value: 'FORM_DATA' },
                { label: 'Json Format', value: 'JSON' }
              ]}
            />
          </FlexBox>
        </InputRow>
      </FlexBox>
    </FlexBox>
  );
};

export default WebhooksForm;
