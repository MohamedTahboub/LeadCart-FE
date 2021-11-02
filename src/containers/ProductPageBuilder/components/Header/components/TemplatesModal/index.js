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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import Tooltip from 'components/common/Tooltip';

const { FlexBox } = common;


const OptionCard = ({ title, icon, onClick, description, disabled, checked, className, ...props }) => {

  const _onClick = (e) => {
    e.preventDefault();
    if (onClick && !disabled)
      onClick(e);
  };

  return (
    <FlexBox
      column
      className={clx('option-card', className, { checked, disabled })}
      onClick={_onClick}
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
  const { className, hasTemplate, screenshot, createdAt, handle, name } = props;

  if (!hasTemplate) return null;


  const titleStyle = { fontSize: 14, fontWeight: 500 };
  return (
    <FlexBox
      className={clx(className, 'template-status-card')}
      style={{
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 15
      }}
      {...props}
      spaceBetween
    >
      <FlexBox column spaceAround>
        <span className='truncate' style={{ ...titleStyle, fontSize: 16, textTransform: 'capitalize' }} >
          <span style={{ fontWeight: 600 }}>Name: </span>
          {name}
        </span>
        <FlexBox>
          <span style={titleStyle} className='truncate'>
            <span style={{ fontWeight: 600 }}>Template Handle: </span>
            {handle}
          </span>
          <CopyToClipboard text={handle}>
            <Tooltip text='Copied!' placement='top' trigger={['click']}>
              <span className='copy-icon'>
                <i className='fas fa-copy' />
              </span>
            </Tooltip>
          </CopyToClipboard>
        </FlexBox>
        <span style={titleStyle} >
          <span style={{ fontWeight: 600 }}>Created Date: </span>
          {moment(createdAt).format('MM - DD - YYYY')}
        </span>
      </FlexBox>
      <img src={screenshot} alt='thumbnail' className='status-template-screenshot' />
    </FlexBox>
  );
};

const Templates = ({
  isVisible,
  onClose,
  product = {},
  getProductTemplateDetails
}) => {
  const [showShareModal, setShareModal] = useState(false);
  const [showImportModal, setImportModal] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({});

  const onToggleShareModal = () => setShareModal((e) => !e);
  const onToggleImportModal = () => setImportModal((e) => !e);

  const checkIfTHeProductHasTemplate = async () => {
    getProductTemplateDetails({ productId: product?._id }, {
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

  const updateTemplateStatus = (details) => {
    setTemplateDetails({
      hasTemplate: true,
      ...details
    });
  };

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
                disabled={templateDetails?.hasTemplate}
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
            <SharingStatus {...templateDetails} />
          </FlexBox>
        </FlexBox>
      </Modal>
      <ShareTemplateModal
        onClose={onToggleShareModal}
        isVisible={showShareModal}
        product={product}
        updateTemplateStatus={updateTemplateStatus}
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
