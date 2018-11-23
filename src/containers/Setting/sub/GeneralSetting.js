import React from 'react';
import common from 'components/common';
import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux';
import countries from 'data/countries';
import timeZones from 'data/timeZones';

const { InputRow, MainBlock, DeleteButton } = common;


const GeneralSettings = (props) => {
  const {
    name,
    country,
    currency,
    darkLogo,
    downloadButtonText,
    firePixel,
    footerScript,
    lightLogo,
    productExpirationDays,
    purchaseCompletion,
    timeZone,
    url,
    errors
  } = props.general;
  const onFieldChange = ({ target: { name, value } }) => {
    props.onUserGeneralSettingsFieldUpdate({ name, value });
  };

  const onImageUpload = (name, value) => {
    props.onUserGeneralSettingsFieldUpdate({ name, value });
  };

  const onPurshaseCompletionChange = (value) => {
    props.onUserGeneralSettingsFieldUpdate({ name: 'purchaseCompletion', value });
  };
  const onChangeFirePixel = () => {
    props.onUserGeneralSettingsFieldUpdate({ name: 'firePixel', value: !props.general.firePixel });
  };

  return (
    <MainBlock title='General Marketplace Settings'>
      <InputRow>
        <InputRow.Label error={errors.name}>Company Name</InputRow.Label>
        <InputRow.NormalInput
          error={errors.name}
          name='name' value={name} onChange={onFieldChange}
        >
        </InputRow.NormalInput>
      </InputRow>
      <InputRow>
        <InputRow.Label
          error={errors.lightLogo || errors.darkLogo}
          notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
        >
          Default Logo

        </InputRow.Label>
        <InputRow.AddImage
          value={lightLogo}
          subLabel='Light Logo'
          source='lightLogo'

          name='lightLogo' onUploaded={(image) => onImageUpload('lightLogo', image)}
        >
          Light Logo

        </InputRow.AddImage>
        <InputRow.AddImage
          value={darkLogo}
          subLabel='Dark Logo'
          source='darkLogo'
          classes={['margin-left-120']}
          name='darkLogo' onUploaded={(image) => onImageUpload('darkLogo', image)}
        >
          Dark Logo

        </InputRow.AddImage>
      </InputRow>
      <InputRow margin='50'>
        <InputRow.Label
          error={errors.country}
          notes='Select a country to be displayed as the default on your checkout pages. Your customers can always select a different country.'
        >
          Default Country

        </InputRow.Label>
        <InputRow.SearchInput
          value={country} data={countries} target='name' name='country'
          onChange={onFieldChange}
        />

      </InputRow>
      <InputRow>
        <InputRow.Label error={errors.timeZones}>Time Zone</InputRow.Label>
        <InputRow.SearchInput
          value={timeZone} data={timeZones} target='value' name='timeZone'
          onChange={onFieldChange}
        />
      </InputRow>
      <InputRow margin='20'>
        <InputRow.Label error={errors.support}>Support Contact</InputRow.Label>
        <InputRow.SmallInput name='support'>support@</InputRow.SmallInput>
      </InputRow>
      <InputRow margin='20'>
        <InputRow.Label error={errors.currency}>Currency</InputRow.Label>
        <InputRow.SelectOption
          value={currency}
          name='currency'
          onChange={onFieldChange}
          options={[
            { label: 'USD - United States Dollar', value: 'USD' }
          ]}
        />
      </InputRow>
      <InputRow margin='30'>
        <InputRow.Label
          error={errors.productExpirationDays}
          notes='Number of days digital download links will be available to your customers after purchase.'
        >
          Digital Product Expiration (Days)

        </InputRow.Label>
        <InputRow.SelectOption
          value={productExpirationDays}
          name='productExpirationDays'
          onChange={onFieldChange}
          options={[
            { label: '7 days', value: 7 },
            { label: '10 days', value: 10 },
            { label: '15 days', value: 15 },
            { label: '20 days', value: 20 },
            { label: '30 days', value: 30 }
          ]}
        />
      </InputRow>
      <InputRow margin='50'>
        <InputRow.Label
          error={errors.footerScript}
          notes='Embed any custom HTML code or scripts in the footer of all of your checkout pages.'
        >
          Embed HTML/Scripts

        </InputRow.Label>
        <InputRow.CodeInputArea
          error={errors.footerScript}
          value={footerScript}
          name='footerScript' onChange={onFieldChange}
        >
          Enter HTML/Scripts here...

        </InputRow.CodeInputArea>
      </InputRow>
      <InputRow margin='-50'>
        <InputRow.Label
          notes='Select where you would like to send your customers after their order is complete.'
        >
          Purchase Completion?

        </InputRow.Label>
        <InputRow.CheckBox
          value={purchaseCompletion === 'ProductRedirectUrl'}
          onChange={() => onPurshaseCompletionChange('ProductRedirectUrl')
          }
        >
          Redirect To Original Product Redirect URL

        </InputRow.CheckBox>

        <InputRow.CheckBox
          value={purchaseCompletion === 'Summary'}
          onChange={() => onPurshaseCompletionChange('Summary')}
        >
          Display Summary Page With Redirect Links

        </InputRow.CheckBox>
      </InputRow>
      <InputRow margin='100'>
        <InputRow.Label
          error={errors.firePixel}

          notes='Before redirecting to your custom thank you page we will attempt to fire your custom, Facebook, and Google pixels. This will cause a few second delay. Leaving this off will immediately redirect to your thank you page without firing your pixels.'
        >
          Fire Pixels Before Redirect (Optional)

        </InputRow.Label>
        <InputRow.SwitchInput name='firePixel' onToggle={onChangeFirePixel} value={firePixel}></InputRow.SwitchInput>
      </InputRow>
      <InputRow margin='30'>
        <InputRow.Label
          error={errors.downloadButtonText}
          notes='Define what text should be shown in the digital download button that appears in the order receipt and summary page.'
        >
          Digital Download Button Text

        </InputRow.Label>
        <InputRow.NormalInput name='downloadButtonText' onChange={onFieldChange} value={downloadButtonText} error={errors.downloadButtonText}></InputRow.NormalInput>
      </InputRow>
    </MainBlock>
  );
};
const mapStateToProps = ({ settings: { generalModel: general } }) => ({ general });
export default connect(mapStateToProps, settingsActions)(GeneralSettings);
