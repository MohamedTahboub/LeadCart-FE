import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
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
  <FlexBox>
    <Statement
      label={`Login into your account in ${name} to give us access to your data:`}
      value={(
        <FlexBox center='h-center' className='full-width'>
          <Button className='primary-color'>
            Connect with
            {' '}
            {name}
          </Button>
        </FlexBox>
      )}
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

const ConnectIntegration = (props) => (
  <LayoutSwitch active='client'>
    <ConnectOAuth id='auth' {...props} />
    <ConnectClient id='client' {...props} />
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

  useEffect(() => {
    // if (service.key !== data.key) {
      setOnprogress(true)
      setService(data);
      props.checkIntegrationService(
        {
          integrationKey: service.key
        },
        {
          onSuccess: () => { 
            setOnprogress(false)
            setSupported(true)
          },
          onFailed: () => { 
            setOnprogress(false)
            setSupported(true)
            
          }
        }
      )
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
          ):(
            onprogress ? (
              <span>...checking support</span>
              ):(
                <span>not supported</span>
              )
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
