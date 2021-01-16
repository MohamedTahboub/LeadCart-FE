import React, { useRef, useState } from 'react';
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
  const [selectedNewFonts, setSelectedNewFonts] = useState([]);
  const [selectedInstalledFonts, setSelectedInstalledFonts] = useState([]);
  const [openedGoogleConfirmationModal, setOpenedGoogleConfirmationModal] = useState(false);

  const [activeTab, setActiveTab] = useState('googleFonts');
  const [commentedTab, setCommentedTab] = useState('googleFonts');


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
    const { isValid, value: fonts, errors } = await productsFontsSchema(selectedNewFonts);

    if (!isValid)
      return;

    addNewProductsFonts({ fonts }, {
      onSuccess: () => {
        onToggleProductFontsModal();
        clearModal();
        notifications.success('Your selected fonts added successfully');
      },
      onFailed: () => {
        notifications.failed(errors);
      }
    });
  };


  const onDelete = () => {
    deleteProductsFonts({ fontsIds: selectedInstalledFonts }, {
      onSuccess: () => {
        onToggleProductFontsModal();
        clearModal();
        notifications.success('Your selected fonts deleted successfully');
      },
      onFailed: (error) => {
        notifications.failed(error);
      }
    });
  };


  const onCloseModal = () => {
    onToggleProductFontsModal();
    clearModal();
  };

  const onCloseConfirmationModal = () => setOpenedGoogleConfirmationModal(false);


  const onTabsNavigation = (clickedTabName) => {
    setOpenedGoogleConfirmationModal(hasNewFonts);
    setCommentedTab(clickedTabName);
    !hasNewFonts && setActiveTab(clickedTabName);
  };


  const onIgnore = () => {
    clearModal();
    setActiveTab(commentedTab);
  };


  const addingFontsProps = { setHasNewFonts, onSave, selectedNewFonts, setSelectedNewFonts };
  const installedFontsProps = { setHasNewFonts, onDelete, selectedInstalledFonts, setSelectedInstalledFonts };
  const confirmationModalProps = { isVisible: openedGoogleConfirmationModal, onClose: onCloseConfirmationModal, onIgnore };

  return (
    <Modal className='pt-3 products-fonts-modal-container' isVisible={isProductFontsModalOpened} onClose={onCloseModal}>
      <Tabs active={activeTab} onChange={onTabsNavigation} blockTabsNavigation={hasNewFonts}>
        <Tab id='googleFonts' title='Google Fonts'>
          <GoogleFonts {...addingFontsProps} />
        </Tab>

        <Tab id='customFont' title='Custom Font' >
          <CustomFonts {...addingFontsProps} />
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
