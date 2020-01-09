import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ServiceCard from './ServiceCard';

import {
  LayoutSwitch,
  servicesList
} from '../..';

const {
  FlexBox,
  Badge,
  Button,
  InputRow
} = common;
const { TextField } = InputRow;

const ConnectOAuth = ({ name = 'Stripe', ...props }) => (
  <FlexBox className='margin-top-20'>
    <Statement
      label={`Authorize LeadCart to access your ${name} data:`}
      value={(
        <Button className='primary-color'>
          Connect with
          {' '}
          {name}
        </Button>
      )}
    />
  </FlexBox>
);

const ConnectClient = ({ name, ...props }) => (
  <FlexBox column center='v-left' className='margin-top-20'>
    <Statement
      label={`Authorize LeadCart to Access your ${name} data:`}
    />
    <Statement
      label='Client ID'
      value={(
        <TextField
          name='clientId'
        />)
      }
      // spaceBetween
      // flex
    />
    <Statement
      label='Client Secret'
      value={(
        <TextField
          name='secret'
        />
      )}
      // spaceBetween
      // flex
    />


    <Button className='primary-color'>
      Authorize
    </Button>
  </FlexBox>
);


const ConnectApiKey = ({ name, ...props }) => (
  <FlexBox column className='margin-top-20'>
    <Statement
      label={`Authorize LeadCart to Access your ${name} data:`}
    />

    <Statement
      label='API KEY'
      value={(
        <TextField
          name='apiKey'
        />
      )}
    />
    <Button className='primary-color'>
      Authorize
    </Button>
  </FlexBox>
);

const ConnectIntegration = (props) => (
  <LayoutSwitch active='client'>
    <ConnectOAuth id='auth' />
    <ConnectClient id='client' />
    <ConnectApiKey id='apiKey' />
  </LayoutSwitch>
);


const Statement = ({ label, value, ...props }) => (
  <FlexBox center='v-center margin-top-10' {...props}>
    <div className='label-text margin-right-10 bold-text'>{label}</div>
    {value && <div className='label-text'>{value}</div>}
  </FlexBox>
);

const ServiceConnect = (props) => (
  <FlexBox column className='margin-top-20'>
    <FlexBox>
      <FlexBox column className='margin-right-30 border-left-text'>
        <Statement
          label='Service Name:'
          value='Stripe'
        />
        <Statement
          label='Support'
          value={<Badge color='secondary'>Supported</Badge>}
        />
      </FlexBox>
      <FlexBox>
        <ServiceCard {...servicesList[0]} disabled />
      </FlexBox>
    </FlexBox>

    <ConnectIntegration />

  </FlexBox>
);

ServiceConnect.propTypes = {

};

export default ServiceConnect;
