import React, { useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';
import { Title } from 'components/common/Titles';
import { connect } from 'react-redux';
import { importProductTemplate } from 'actions/product';
import { notification } from 'libs';
import './style.css';

const {
  // MainTitle,
  Button,
  FlexBox,
  InputRow
} = common;

const { TextField } = InputRow;


const ImportTemplateModal = ({
  isVisible,
  onClose,
  importProductTemplate
}) => {
  const [handle, setHandle] = useState('');
  const [template, setTemplate] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = ({ target: { value } }) => {
    setHandle(value);
  };

  const onImport = () => {
    setLoading(true);
    const payload = { handle };

    importProductTemplate(payload, {
      onSuccess: (template) => {
        setTemplate({
          hasTemplate: true,
          ...template
        });
        setLoading(false);
        notification.success('Imported Successfully');
      },
      onFailed: (err) => {
        setLoading(false);
        setTemplate({
          hasTemplate: false,
          ...template
        });
        notification.failed(err);
      }
    });
  };

  const onApplyTemplateChanges = () => {
    notification.success('Success');
  };
  const isImported = template.hasTemplate;

  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      className='sharing-modal'
      closeBtnClassName='scripts-modal-close-btn'
    >
      <FlexBox className='m-3' column>
        <Title>Import Template</Title>
        <span className='mt-2'>import a template using the shared handle to your current page.</span>
        {!isImported ? (
          <FlexBox center flex className='my-4'>
            <TextField
              value={handle}
              onChange={onChange}
              name='handle'
              disabled={loading || isImported}
              placeholder='template shared handle'
            />
          </FlexBox>
        ) : (
          <FlexBox column>
            <span style={{ fontSize: 16, fontWeight: 500, borderTop: '1px solid #eee', paddingTop: 20 }}>{template?.name}</span>
            <img src={template?.screenshot} alt='thumbnail' className='status-template-main-screenshot' />
          </FlexBox>
        )}
        <FlexBox center='h' flexEnd>
          <Button
            onClick={isImported ? onApplyTemplateChanges : onImport}
            onprogress={loading}
            className='light-btn'
            style={{ padding: '5px 20px' }}
          >
            {isImported ? 'Apply template to the current page' : 'import template'}
          </Button>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

ImportTemplateModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

ImportTemplateModal.defaultProps = { scripts: {} };

export default connect(null, { importProductTemplate })(ImportTemplateModal);
