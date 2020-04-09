import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
// import { connect } from 'react-redux';
import { useContext } from '../../../actions';

import {
  SettingBox,
  ImageOption
} from './common';

const {
  Collapse,
  MiniTwitterPicker,

  FulfillmentRowCard,
  Currency,
  Tabs,
  Tab,
  InputRow
} = common;

const { Panel } = Collapse;


const themesOptions = [
  {
    src: 'https://i.imgur.com/g7ZKw0i.png',
    styles: {
      containerBackground: '#fff',
      containerTextColor: '#000',
      headerBackground: 'rgb(142, 209, 252)',
      borderColor: 'rgb(142, 209, 252)',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 5,
    }
  },
  {
    src: 'https://i.imgur.com/kPvXDwq.png',
    styles: {
      containerBackground: '#fff',
      containerTextColor: '#FCB900',
      headerTextColor: '#000',
      headerBackground: '#fff',
      borderColor: '#00D084',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 5,
    }
  },
  {
    src: 'https://i.imgur.com/LmsFKCt.png',
    styles: {
      containerBackground: '#fff',
      containerTextColor: '#000',
      contentHeadlineTextColor: '#EB144C',
      headerBackground: '#FCB900',
      borderColor: '#EB144C',
      borderStyle: 'dashed',
      borderWidth: 3,
      borderRadius: 1,
    }
  },

];

const currency = 'USD';
const {
  Label,
  SwitchInput,
  TextField,
  SelectOption
} = InputRow;

const BumpOffer = ({
  ...props
}) => {
  const {
    state: {
      modals: {
        sectionSetting = {}
      } = {}
    },
    actions
  } = useContext();

  const {
    styles = {},
    content = {},
    actions: sectionActions = {}
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

  return (
    <Tabs active='themes' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
      <Tab id='themes' title='Themes'>
        {themesOptions.map((theme) => (
          <ImageOption
            className='guarantee-theme-demo'
            value={theme.src}
            key={theme.src}
            onClick={onStylesChange(theme.styles)}
            active={styles.theme === theme.theme}
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
            prefix={<Currency value={currency} />}
            defaultValue={content.price}
            currency='$'
          />
        </InputRow>
      </Tab>

      <Tab id='advance' title='Advance'>
        <SettingBox
          title='Colors'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Background:
            </Label>
            <MiniTwitterPicker
              name='styles.containerBackground'
              value={styles.containerBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Container text:
            </Label>
            <MiniTwitterPicker
              name='styles.containerTextColor'
              value={styles.containerTextColor}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Header Background:
            </Label>
            <MiniTwitterPicker
              name='styles.headerBackground'
              value={styles.headerBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Header text:
            </Label>
            <MiniTwitterPicker
              name='styles.headerTextColor'
              value={styles.headerTextColor}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Content Headline Color:
            </Label>
            <MiniTwitterPicker
              name='styles.contentHeadlineTextColor'
              value={styles.contentHeadlineTextColor}
              onChange={onChange}
            />
          </InputRow>
        </SettingBox>

        <SettingBox title='Border Style'>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Border Color:
            </Label>
            <MiniTwitterPicker
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
                { label: '7 px', value: '7' },
              ]}
            />
          </InputRow>
        </SettingBox>

      </Tab>
    </Tabs>
  );
};
BumpOffer.propTypes = {

};


export default BumpOffer;
