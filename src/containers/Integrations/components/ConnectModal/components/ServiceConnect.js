import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import { notification, openNewWindow } from 'libs';
// import { useForm } from 'libs/hooks';
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
      label={`Login into your account in ${name} to give us access to your account`}
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

const ConnectClient = ({ name, onChange, onSubmit, ...props }) => (
  <FlexBox column center='v-left' flex>
    <Statement
      label='Client Id'
      value={(
        <TextField
          name='client_id'
          onChange={onChange}
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
          name='client_secret'
          onChange={onChange}
        />
      )}
      flex
      spaceBetween
      className='full-width'
    // flex
    />

    <FlexBox flexEnd className='full-width'>
      <Button onClick={onSubmit} className='primary-color'>
        Authorize
      </Button>
    </FlexBox>
  </FlexBox>
);


const ConnectApiKey = ({ name, onChange, onSubmit, ...props }) => (
  <FlexBox column>
    <Statement
      label='API KEY'
      value={(
        <TextField
          name='apiKey'
          onChange={onChange}
        // value={values.apiKey}
        />
      )}
    />
    <FlexBox flexEnd className='full-width'>
      <Button onClick={onSubmit} className='primary-color'>
        Authorize
      </Button>
    </FlexBox>
  </FlexBox>
);

const ConnectIntegration = ({ authType, onConnect, onModalToggle, ...props }) => {
  const [values, setValues] = useState({});
  const [onprogress, setProgress] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
  };

  const onSubmit = () => {
    setProgress(true);
    onConnect(values, {
      onSuccess: () => {
        notification.success(`${props.name} Connected Successfully`);
        setValues({});
        setProgress(false);
        onModalToggle();
      },
      onFailed: (message) => {
        notification.failed(message);
        setProgress(false);
      }
    });
  };

  useEffect(() => {
    setValues({});
  }, [authType]);

  const customProps = {
    onprogress,
    onChange,
    onSubmit
  };

  return (
    <LayoutSwitch active={authType}>
      <ConnectOAuth id='OAuth' {...props} />
      <ConnectClient id='clientCredentials' {...props} {...customProps} />
      <ConnectApiKey id='apiKey' {...props} {...customProps} />
    </LayoutSwitch>
  );
};


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
    if (!service.data) {
      setOnprogress(true);
      setService(data);
      props.checkIntegrationService(
        { integrationKey: service.key },
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
    } else {
      setOnprogress(false);
      setSupported(true);
    }
  }, [data, props, service]);

  const onConnect = ({
    name,
    category,
    key,
    authType
  }) => (authDetails, onExecute) => {
    const serviceDetails = {
      integrationName: name,
      category,
      integrationKey: key,
      authDetails,
      authType
    };
    props.connectIntegrationService(serviceDetails, onExecute);
  };
  return (
    <FlexBox column className='margin-top-20'>
      <FlexBox>
        <FlexBox column className='margin-right-30'>
          <Statement
            label={`Authorize LeadCart to Access Your ${service.name} Account:`}
          />
          {supported ? (
            <ConnectIntegration
              {...service}
              onConnect={onConnect(service)}
              onModalToggle={props.onModalToggle}
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

ServiceConnect.propTypes = {};

export default connect(null, integrationsActions)(ServiceConnect);
