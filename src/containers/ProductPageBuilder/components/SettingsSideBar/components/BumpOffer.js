import React from 'react';
import colorProps from 'color';

import common from 'components/common';
import { nestedKeyValue } from 'libs';
import { useContext } from '../../../actions';
import { ImageOption } from './common';
import InlinePopup from 'components/common/InlinePopup';
import FlatRadio from 'components/FlatRadio';
import { Title } from 'components/common/Titles';

import topImageTheme from 'assets/images/bumpOffers_templates/top.png';
import leftImageTheme from 'assets/images/bumpOffers_templates/left.png';
import rightImageTheme from 'assets/images/bumpOffers_templates/right.png';
import bottomImageTheme from 'assets/images/bumpOffers_templates/bottom.png';
import centeredImageTheme from 'assets/images/bumpOffers_templates/center.png';

import './style.css';


const {
  MiniColorPicker,
  Currency,
  Tabs,
  Tab,
  InputRow,
  FlexBox,
  CustomReactToggle,
  CustomRadio,
  CustomCheckbox,
  Tooltip
} = common;


const {
  Label,
  Toggle,
  TextField,
  SelectOption
} = InputRow;

const themesOptions = [
  {
    src: leftImageTheme,
    styles: {
      theme: 'LeftImage',
      containerBackground: '#F6F9FB',
      containerTextColor: '#707070',
      headerTextColor: '#2D3D68',
      contentHeadlineTextColor: '#007AFF',
      borderBottomColor: '#d0d1d4',
      borderBottomStyle: 'dashed',
      borderBottomWidth: 1,
      borderRadius: 3,
      toggleInput: 'checkbox',
      hasBlurBackgroundImage: false
    }
  },
  {
    src: rightImageTheme,
    styles: {
      theme: 'RightImage',
      containerBackground: '#F6F9FB',
      containerTextColor: '#707070',
      headerTextColor: '#2D3D68',
      contentHeadlineTextColor: '#007AFF',
      borderBottomColor: '#d0d1d4',
      borderBottomStyle: 'dashed',
      borderBottomWidth: 1,
      borderRadius: 3,
      toggleInput: 'checkbox',
      hasBlurBackgroundImage: false
    }
  },
  {
    src: topImageTheme,
    styles: {
      theme: 'TopImage',
      containerBackground: '#F6F9FB',
      containerTextColor: '#707070',
      headerTextColor: '#2D3D68',
      contentHeadlineTextColor: '#57B894',
      borderRadius: 3,
      toggleInput: 'radio',
      hasBlurBackgroundImage: false

    }
  },
  {
    src: centeredImageTheme,
    styles: {
      theme: 'CenteredImage',
      containerBackground: '#fff',
      containerTextColor: '#707070',
      headerTextColor: '#2D3D68',
      contentHeadlineTextColor: '#2D3D68',
      headerBackground: '#F6F9FB',
      borderColor: '#DDDDDD',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 3,
      toggleInput: 'checkbox-circle',
      hasBlurBackgroundImage: false
    }
  },
  {
    src: bottomImageTheme,
    styles: {
      theme: 'BottomImage',
      containerBackground: '#fff',
      containerTextColor: '#707070',
      headerTextColor: '#2D3D68',
      contentHeadlineTextColor: '#E13585',
      borderColor: '#DDDDDD',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 3,
      toggleInput: 'checkbox',
      hasBlurBackgroundImage: false
    }
  },
  {
    src: 'https://i.imgur.com/g7ZKw0i.png',
    styles: {
      theme: 'withoutImage',
      containerBackground: '#fff',
      containerTextColor: '#000',
      headerTextColor: '#fff',
      headerBackground: 'rgb(142, 209, 252)',
      borderColor: 'rgb(142, 209, 252)',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 5
    }
  },
  {
    src: 'https://i.imgur.com/kPvXDwq.png',
    styles: {
      theme: 'withoutImage',
      containerBackground: '#fff',
      containerTextColor: '#FCB900',
      headerTextColor: '#000',
      headerBackground: '#fff',
      borderColor: '#00D084',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 5
    }
  },
  {
    src: 'https://i.imgur.com/LmsFKCt.png',
    styles: {
      theme: 'withoutImage',
      containerBackground: '#fff',
      containerTextColor: '#000',
      headerTextColor: '#000',
      contentHeadlineTextColor: '#EB144C',
      headerBackground: '#FCB900',
      borderColor: '#EB144C',
      borderStyle: 'dashed',
      borderWidth: 3,
      borderRadius: 1
    }
  }
];


const isTransparent = (color) => colorProps(color)?.ansi256()?.object()?.alpha === 0;


const BumpOffer = () => {
  const {
    state: {
      modals: { sectionSetting = {} } = {}, funnel: { currency = 'USD' } = {},
      product: {
        pageStyles: {
          productPage: {
            firstColumn: { backgroundColor: columnBg } = {},
            backgroundColor: productBg
          } = {},
          pageBackgroundSettings: { firstSectionBackground:  { backgroundColor: sectionBg } = {} } = {}
        } = {}
      } = {}
    }, actions
  } = useContext();


  const getActiveMarkColor = () => {
    if (Boolean(headerBackground) && !isTransparent(headerBackground))
      return headerBackground;
    if (Boolean(containerBackground) && !isTransparent(containerBackground))
      return containerBackground;
    else if (Boolean(columnBg) && !isTransparent(columnBg))
      return columnBg;
    else if (Boolean(sectionBg) && !isTransparent(sectionBg))
      return sectionBg;
    else if (Boolean(productBg) && !isTransparent(productBg))
      return productBg;
    else
      return '#fff';
  };


  const ToggleInputOption = ({ styles, onChange, value, Input, className }) => {
    const { containerBackground, headerTextColor = '#000' } = styles;
    const activeMarkColor = getActiveMarkColor();
    const style = { '--header-text-color': headerTextColor, '--container-bg-color': containerBackground };

    return (
      <FlatRadio
        className='bump-offer-option'
        style={{ ...style, width: '50%' }}
        options={[{
          label:
          <Input
            className={className}
            borderColor={headerTextColor}
            backgroundColor={value === 'radio' ? 'transparent' : headerTextColor}
            checkmarkColor={value === 'radio' ? headerTextColor : activeMarkColor}
            checked
            active
          />
          ,
          value
        }]}
        value={styles.toggleInput || 'checkbox'}
        name='styles.toggleInput'
        onToggle={(target) => onChange({ target })}

      />
    );
  };

  const toggleInputsOptions = [
    {
      value: 'checkbox',
      Input: CustomCheckbox
    },
    {
      value: 'checkbox-circle',
      Input: CustomCheckbox,
      className: 'checkbox-circle'
    },
    {
      value: 'radio',
      Input: CustomRadio
    },
    {
      value: 'toggle',
      Input: CustomReactToggle
    }
  ];


  const {
    styles = {},
    content = {}
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

  const onToggImageBackground = ({ name }) => {
    onChange({
      target: {
        name,
        value: !nestedKeyValue(sectionSetting, name)
      }
    });
  };

  const { headerBackground, borderWidth, borderBottomWidth, containerBackground } = styles;


  const hasHeaderBacground = headerBackground;
  const hasBorder = borderWidth;
  const hasBorderBottom = borderBottomWidth;
  const hasShadowEffect = styles.hasOwnProperty('hasBlurBackgroundImage');
  const toggleOptionBackground = (headerBackground && headerBackground !== 'transparent') ? headerBackground : containerBackground;


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
            onChange={onChange}
            defaultValue={content.name}
            value={content.name}
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
            onChange={onChange}
            type='number'
            prefix={<Currency value={currency} />}
            defaultValue={content.price}
            value={content.price}
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


      <Tab id='styles' title='Styles'>
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


        {hasBorderBottom &&
        <InlinePopup
          title='Border Bottom Style'
          popUpContent={(
            <FlexBox column>
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Border Bottom Color:
                </Label>
                <MiniColorPicker
                  name='styles.borderBottomColor'
                  value={styles.borderBottomColor}
                  onChange={onChange}
                />

              </InputRow>
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Border Bottom Style:
                </Label>
                <SelectOption
                  value={styles.borderBottomStyle}
                  name='styles.borderBottomStyle'
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
                  Border Bottom Width:
                </Label>
                <SelectOption
                  value={styles.borderBottomWidth}
                  name='styles.borderBottomWidth'
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
            </FlexBox>
          )}
        />
        }

        <FlexBox className='mt-3' column>
          <Title className='mb-1'>Toggle Input: </Title>
          <FlexBox style={{ backgroundColor: toggleOptionBackground, borderRadius: '5px' }} wrappable>
            {toggleInputsOptions.map((props) => <ToggleInputOption {...props} styles={styles} onChange={onChange}/>)}
          </FlexBox>
        </FlexBox>

        {hasShadowEffect &&
        <FlexBox spaceBetween center='v-center mt-3'>
          <Tooltip placement='left' overlay='filling the bump offer image left space with its shadow'>
            <FlexBox className='mr-2' flex>
                Fill image background:
            </FlexBox>
          </Tooltip>

          <FlexBox>
            <Toggle
              value={styles.hasBlurBackgroundImage}
              name='styles.hasBlurBackgroundImage'
              onToggle={onToggImageBackground}
            />
          </FlexBox>
        </FlexBox>
        }

      </Tab >
    </Tabs >
  );
};
BumpOffer.propTypes = {};


export default BumpOffer;
