import React, { useState } from 'react';
import common from 'components/common';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { AiOutlineHistory, AiOutlineMobile, AiOutlineShareAlt } from 'react-icons/ai';
import { MdDesktopWindows, MdTabletMac } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { useContext } from '../../actions';
import { ScriptsModal, TemplatesModal } from './components';
import './style.css';

const {
  Button,
  FlexBox,
  Title,
  EditableField,
  Tooltip
} = common;

const ResponsiveSizesOptions = ({ onChange, activeDisplay = 'desktop' }) => {
  const commonClasses = 'margin-h-5 large-text gray-text animate item-clickable';

  const isActive = (mode) => `${mode === activeDisplay ? 'active' : ''}`;

  return (
    <FlexBox>
      <Tooltip placement='bottom' text='Preview on Desktop Mode'>
        <MdDesktopWindows
          className={`${commonClasses} ${isActive('desktop')}`}
          onClick={onChange('desktop')}
        />
      </Tooltip>
      <Tooltip placement='bottomRight' text='Preview on Tablet Size Mode'>
        <MdTabletMac
          onClick={onChange('tablet')}
          className={`${commonClasses} ${isActive('tablet')}`}
        />
      </Tooltip>
      <Tooltip placement='bottomRight' text='Preview on Mobile Mode'>
        <AiOutlineMobile
          onClick={onChange('mobile')}
          className={`${commonClasses} ${isActive('mobile')}`}
        />
      </Tooltip>
    </FlexBox>
  );
};


const Header = ({
  history,
  onSave,
  savingStatus = {},
  onUpdateTemplate,
  isTogglingBetweenTemplates,
  saving
}) => {

  const {
    state: {
      displayMode,
      standAlone,
      product = {},
      funnel: {
        url: funnelUrl,
        name: funnelName
      } = {}
    },
    actions
  } = useContext();
  const { name: productName, scripts = {} } = product;

  const [openScriptModal, setOpenScriptModal] = useState(false);
  const [openSharingModal, setOpenSharingModal] = useState(false);

  const onToggleScriptModal = () => setOpenScriptModal((open) => !open);
  const onToggleSharingModal = () => setOpenSharingModal((open) => !open);

  const goToProducts = () => {
    if (standAlone) history.push('/products');
    else history.push(`/funnels/${funnelUrl}`);
  };

  const onDisplayModeChange = (displayMode) => () => {
    actions.updateDisplayMode(displayMode);
  };

  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };

  return (
    <FlexBox column>

      <FlexBox className='white-bg padding-v-5 gray-border-top' center='v-center' spaceBetween wrappable>
        <FlexBox center='v-center' className='min-width-250 '>
          <Button
            onClick={goToProducts}
            className='light-btn icon-btn margin-left-20'
          >
            <IoIosArrowRoundBack />
          </Button>
          <Title>{`Back To ${standAlone ? 'Products' : 'Funnel'}`}</Title>
        </FlexBox>
        <FlexBox center='h-center'>
          {!standAlone && (
            <Title> Funnel({funnelName})</Title>
          )}
        </FlexBox>

        <FlexBox center='v-center' flexEnd className='margin-right-20 min-width-250 '>
          <ResponsiveSizesOptions
            onChange={onDisplayModeChange}
            activeDisplay={displayMode}
          />
        </FlexBox>
      </FlexBox>

      <FlexBox className='white-bg padding-v-5 lightgray-border-top lightgray-border-bottom' center='v-center' spaceBetween wrappable>
        <FlexBox center='v-center' className='min-width-250 ' >
          <Tooltip placement='bottomRight' text={'Coming Soon'}>
            <Button
              className='light-btn ml-3 share-template-btn'
              onClick={onToggleSharingModal}
            >
              <FlexBox center='v-center'>
                <AiOutlineShareAlt className='gray-text mr-1' />
                <span>
                  Share As Template
                </span>
              </FlexBox>
            </Button>
          </Tooltip>
        </FlexBox>
        <FlexBox>
          <EditableField
            className='large-text dashed-text aligned-center-text lightgray-border-color outline-style-none'
            name='name'
            defaultValue='Product Name'
            onChange={onChange}
            value={productName}
            disabled={isTogglingBetweenTemplates}
            max={50}
          />
        </FlexBox>

        <FlexBox center='v-center' className='min-width-250 padding-right-20' flexEnd>
          <Button
            // onClick={onSave}
            data-tip='Undo'
            className='light-btn hide-element'
          >
            <AiOutlineHistory className='mirror' />
          </Button>
          <Button
            // onClick={onSave}
            data-tip='ReDo'
            className='light-btn margin-h-5 hide-element'
          >
            <AiOutlineHistory />
          </Button>
          <Button
            onClick={onToggleScriptModal}
            className='light-btn mr-2'
          >
            <FlexBox center='v-center'>
              <FaCode className='gray-text mr-1' />
              <span>
                Analytics Trackers
              </span>
            </FlexBox>
          </Button>
          <Tooltip placement='bottomLeft' text={savingStatus.text} visible={savingStatus.show}>
            <Button
              onClick={onSave}
              className='light-btn px-3'
              disabled={saving}
              onprogress={saving}
            >
              <i className='fas fa-save font-size-11' />
            Save
            </Button>
          </Tooltip>
        </FlexBox>
      </FlexBox>
      <ScriptsModal
        isVisible={openScriptModal}
        scripts={scripts}
        onClose={onToggleScriptModal}
        onChange={onChange}
        isSaving={saving}
        onSaveTheProduct={onSave}
      />
      <TemplatesModal
        isVisible={openSharingModal}
        onClose={onToggleSharingModal}
        onChange={onChange}
        isSaving={saving}
        product={product}
        onSaveTheProduct={onSave}
        onUpdateTemplate={onUpdateTemplate}
      />
    </FlexBox>
  );
};

Header.propTypes = {};

export default Header;
