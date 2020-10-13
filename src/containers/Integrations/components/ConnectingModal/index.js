
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { includesIgnoreCase, notification } from 'libs';
import * as integrationsActions from 'actions/integrations';
import integrationsServices from 'data/integrationsServices';
import ServiceConnectAnimation from './ServiceConnectAnimation';
import './style.css';

const { FlexBox, MainTitle } = common;

const getServiceDetails = (key = '') => {
  const integration = integrationsServices.find(({ key: intKey = '' }) => includesIgnoreCase(intKey, key));
  return integration || {};
};

const ConnectingModal = ({
  history,
  open,
  onClose,
  connectIntegrationService,
  data = {}
}) => {
  const [progress, setProgress] = useState(true);
  const [serviceImage, setServiceImage] = useState();
  const [error, setError] = useState(data.error);
  const { activation, code } = data;

  useEffect(() => {
    if (code && !error) {
      const service = getServiceDetails(activation);
      setServiceImage(service.brandLogo);
      setProgress(true);
      setTimeout(() => {
        onConnect({
          ...service,
          authDetails: { code }
        });
      }, 3000);
    } else {
      setError(error);
    }
    //eslint-disable-next-line
  }, [activation, code]);

  const onConnect = ({
    name,
    category,
    key,
    authDetails
  }) => {
    const serviceDetails = {
      integrationName: name,
      category,
      integrationKey: key,
      authDetails,
      authType: 'OAuth'
    };
    setProgress(true);
    connectIntegrationService(serviceDetails, {
      onSuccess: () => {
        setProgress(false);
        notification.success(`You have Connected ${activation} Successfully`);
        onClose();
        history.push('/integrations');
      },
      onFailed: (errMessage) => {
        setError(errMessage);
        setProgress(false);
        notification.failed(errMessage);
        setTimeout(() => {
          history.push('/integrations');
          onClose();
        }, 4000);
      }
    });
  };
  return (
    <Modal
      className='integrations-modal min-width-600'
      isVisible={open}
      onClose={onClose}
    >
      <div className='header'>
        <MainTitle>
          {`Connect with ${activation}`}
        </MainTitle>
      </div>
      <FlexBox center='h-center' className='aligned-center-text' column>
        {progress && (
          <ServiceConnectAnimation image={serviceImage} />
        )}
        {
          (error && !progress) && (
            <div className='error-text max-width-300 text-align-center'>
              {error}
            </div>
          )
        }
      </FlexBox>
    </Modal>
  );
};

export default connect(null, integrationsActions)(ConnectingModal);
