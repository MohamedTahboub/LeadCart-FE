import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'components/Modals';
import common from 'components/common';
import { LayoutSwitch } from 'components/common/Layout';
import { StripeSettings } from './components';
import { notification } from 'libs';
import * as integrationsActions from 'actions/integrations';
import * as immutable from 'object-path-immutable';
import { FlexBox } from 'components/common/boxes';


const { MainTitle, Button } = common;
const ServicesSettingsModal = ({
  open,
  onConnectClosed,
  service,
  updateIntegratedServiceSettings
}) => {
  const [fields, setFields] = useState(service?.settings || {});
  const [loading, setLoading] = useState(false);

  const onUpdate = () => {
    const { sepaEnabled, fpxEnabled } = fields || {};

    const payload = {
      integrationId: service._id,
      settings: { sepaEnabled, fpxEnabled }
    };
    setLoading(true);
    updateIntegratedServiceSettings(payload, {
      onSuccess: () => {
        setLoading(false);
        notification.success(`${service?.name ? service.name : 'Integration'} settings has been updated.`);
        setTimeout(() => {
          onConnectClosed();
        }, 300);
      },
      onFailed: (message) => {
        setLoading(false);
        notification.failed(message);
      }
    });
  };

  const onChange = ({ target: { name, value } }) => {
    const newValues = immutable.set(fields, name, value);
    setFields(newValues);
  };

  useEffect(() => {
    if (service?.settings)
      setFields(service.settings);
      // eslint-disable-next-line
  }, [service?.settings]);

  const commonProps = { onUpdate, onChange };

  const serviceName = service?.name;

  return (
    <Modal
      className='integration-setting-modal'
      isVisible={open}
      onClose={onConnectClosed}
    >
      <FlexBox column flex>
        <MainTitle>
          {`${serviceName || 'Integration'} Settings`}
        </MainTitle>
        <FlexBox flex>
          <LayoutSwitch active={service?.key} fallback={<StripeSettings id='lc_stripe' service={fields} {...commonProps} />}>
            <StripeSettings id='lc_stripe' service={fields} {...commonProps} />
          </LayoutSwitch>
        </FlexBox>
        <FlexBox flexEnd className='m-2'>
          <Button className='primary-btn title-text px-3' onClick={onUpdate} onprogress={loading}>
            Update
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

export default connect(null, integrationsActions)(ServicesSettingsModal);
