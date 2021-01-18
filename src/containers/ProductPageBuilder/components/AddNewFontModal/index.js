import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { useContext } from '../../actions';
import GoogleFonts from './GoogleFonts';
import CustomFonts from './CustomFonts';
import InstalledFonts from './InstalledFonts';
import ConfirmationModal from './ConfirmationModal';
import * as productsFontsActions from '../../../../actions/productsFonts';
import * as notifications from 'libs/notifications';
import { productsFontsSchema } from 'libs/validation';


import './style.css';

const { Tabs, Tab } = common;


const AddNewFontModal = ({ addNewProductsFonts, deleteProductsFonts }) => {

  const [hasNewFonts, setHasNewFonts] = useState(false);
  const [activeTab, setActiveTab] = useState('googleFonts');
  const [selectedNewFonts, setSelectedNewFonts] = useState([]);
  const [selectedInstalledFonts, setSelectedInstalledFonts] = useState([]);
  const [openedGoogleConfirmationModal, setOpenedGoogleConfirmationModal] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);


  const clearModal = () => {
    const hasSelectedInstalledFonts = Boolean(selectedInstalledFonts.length);

    if (hasNewFonts) {
      setHasNewFonts(false);
      setSelectedNewFonts([]);
    }

    if (hasSelectedInstalledFonts)
      setSelectedInstalledFonts([]);

    if (openedGoogleConfirmationModal)
      setOpenedGoogleConfirmationModal(false);
  };


  const {
    state: { productFontsModal: isProductFontsModalOpened } = {},
    actions: { onToggleProductFontsModal } = {}
  } = useContext();


  const onSave = async () => {
    setSaveLoading(true);
    const { isValid, value: fonts, errors } = await productsFontsSchema(selectedNewFonts);

    if (!isValid && (Array.isArray(fonts) && !fonts.length))
      return;

    addNewProductsFonts({ fonts }, {
      onSuccess: () => {
        onToggleProductFontsModal();
        clearModal();
        notifications.success('Your selected fonts added successfully');
        setSaveLoading(false);
      },
      onFailed: () => {
        notifications.failed(errors);
        setSaveLoading(false);
      }
    });
  };


  const onDelete = () => {
    setDeleteLoading(true);

    deleteProductsFonts({ fontsIds: selectedInstalledFonts }, {
      onSuccess: () => {
        onToggleProductFontsModal();
        clearModal();
        notifications.success('Your selected fonts deleted successfully');
        setDeleteLoading(false);
      },
      onFailed: (error) => {
        notifications.failed(error);
        setDeleteLoading(false);
      }
    });
  };


  const onCloseModal = () => {
    onToggleProductFontsModal();
    clearModal();
  };

  const onCloseConfirmationModal = () => setOpenedGoogleConfirmationModal(false);

  const hasValidArray = (arr, length = 0) => Array.isArray(arr) && arr.length > length;

  const onTabsNavigation = (nextTab, currentActive) => {
    const shouldBlock = (hasValidArray(selectedNewFonts) && currentActive === 'googleFonts') ||
      (hasValidArray(selectedInstalledFonts) && currentActive === 'installedFonts');

    if (shouldBlock)
      setOpenedGoogleConfirmationModal({ hasNewFonts, tab: nextTab, fromTab: currentActive });
    else setActiveTab(nextTab);

  };


  const onIgnoreAndNavigate = () => {
    const { tab, fromTab } = openedGoogleConfirmationModal || {};
    if (tab) {
      setActiveTab(tab);
      onCloseConfirmationModal();
      if (fromTab === 'googleFonts')
        setSelectedNewFonts([]);

      if (fromTab === 'installedFonts')
        setSelectedInstalledFonts([]);

    } else {
      onCloseConfirmationModal();
      onToggleProductFontsModal();
    }
  };

  const hasInstalledSelected = Boolean(selectedInstalledFonts.length);
  const addingFontsProps = {
    setHasNewFonts,
    onSave,
    selectedNewFonts,
    setSelectedNewFonts,
    onCloseModal
  };

  const installedFontsProps = {
    setHasNewFonts,
    onDelete,
    onIgnoreAndNavigate,
    selectedInstalledFonts,
    setSelectedInstalledFonts
  };

  const confirmationModalProps = {
    isVisible: openedGoogleConfirmationModal,
    onClose: onCloseConfirmationModal,
    onSave,
    onIgnoreAndNavigate,
    fromTab: openedGoogleConfirmationModal?.fromTab,
    hasInstalledSelected
  };

  return (
    <Modal className='pt-3 products-fonts-modal-container' isVisible={isProductFontsModalOpened} onClose={onCloseModal}>
      <Tabs active={activeTab} onChange={onTabsNavigation}>
        <Tab id='googleFonts' title='Google Fonts'>
          <GoogleFonts {...addingFontsProps} />
        </Tab>
        <Tab id='installedFonts' title='Installed Font' >
          <InstalledFonts {...installedFontsProps} />
        </Tab>
      </Tabs>
      <ConfirmationModal {...confirmationModalProps} />
    </Modal>
  );
};

export default connect(null, productsFontsActions)(AddNewFontModal);
