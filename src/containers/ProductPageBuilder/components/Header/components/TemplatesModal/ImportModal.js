import React, { useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { importProductTemplate } from 'actions/product';
import { notification } from 'libs';
import './style.css';
import { Note } from 'components/common/Notes';
import { FaFileImport } from 'react-icons/fa';

const {
  Button,
  FlexBox,
  InputRow
} = common;

const { TextField, Label } = InputRow;


const ImportTemplateModal = ({
  isVisible,
  onClose,
  onApplyTemplate,
  product,
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
    if (!handle)
      return notification.failed('Template handle is required');

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
    const isMatchingCategory = template.type === product.category;
    if (Object.keys(template?.layout).length && isMatchingCategory) {
      onClose();
      onApplyTemplate(template?.layout);
    } else {
      notification.failed('Invalid template provided');
    }
  };


  const resetState = () => {
    setHandle('');
    setTemplate({});
  };
  const _onClose = () => {
    resetState();
    onClose();
  };

  const isImported = template.hasTemplate;

  return (
    <Modal
      onClose={_onClose}
      isVisible={isVisible}
      className='sharing-modal'
      closeBtnClassName='scripts-modal-close-btn'
    >
      <FlexBox className='m-3' column>
        <FlexBox center='v-center' style={{ borderBottom: '1px solid #eee', paddingBottom: 20, marginBottom: 20 }}>
          <FaFileImport size={20} color='currentColor' />
          <span style={{ fontSize: 20, fontWeight: 500, marginLeft: 10 }}>Import Template</span>
        </FlexBox>
        <span className='mt-2'>import a template using the shared handle to your current page.</span>
        {!isImported ? (
          <FlexBox center flex className='my-4 mt-2' column>
            <Label
              className='import-template-labels'
              notes='Paste the template handle to apply changes to your current product'
            >
              Template handle
            </Label>
            <TextField
              value={handle}
              onChange={onChange}
              name='handle'
              disabled={loading || isImported}
              placeholder='Template shared handle'
              className='flex mt-4'
              style={{ width: '100%' }}
            />
          </FlexBox>
        ) : (
          <FlexBox column>
            <span style={{ fontSize: 16, fontWeight: 500, borderTop: '1px solid #eee', paddingTop: 20 }}>{template?.name}</span>
            <img src={template?.screenshot} alt='thumbnail' className='status-template-main-screenshot' />
            <FlexBox>
              <Note
                // showOnce
                // referenceLink='https://help.leadcart.io'
                className='mx-auto'
              >
                Applying this theme to the current page will replace the current sections, layout & content with the template associated sections, layout & content,
                and once you applied these changes, it can't be undone.
              </Note>
            </FlexBox>
          </FlexBox>
        )}

        <FlexBox center='h-center v-center' flex>
          <Button
            onClick={isImported ? onApplyTemplateChanges : onImport}
            onprogress={loading}
            className='light-btn'
            style={{ padding: '5px 30px' }}
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
