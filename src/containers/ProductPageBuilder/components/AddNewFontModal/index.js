import React, { useState } from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { useContext } from '../../actions';
import GoogleFonts from './GoogleFonts';
import CustomFonts from './CustomFonts';
import ConfirmationModal from './ConfirmationModal';


import './style.css';

const { Tabs, Tab } = common;


const AddNewFontModal = () => {
  const [hasNewGoogleFonts, setHasNewGoogleFonts] = useState(false);
  const [openedGoogleConfirmationModal, setOpenedGoogleConfirmationModal] = useState(false);
  const [hasNewCustomFonts, setHasNewCustomFonts] = useState(false);

  const {
    state: { productFontsModal: isProductFontsModalOpened } = {},
    actions: { onToggleProductFontsModal } = {}
  } = useContext();

  const onSave = (data) => {
    console.log('Data from Saving Function <><><><><><><><><>', data);
  };


  const onCloseModal = () => {
    if (hasNewGoogleFonts || hasNewCustomFonts)
      onTabsNavigation();
    else
      onToggleProductFontsModal();
  };

  const onCloseConfirmationModal = () => setOpenedGoogleConfirmationModal(false);
  const onTabsNavigation = () => setOpenedGoogleConfirmationModal(hasNewGoogleFonts || hasNewCustomFonts);

  const googleFontsProps = { setHasNewGoogleFonts, onSave };
  const customFontsProps = { setHasNewCustomFonts, onSave };


  return (
    <Modal className='pt-3 products-fonts-modal-container' isVisible={isProductFontsModalOpened} onClose={onCloseModal}>
      <Tabs active='googleFonts' onChange={onTabsNavigation} blockTabsNavigation={hasNewGoogleFonts || hasNewCustomFonts}>
        <Tab id='googleFonts' title='Google Fonts'>
          <GoogleFonts {...googleFontsProps} />
        </Tab>

        <Tab id='customFont' title='Custom Font' >
          <CustomFonts {...customFontsProps} />
        </Tab>
      </Tabs>

      <ConfirmationModal isVisible={openedGoogleConfirmationModal} onClose={onCloseConfirmationModal} onSave={onSave} />
    </Modal>
  );
};

export default AddNewFontModal;
