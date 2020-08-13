import React, { useState } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import { sendWebhookTestPayload } from 'actions/integrations';
import { notification, trimExtraText } from 'libs';
const {
  FlexBox,
  InputRow,
  Button
} = common;

const { Label, TextField, SelectOption } = InputRow;

const WebhooksForm = ({
  onChange,
  url,
  label,
  sendWebhookTestPayload,
  payloadFormat
}) => {

  const [loading, setLoading] = useState(false);

  const onSendTestPayload = () => {
    setLoading(true);
    sendWebhookTestPayload({
      url: url ? url.trim() : url,
      payloadFormat: payloadFormat || 'JSON'
    }, {
      onSuccess: () => {
        setLoading(false);
        notification.success(`We have Successfully sent a test Payload to ${trimExtraText(url, 20)}`);
      },
      onFailed: (message) => {
        setLoading(false);
        notification.success(message);
      }
    });
  };
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
      <FlexBox flex center='h-center' className='m-2 mt-3'>
        <Button className='primary-color' onClick={onSendTestPayload} onprogress={loading}>
          Send Test Payload
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

export default connect(null, { sendWebhookTestPayload })(WebhooksForm);
