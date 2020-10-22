import React from 'react';
import common from 'components/common';
import { useContext } from '../../../actions';
import { FiColumns } from 'react-icons/fi';
import { VscBrowser } from 'react-icons/vsc';
import FlatRadio from 'components/FlatRadio';
import { SettingBox } from './common';
import ReactToolTip from 'react-tooltip'
const {
  MiniTwitterPicker,
  Tabs,
  Tab,
  InputRow,
  FlexBox
} = common;


const {
  Label,
  SelectOption,
  Toggle
} = InputRow;

const PageSettings = () => {
  const {
    state: { product = {} },
    actions
  } = useContext();

  const { pageStyles = {} } = product;
  const onToggleChange = (target) => {
    actions.onProductFieldChange(target);
  };

  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };


  return (
    <Tabs active='styles' className='p-2 flex' tabsContentClassName='scrolling-70vh flex'>

      <Tab id='styles' title='Styles' >
        <SettingBox
          title='Size'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Product Width:
            </Label>
            <SelectOption
              value={pageStyles.widthMode}
              name='pageStyles.widthMode'
              onChange={onChange}
              options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Wide', value: 'wide' }
              ]}
            />
          </InputRow>
        </SettingBox>
        <SettingBox
          title='Colors'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Screen Background Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.screenBackground'
              value={pageStyles.screenBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Product Background Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.productBackground'
              value={pageStyles.productBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Theme Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.themeColor'
              value={pageStyles.themeColor}
              onChange={onChange}
            />
          </InputRow>
        </SettingBox>

        <SettingBox title='Border Style'>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Border Radius:
            </Label>
            <SelectOption
              value={pageStyles.borderRadius}
              name='pageStyles.borderRadius'
              onChange={onChange}
              options={[
                { label: '0 px', value: '0' },
                { label: '1 px', value: '1' },
                { label: '2 px', value: '2' },
                { label: '3 px', value: '3' },
                { label: '4 px', value: '4' },
                { label: '5 px', value: '5' },
                { label: '6 px', value: '6' },
                { label: '7 px', value: '7' },
                { label: '8 px', value: '8' },
                { label: '9 px', value: '9' },
                { label: '10 px', value: '10' }
              ]}
            />
          </InputRow>
        </SettingBox>

      </Tab>
      <Tab id='advance' title='Advance' >
        <SettingBox
          title='Product Header'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Show:
            </Label>
            <Toggle
              value={pageStyles.showHead}
              name='pageStyles.showHead'
              onToggle={onToggleChange}
              beforeLabel='Show'
              afterLabel='Hide'
            />
          </InputRow>
        </SettingBox>
        <SettingBox
          title='Product Page Layout'
        >
          <FlexBox center='v-center' className='p-2'>
            <Label className='sidebar-input-label'>
              Layout:
            </Label>
            <FlatRadio
              options={[
                {
                  label: (
                    <FlexBox center='v-center h-center' className='p-2'>
                      <VscBrowser
                        data-tip='One Column Product Layout'
                        className={`${pageStyles.layout !== 'two-column' ? 'white-text' : 'gray-text'} mr-1`}
                      />
                    </FlexBox>
                  )
                  , value: 'one-column'
                },
                {
                  label: (
                    <FlexBox center='v-center h-center' className='p-2'>
                      <FiColumns
                        data-tip='Two Column Product Layout'
                        className={`${pageStyles.layout === 'two-column' ? 'white-text' : 'gray-text'} mr-1`}
                      />
                    </FlexBox>
                  ), value: 'two-column'
                },
              ]}
              value={pageStyles.layout || 'one-column'}
              name='pageStyles.layout'
              onToggle={onToggleChange}
            />
          </FlexBox>
        </SettingBox>
        <ReactToolTip delayShow={300} />
      </Tab>
    </Tabs>
  );
};
PageSettings.propTypes = {};


export default PageSettings;
