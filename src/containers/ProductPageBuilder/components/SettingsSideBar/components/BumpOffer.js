import React from 'react';

import common from 'components/common';
import { nestedKeyValue } from 'libs';
import { useContext } from '../../../actions';
import { ImageOption, SettingBox } from './common';
import InlinePopup from 'components/common/InlinePopup';
import FlatRadio from 'components/FlatRadio';
import CheckBox from 'components/common/Checkbox';


import './style.css';
import { Title } from 'components/common/Titles';


const {
  MiniColorPicker,
  Currency,
  Tabs,
  Tab,
  InputRow,
  FlexBox
} = common;


const {
  Label,
  Toggle,
  TextField,
  SelectOption,
  Radio
} = InputRow;

const themesOptions = [
  {
    src: 'https://i.imgur.com/g7ZKw0i.png',
    styles: {
      theme: 'withoutImage',
      containerBackground: '#fff',
      containerTextColor: '#000',
      headerBackground: 'rgb(142, 209, 252)',
      borderColor: 'rgb(142, 209, 252)',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 5
    }
  },
  // {
  //   src: 'https://i.imgur.com/kPvXDwq.png',
  //   styles: {
  //     theme: 'withoutImage',
  //     containerBackground: '#fff',
  //     containerTextColor: '#FCB900',
  //     headerTextColor: '#000',
  //     headerBackground: '#fff',
  //     borderColor: '#00D084',
  //     borderStyle: 'dashed',
  //     borderWidth: 2,
  //     borderRadius: 5
  //   }
  // },
  // {
  //   src: 'https://i.imgur.com/LmsFKCt.png',
  //   styles: {
  //     theme: 'defaults',
  //     containerBackground: '#fff',
  //     containerTextColor: '#000',
  //     contentHeadlineTextColor: '#EB144C',
  //     headerBackground: '#FCB900',
  //     borderColor: '#EB144C',
  //     borderStyle: 'dashed',
  //     borderWidth: 3,
  //     borderRadius: 1
  //   }
  // }

  {
    src: 'https://i.imgur.com/CWxHsY4.png',
    styles: {
      theme: 'LeftImage',
      containerBackground: '#F6F9FB',
      containerTextColor: '#828282',
      containerTitletColor: '#2d3d68',
      contentHeadlineTextColor: '#4da0fe',
      borderBottomColor: '#828282',
      borderBottomStyle: 'dashed',
      borderBottomWidth: 2,
      borderRadius: 3
    }
  },
  // {
  //   src: 'https://i.imgur.com/CWxHsY4.png',
  //   styles: {
  //     theme: 'RightImage',
  //     containerBackground: '#F6F9FB',
  //     containerTextColor: '#828282',
  //     containerTitletColor: '#2d3d68',
  //     contentHeadlineTextColor: '#4da0fe',
  //     borderBottomColor: '#828282',
  //     borderBottomStyle: 'dashed',
  //     borderBottomWidth: 2,
  //     borderRadius: 3
  //   }
  // },
  {
    src: 'https://i.imgur.com/EWOVWAC.png',
    styles: {
      theme: 'TopImage',
      containerBackground: '#F6F9FB',
      containerTextColor: '#828282',
      containerTitletColor: '#000',
      contentHeadlineTextColor: 'green',
      borderRadius: 3
    }
  },
  {
    src: 'https://i.imgur.com/RYqO0JA.png',
    styles: {
      theme: 'CenteredImage',
      containerBackground: '#fff',
      containerTextColor: '#828282',
      containerTitletColor: '#000',
      contentHeadlineTextColor: 'darkblue',
      headerBackground: '#eee',
      borderColor: '#999',
      borderStyle: 'dashed',
      borderWidth: 3,
      borderRadius: 1
    }
  },
  {
    src: 'https://i.imgur.com/dGDYB9u.png',
    styles: {
      theme: 'BottomImage',
      containerBackground: '#fff',
      containerTextColor: '#828282',
      containerTitletColor: '#000',
      contentHeadlineTextColor: 'red',
      borderColor: '#999',
      borderStyle: 'dashed',
      borderWidth: 3,
      borderRadius: 1
    }
  }


];

const ToggleInputOption = ({ styles, onChange, label: labelName, value, Input, className }) => (
  <FlatRadio
    className='mb-2 full-width bump-offer-option'
    options={[{
      label:
        <FlexBox className='v-center' spaceBetween>
          {labelName}
          <Input className={className} />
        </FlexBox>
      , value
    }]}
    value={styles.toggleInput || 'checkbox'}
    name='styles.toggleInput'
    onToggle={(target) => onChange({ target })}
  />
);


const toggleInputsOptions = [
  {
    label: 'Checkmark',
    value: 'checkbox',
    Input: CheckBox
  },
  {
    label: 'Circle Checkmark',
    value: 'checbox-circle',
    Input: CheckBox,
    className: 'checbox-circle'
  },
  {
    label: 'Radio',
    value: 'radio',
    Input: Radio
  },
  {
    label: 'Toggle',
    value: 'toggle',
    Input: Toggle
  }
];

const BumpOffer = () => {
  const {
    state: { modals: { sectionSetting = {} } = {}, funnel: { currency = 'USD' } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    content = {}
    // actions: sectionActions = {}
  } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const onStylesChange = (styles) => (src) => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles',
        value: styles
      }
    });
  };
  const onToggleChange = ({ name }) => {
    onChange({
      target: {
        name,
        value: !nestedKeyValue(sectionSetting, name)
      }
    });
  };

  const hasHeaderBacground = styles?.headerBackground;
  const hasBorder = styles?.borderWidth;


  return (
    <Tabs active='themes' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
      <Tab id='themes' title='Themes'>
        {themesOptions.map((theme) => (
          <ImageOption
            key={theme.src}
            value={theme.src}
            onClick={onStylesChange(theme.styles)}
            active={styles.theme === theme.theme}
            className='guarantee-theme-demo'
          />
        ))}
      </Tab>

      <Tab id='settings' title='settings'>
        <InputRow className='sidebar-row'>
          <Label
            className='sidebar-input-label'
            description='This will appear on your cart page,this is just for presentation purpose'
          >
            Offer Name:
          </Label>
          <TextField
            className='default-pricing-field-length'
            name='content.name'
            onBlur={onChange}
            defaultValue={content.name}
            uncontrolled
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Offer Price:
          </Label>
          <TextField
            className='default-pricing-field-length'
            name='content.price'
            onBlur={onChange}
            type='number'
            prefix={<Currency value={currency} />}
            defaultValue={content.price}
            uncontrolled
          />
        </InputRow>
        <FlexBox spaceBetween center='v-center'>
          <FlexBox flex>
            Force opt-out:
          </FlexBox>
          <FlexBox flex>
            <Toggle
              value={content.checked}
              name='content.checked'
              onToggle={onToggleChange}
            />
          </FlexBox>
        </FlexBox>
      </Tab>


      <Tab id='advance' title='Advance'>
        <FlexBox className='mb-3' column>
          <Title className='mb-1'>Toggle Input: </Title>
          {toggleInputsOptions.map((props) => <ToggleInputOption {...props} styles={styles}onChange={onChange}/>)}
        </FlexBox>

        <InlinePopup
          title='Offer Colors'
          popUpContent={(
            <FlexBox column>
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Background:
                </Label>
                <MiniColorPicker
                  name='styles.containerBackground'
                  value={styles.containerBackground}
                  onChange={onChange}
                />
              </InputRow>


              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Container text:
                </Label>
                <MiniColorPicker
                  name='styles.containerTextColor'
                  value={styles.containerTextColor}
                  onChange={onChange}
                />
              </InputRow>
              {hasHeaderBacground &&
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Header Background:
                </Label>
                <MiniColorPicker
                  name='styles.headerBackground'
                  value={styles.headerBackground}
                  onChange={onChange}
                />
              </InputRow>
              }
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Header text:
                </Label>
                <MiniColorPicker
                  name='styles.headerTextColor'
                  value={styles.headerTextColor}
                  onChange={onChange}
                />
              </InputRow>
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Content Headline Color:
                </Label>
                <MiniColorPicker
                  name='styles.contentHeadlineTextColor'
                  value={styles.contentHeadlineTextColor}
                  onChange={onChange}
                />
              </InputRow>
            </FlexBox>
          )}
        />

        {hasBorder &&
        <InlinePopup
          title='Border Style'
          popUpContent={(
            <FlexBox column>
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Border Color:
                </Label>
                <MiniColorPicker
                  name='styles.borderColor'
                  value={styles.borderColor}
                  onChange={onChange}
                />

              </InputRow>
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Border Style:
                </Label>
                <SelectOption
                  value={styles.borderStyle}
                  name='styles.borderStyle'
                  onChange={onChange}
                  className='bump-offer-style-dropdown'
                  options={[
                    { label: 'Solid', value: 'solid' },
                    { label: 'Dashed', value: 'dashed' }
                  ]}
                />
              </InputRow>
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Border Width:
                </Label>
                <SelectOption
                  value={styles.borderWidth}
                  name='styles.borderWidth'
                  onChange={onChange}
                  className='bump-offer-style-dropdown'
                  options={[
                    { label: '0 px', value: '0' },
                    { label: '1 px', value: '1' },
                    { label: '2 px', value: '2' },
                    { label: '3 px', value: '3' },
                    { label: '4 px', value: '4' }
                  ]}
                />
              </InputRow>

              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Border Radius:
                </Label>
                <SelectOption
                  value={styles.borderRadius}
                  name='styles.borderRadius'
                  onChange={onChange}
                  className='bump-offer-style-dropdown'
                  options={[
                    { label: '0 px', value: '0' },
                    { label: '1 px', value: '1' },
                    { label: '2 px', value: '2' },
                    { label: '3 px', value: '3' },
                    { label: '4 px', value: '4' },
                    { label: '5 px', value: '5' },
                    { label: '6 px', value: '6' },
                    { label: '7 px', value: '7' }
                  ]}
                />
              </InputRow>
            </FlexBox>
          )}
        />
        }
      </Tab >
    </Tabs >
  );
};
BumpOffer.propTypes = {};


export default BumpOffer;
