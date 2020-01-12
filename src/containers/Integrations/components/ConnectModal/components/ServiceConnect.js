import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import { message } from 'antd';
import { openNewWindow } from 'libs';
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

const LoadingIcon = () => (
  <div>checking Support</div>
);

const ConnectOAuth = ({ name = 'Stripe', data: { auth_url } = {}, ...props }) => (
  <FlexBox>
    <Statement
      label={`Login into your account in ${name} to give us access to your data`}
      value={(
        <FlexBox center='h-center' className='full-width margin-top-20'>
          <Button onClick={() => openNewWindow(auth_url)} className='primary-color'>
            Connect with
            {' '}
            {name}
          </Button>
        </FlexBox>
      )}
      column
      center='h-center'
    />
  </FlexBox>
);

const ConnectClient = ({ name, ...props }) => (
  <FlexBox column center='v-left' flex>
    <Statement
      label='Client Id'
      value={(
        <TextField
          name='clientId'
        />
      )}
      flex
      spaceBetween
      className='full-width'
    />
    <Statement
      label='Client Secret'
      value={(
        <TextField
          name='secret'
        />
      )}
      flex
      spaceBetween
      className='full-width'
    // flex
    />

    <FlexBox flexEnd className='full-width'>
      <Button className='primary-color'>
        Authorize
      </Button>
    </FlexBox>
  </FlexBox>
);


const ConnectApiKey = ({ name, ...props }) => (
  <FlexBox column>
    <Statement
      label='API KEY'
      value={(
        <TextField
          name='apiKey'
        />
      )}
    />
    <FlexBox flexEnd className='full-width'>
      <Button className='primary-color'>
        Authorize
      </Button>
    </FlexBox>
  </FlexBox>
);

const ConnectIntegration = ({ authType, ...props }) => (
  <LayoutSwitch active={authType}>
    <ConnectOAuth id='OAuth' {...props} />
    <ConnectClient id='client_credentials' {...props} />
    <ConnectApiKey id='apiKey' {...props} />
  </LayoutSwitch>
);


const Statement = ({ label, value, ...props }) => (
  <FlexBox center='v-center margin-top-10' {...props}>
    <div className='label-text margin-right-10 bold-text'>{label}</div>
    {value && <div className='label-text'>{value}</div>}
  </FlexBox>
);

const ServiceConnect = ({ data = {}, ...props }) => {
  const [service, setService] = useState(data);

  const [supported, setSupported] = useState(false);
  const [onprogress, setOnprogress] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // if (service.key !== data.key) {
    setOnprogress(true);
    setService(data);
    props.checkIntegrationService(
      {
        integrationKey: service.key
      },
      {
        onSuccess: (data) => {
          setOnprogress(false);
          setSupported(true);
          setService({
            ...service,
            authType: data.authType,
            data
          });
        },
        onFailed: (message) => {
          setOnprogress(false);
          setSupported(false);
          setError(message);
        }
      }
    );
    // };
  }, []);


  return (
    <FlexBox column className='margin-top-20'>
      <FlexBox>
        <FlexBox column className='margin-right-30'>
          <Statement
            label={`Authorize LeadCart to Access your ${service.name} data:`}
          />
          {supported ? (
            <ConnectIntegration
              {...service}
            />
          ) : (
            <FlexBox flex column center='v-center h-center'>
              {onprogress ? (
                <LoadingIcon />
              ) : (
                <span className='error-text'>{error}</span>
              )}
            </FlexBox>
          )}
        </FlexBox>
        <FlexBox>
          <ServiceCard {...service} disabled />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

ServiceConnect.propTypes = {

};

export default connect(null, integrationsActions)(ServiceConnect);
