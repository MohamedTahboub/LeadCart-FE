import React, { useEffect, useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';

import './style.css';
import clx from 'classnames';
import ShareTemplateModal from './ShareModal';
import ImportTemplateModal from './ImportModal';
import { HiShare } from 'react-icons/hi';
import { FaFileImport } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getProductTemplateDetails } from 'actions/product';

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
      {...props}
    >
      <FlexBox style={{ marginBottom: 20 }} center='v-center'>
        {icon && <FlexBox style={{ marginRight: 20 }}>{icon}</FlexBox>}
        <FlexBox style={{ fontSize: 17, fontWeight: 500 }}>{title}</FlexBox>
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
  productId,
  // isSaving,
  // onChange,
  product,
  getProductTemplateDetails
}) => {
  const [showShareModal, setShareModal] = useState(false);
  const [showImportModal, setImportModal] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({});
  const onToggleShareModal = () => setShareModal((e) => !e);
  const onToggleImportModal = () => setImportModal((e) => !e);

  const checkIfTHeProductHasTemplate = async () => {
    getProductTemplateDetails({ productId }, {
      onSuccess: (details) => {
        setTemplateDetails({
          hasTemplate: true,
          ...details
        });
      }
    });
  };

  useEffect(() => {
    checkIfTHeProductHasTemplate();
  }, []);

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
            <FlexBox className='mb-3'>
              <OptionCard
                icon={<HiShare size={20} />}
                title='Share as template'
                description='Share current page as template'
                marked
                onClick={onToggleShareModal}
                flex
                checked
              />
              <OptionCard
                icon={<FaFileImport size={20} />}
                title='Import from template'
                description='Import Template from a link'
                className='ml-3'
                onClick={onToggleImportModal}
                flex
              />
            </FlexBox>
            <SharingStatus />
          </FlexBox>
        </FlexBox>
      </Modal>
      <ShareTemplateModal
        onClose={onToggleShareModal}
        isVisible={showShareModal}
        product={product}
      />
      <ImportTemplateModal
        onClose={onToggleImportModal}
        isVisible={showImportModal}
        product={product}
      />
    </>
  );
};

Templates.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

Templates.defaultProps = { scripts: {} };

export default connect(null, { getProductTemplateDetails })(Templates);
