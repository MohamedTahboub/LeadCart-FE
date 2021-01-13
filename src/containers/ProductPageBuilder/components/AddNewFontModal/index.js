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


const AddNewFontModal = ({ addNewProductsFonts }) => {
  const [hasNewGoogleFonts, setHasNewGoogleFonts] = useState(false);
  const [hasNewCustomFonts, setHasNewCustomFonts] = useState(false);
  const [openedGoogleConfirmationModal, setOpenedGoogleConfirmationModal] = useState(false);
  const [selectedGoogleFonts, setSelectedGoogleFonts] = useState([]);
  const [hasSelectedInstalledCustomFonts, setHasSelectedInstalledCustomFonts] = useState([]);


  const {
    state: { productFontsModal: isProductFontsModalOpened } = {},
    actions: { onToggleProductFontsModal } = {}
  } = useContext();

  const onSave = () => {
    addNewProductsFonts({ productsFonts: selectedGoogleFonts }, {
      onSuccess: () => {
        console.log('Success');
      },
      onFailed: () => {
        console.log('failed');
        onToggleProductFontsModal();
        setSelectedGoogleFonts([]);
      }
    });
  };


  const onCloseModal = () => {
    if (hasNewGoogleFonts || hasNewCustomFonts)
      onTabsNavigation();
    else
      onToggleProductFontsModal();
  };

  const onCloseConfirmationModal = () => setOpenedGoogleConfirmationModal(false);
  const onTabsNavigation = () => setOpenedGoogleConfirmationModal(hasNewGoogleFonts || hasNewCustomFonts);

  const googleFontsProps = { setHasNewGoogleFonts, onSave, selectedGoogleFonts, setSelectedGoogleFonts };
  const customFontsProps = { setHasNewCustomFonts, onSave };
  const installedFontsProps = { hasSelectedInstalledCustomFonts, setHasSelectedInstalledCustomFonts };


  return (
    <Modal className='pt-3 products-fonts-modal-container' isVisible={isProductFontsModalOpened} onClose={onCloseModal}>
      <Tabs active='googleFonts' onChange={onTabsNavigation} blockTabsNavigation={hasNewGoogleFonts || hasNewCustomFonts}>
        <Tab id='googleFonts' title='Google Fonts'>
          <GoogleFonts {...googleFontsProps} />
        </Tab>

        <Tab id='customFont' title='Custom Font' >
          <CustomFonts {...customFontsProps} />
        </Tab>


        <Tab id='installedFonts' title='Installed Font' >
          <InstalledFonts {...installedFontsProps} />
        </Tab>
      </Tabs>

      <ConfirmationModal isVisible={openedGoogleConfirmationModal} onClose={onCloseConfirmationModal} onSave={onSave} />
    </Modal>
  );
};

export default connect(null, productsFontsActions)(AddNewFontModal);
