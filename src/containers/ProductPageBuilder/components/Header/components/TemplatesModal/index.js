import React, { useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';

import './style.css';
import clx from 'classnames';

const {
  MainTitle,
  Button,
  FlexBox,
  InputRow
} = common;

const { Label, TextField } = InputRow;

const OptionCard = ({ title, icon, description, checked, className, ...props }) => {

  return (
    <FlexBox
      column
      className={clx('option-card', className, { checked })}
      style={{
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 20,
        cursor: 'pointer'
      }}
      {...props}
    >
      <FlexBox style={{ marginBottom: 20 }}>
        {icon && <FlexBox style={{ marginRight: 20 }}>{icon}</FlexBox>}
        <FlexBox style={{ fontSize: 15, fontWeight: 500 }}>{title}</FlexBox>
      </FlexBox>
      <FlexBox className='truncate' style={{ fontSize: 15, fontWeight: 500 }}>{description}</FlexBox>
    </FlexBox>
  );
};

const SharingStatus = (props) => {
  const { className } = props;

  return (
    <FlexBox
      column
      className={clx(className)}
      style={{
        background: 'aqua',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 20
      }}
      {...props}
    >
      Status
    </FlexBox>
  );
};

const Templates = ({
  isVisible,
  onClose,
  isSaving,
  onChange,
  onSaveTheProduct
}) => {
  const [showShareModal, setShareModal] = useState(false);
  const [showImportModal, setImportModal] = useState(false);
  const onToggleShareModal = () => setShareModal((e) => !e);
  const onToggleImportModal = () => setImportModal((e) => !e);


  return (
    <>
      <Modal
        onClose={onClose}
        isVisible={isVisible}
        // className='trackers-modal'
        closeBtnClassName='scripts-modal-close-btn'
      >
        <FlexBox center style={{ margin: 20 }}>
          <FlexBox column>
            <FlexBox center='v-center' className='mb-3'>
              <OptionCard
                icon={null}
                title='Share'
                description='Share current page as template'
                marked
                onClick={onToggleShareModal}
              />
              <OptionCard
                icon={null}
                title='Import'
                description='Import Template from a link'
                className='ml-3'
                onClick={onToggleImportModal}
              />
            </FlexBox>
            <SharingStatus />
          </FlexBox>
        </FlexBox>
      </Modal>
      <Modal
        onClose={onToggleShareModal}
        isVisible={showShareModal}
        // className='trackers-modal'
        closeBtnClassName='scripts-modal-close-btn'
      >
        Share
      </Modal>
      <Modal
        onClose={onToggleImportModal}
        isVisible={showImportModal}
        // className='trackers-modal'
        closeBtnClassName='scripts-modal-close-btn'
      >
        Import
      </Modal>
    </>
  );
};

Templates.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

Templates.defaultProps = { scripts: {} };

export default Templates;
