
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import common from 'components/common';
import { notification } from 'libs';

const {
  FlexBox,
  MainTitle,
} = common;


const ConnectingModal = ({
  open,
  onClose,
  data = {}
}) => {
  const [progress, setProgress] = useState(true);
  const {
    activation,
    code,
    error
  } = data;

  const toggleAfter = () => {
    setTimeout(() => {
      setProgress(false);
      onClose();
      notification.success(`You have Connected ${activation} Successfully`);
    }, 4000);
  };

  useEffect(() => {
    if (code && !error) {
      setProgress(true);
      toggleAfter();
    } else {
      setProgress(false);
    }
  }, [data]);

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
          {`${progress ? 'Connecting' : 'Can\'t Connect '} to ${activation}`}
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

export default ConnectingModal;


/*

      <LayoutSwitch active={stage} className='integrations-steps-content'>
        <ServiceSelect id={1} onSelect={onSelect} />
      </LayoutSwitch>


<div className='integrations-steps'>
        <Step
          value={stage}
          id={1}
        >
          Select a Service to Connect
        </Step>
        <Step
          value={stage}
          id={2}
        >
          Service Authentication
        </Step>
      </div>
*/
