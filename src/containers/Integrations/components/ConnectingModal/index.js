
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import common from 'components/common';
import { notification } from 'libs';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import integrationsServices from 'data/integrationsServices';


const {
  FlexBox,
  MainTitle,
} = common;

const getServiceDetails = (key = '') => {
  const integration = integrationsServices.find(({ key: intKey = '' }) => intKey.toLowerCase().includes(key.toLowerCase()));

  return integration || {};
};

const ConnectingModal = ({
  open,
  onClose,
  connectIntegrationService,
  data = {}
}) => {
  const [progress, setProgress] = useState(true);
  const [error, setError] = useState(data.error);
  const {
    activation,
    code,
  } = data;

  useEffect(() => {
    if (code && !error) {
      const service = getServiceDetails(activation);

      onConnect({
        ...service,
        authDetails: {
          code,
        }
      });
    } else {
      setError(error);
    }
  }, [activation, code]);

  const onConnect = ({
    name,
    category,
    key,
    authDetails
  }) => {
    const serviceDetails = {
      integration: name,
      category,
      integrationKey: key,
      authDetails,
      authType: 'OAuth'
    };
    setProgress(true);
    connectIntegrationService(
      serviceDetails, {
        onSuccess: () => {
          setProgress(false);
          notification.success(`You have Connected ${activation} Successfully`);
          onClose();
        },
        onFailed: (errMessage) => {
          setError(errMessage);
          setProgress(false);
          notification.failed(errMessage);
          setTimeout(() => {
            onClose();
          }, 4000);
        }
      }
    );
  };
  return (
    <Modal
      className='integrations-modal min-width-300'
      isVisible={open}
      onClose={onClose}
    >
      <div className='header'>
        <MainTitle>
          Connect with
          {' '}
          {activation}
        </MainTitle>
      </div>
      <FlexBox center='h-center' className='aligned-center-text' column>
        <div>
          {`${progress && 'Connecting'} to ${activation} ...`}
        </div>
        {
          (error && !progress) && (
            <div className='error-text'>
              {error}
            </div>
          )
        }
      </FlexBox>
    </Modal>
  );
};
ConnectingModal.propTypes = {

};

export default connect(null, integrationsActions)(ConnectingModal);

