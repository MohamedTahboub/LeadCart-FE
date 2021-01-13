import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { useContext } from '../../actions';
import GoogleFonts from './GoogleFonts';
import CustomFonts from './CustomFonts';
import InstalledFonts from './InstalledFonts';
import ConfirmationModal from './ConfirmationModal';
import * as productsFontsActions from '../../../../actions/productsFonts';


import './style.css';

const { Tabs, Tab } = common;


const AddNewFontModal = ({ addNewProductsFonts, deleteProductsFonts }) => {
  const [hasNewFonts, setHasNewFonts] = useState(false);
  const [selectedNewFonts, setSelectedNewFonts] = useState([]);
  const [selectedInstalledFonts, setSelectedInstalledFonts] = useState([]);
  const [openedGoogleConfirmationModal, setOpenedGoogleConfirmationModal] = useState(false);


  const {
    state: { productFontsModal: isProductFontsModalOpened } = {},
    actions: { onToggleProductFontsModal } = {}
  } = useContext();


  const onSave = () => {
    addNewProductsFonts({ productsFonts: selectedNewFonts }, {
      onSuccess: () => {
        console.log('Success');
      },
      onFailed: () => {
        console.log('failed');
        onToggleProductFontsModal();
        setSelectedNewFonts([]);
        openedGoogleConfirmationModal && setOpenedGoogleConfirmationModal(false);
        hasNewFonts && setHasNewFonts(false);
      }
    });
  };


  const onDelete = () => {
    deleteProductsFonts({ fontsIds: selectedInstalledFonts }, {
      onSuccess: () => {
        console.log('deleted successfully');
      },
      onFailed: () => {
        console.log('deleted failed');
        onToggleProductFontsModal();
        setSelectedInstalledFonts([]);
        openedGoogleConfirmationModal && setOpenedGoogleConfirmationModal(false);
        hasNewFonts && setHasNewFonts(false);

      }
    });
  };


  const onCloseModal = () => {
    if (hasNewFonts)
      onTabsNavigation();
    else
      onToggleProductFontsModal();
  };

  const onCloseConfirmationModal = () => setOpenedGoogleConfirmationModal(false);
  const onTabsNavigation = () => setOpenedGoogleConfirmationModal(hasNewFonts);


  const hasInstalledSelected = Boolean(selectedInstalledFonts.length);

  const addingFontsProps = { setHasNewFonts, onSave, selectedNewFonts, setSelectedNewFonts };
  const installedFontsProps = { setHasNewFonts, onDelete, selectedInstalledFonts, setSelectedInstalledFonts };
  const confirmationModalProps = { isVisible: openedGoogleConfirmationModal, onClose: onCloseConfirmationModal, onSave, onDelete, hasInstalledSelected };

  return (
    <Modal className='pt-3 products-fonts-modal-container' isVisible={isProductFontsModalOpened} onClose={onCloseModal}>
      <Tabs active='googleFonts' onChange={onTabsNavigation} blockTabsNavigation={hasNewFonts}>
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
