import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import common from 'components/common';
import * as integrationsActions from 'actions/integrations';
import { notification, openNewWindow } from 'libs';
import ServiceCard from './ServiceCard';
import clx from 'classnames';

const { FlexBox, Button, InputRow, LayoutSwitch } = common;
const { TextField } = InputRow;

const defaultAuthWithKeyFields = [{ name: 'apiKey', label: 'API Key' }];

const LoadingIcon = () => (
  <div>checking Support</div>
);

const ConnectOAuth = ({ name = 'Stripe', data: { auth_url } = {} }) => (
  <FlexBox>
    <Statement
      // label={`Login into your account in ${name} to give us access to your account`}
      flex
      value={(
        <FlexBox center='h-center' className='full-width margin-top-20'>
          <Button onClick={() => openNewWindow(auth_url)} className='primary-color'>
            {`Connect with ${name}`}
          </Button>
        </FlexBox>
      )}
      column
      center='h-center'
    />
  </FlexBox>
);

const ConnectClient = ({ onChange, onSubmit }) => (
  <FlexBox column center='v-left' flex>
    <Statement
      label='Client Id'
      value={(
        <TextField
          name='client_id'
          onChange={onChange}
          uncontrolled
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
          uncontrolled
        />
      )}
      flex
      spaceBetween
      className='full-width'
    />

    <FlexBox flexEnd className='full-width'>
      <Button onClick={onSubmit} className='primary-color'>
        Authorize
      </Button>
    </FlexBox>
  </FlexBox>
);


const ConnectApiKey = ({
  onChange,
  note,
  fields = defaultAuthWithKeyFields,
  onSubmit
}) => (
  <FlexBox column>
    {fields.map(({ name, label, note: instructions = note }) => (
      <Statement
        key={name}
        label={label}
        note={instructions}
        value={(
          <TextField
            name={name}
            onChange={onChange}
            uncontrolled
          />
        )}
      />))}
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


const Statement = ({ label, note, value, ...props }) => (
  <FlexBox flexStart={note} center={clx({ 'v-center': !note })} className='margin-top-10' {...props}>
    <FlexBox column flexStart className='label-text margin-right-10 bold-text'>
      <span>
        {label}
      </span>
      {note && <span className='note-text mx-2 max-width-200'>({note})</span>}
    </FlexBox>
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
    // eslint-disable-next-line
  }, [data]);

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
          ) : (<FlexBox flex column center='v-center h-center'>
            {onprogress ? (
              <LoadingIcon />
            ) : (<span className='error-text'>{error}</span>)}
          </FlexBox>)}
        </FlexBox>
        <FlexBox>
          <ServiceCard {...service} disabled />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default connect(null, integrationsActions)(ServiceConnect);
