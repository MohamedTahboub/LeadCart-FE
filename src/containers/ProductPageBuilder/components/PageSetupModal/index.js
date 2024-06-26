import React, { useEffect, useState } from 'react';
import queryString from 'querystring';
import { Modal } from 'components/Modals';
import common from 'components/common';
import { TemplateCard } from 'components/common/Cards';
import './style.css';
import { LayoutsList, TemplatesList } from './components';
import { useContext } from '../../actions';

const { FlexBox, LayoutSwitch } = common;

const getQueryParams = (location) => {
  return queryString.parse(location?.search?.replace('?', ''));
};
const PageSetupModal = ({ history = {}, onUpdateTemplate }) => {
  const { actions } = useContext();

  const params = getQueryParams(history.location);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  useEffect(() => {
    if (params && params.state && params.state === 'new')
      setShow(true);
  }, [params]);

  const onTemplateSelect = (templateId, templateBody) => () => {
    setSelectedTemplate(templateId);
    onUpdateTemplate(templateBody);
    onClose();
  };

  const onClose = () => {
    clearHistoryStateQuery();
    setTimeout(() => {
      setShow(false);
    }, 200);
  };

  const onBlank = () => {
    setStep('layouts');
  };

  const onLayoutSelected = (layout) => () => {
    actions.onProductFieldChange({
      name: 'pageStyles.layout',
      value: layout
    });
    onClose();
  };

  const clearHistoryStateQuery = () => {
    history.push(history?.location?.pathname);
  };

  return (
    <Modal isVisible={show} className='page-setup-modal' onClose={onClose}>
      <FlexBox flex center='h-center v-center'>
        <div className='large-text bold-text'>
          {step === 'templates' ? 'Select one of the following Templates to start with or start with the blank page' : 'Select your page layout'}
        </div>
      </FlexBox>
      <LayoutSwitch active={step}>
        <FlexBox id='templates' wrappable>
          <TemplateCard label='Blank' onClick={onBlank} />
          <TemplatesList onSelect={onTemplateSelect} selected={selectedTemplate} />
        </FlexBox>
        <FlexBox id='layouts' wrappable center='h-center' className='my-5'>
          <LayoutsList onSelect={onLayoutSelected} />
        </FlexBox>
      </LayoutSwitch>
    </Modal>
  );
};

PageSetupModal.propTypes = {};

export default PageSetupModal;
