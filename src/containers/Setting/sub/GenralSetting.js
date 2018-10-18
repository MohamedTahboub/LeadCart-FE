import React from 'react';
import common from 'components/common'

const { InputRow, MainBlock, DeleteButton } = common




export default props => (
    <MainBlock title='General Marketplace Settings'>
        <InputRow >
            <InputRow.Label>Marketplace Name</InputRow.Label>
            <InputRow.NormalInput></InputRow.NormalInput>
        </InputRow>
        <InputRow>
            <InputRow.Label
                notes="Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format."
            >Default Logo</InputRow.Label>
            <InputRow.AddComponentField subLabel="Light Logo" suffixIcon={<DeleteButton iconType='trash' />} >Upload</InputRow.AddComponentField>
            <InputRow.AddComponentField subLabel="Dark Logo" suffixIcon={<DeleteButton iconType='trash' />} >Upload</InputRow.AddComponentField>
        </InputRow>
        <InputRow margin='50'>
            <InputRow.Label
                notes="Select a country to be displayed as the default on your checkout pages. Your customers can always select a different country."
            >Default Country</InputRow.Label>
            <InputRow.SelectOption
                options={[
                    { label: 'Select a country', value: 0 },
                    { label: 'Select a country', value: 1 }
                ]}
            />
        </InputRow>
        <InputRow>
            <InputRow.Label>Time Zone</InputRow.Label>
            <InputRow.SelectOption
                options={[
                    { label: '(UTC+03:00)Moscow, St. Petersburg, Volgograd', value: 0 },
                    { label: '(UTC+02:00)Moscow, St. Petersburg, Volgograd', value: 1 }
                ]}
            />
        </InputRow>
        <InputRow margin='20'>
            <InputRow.Label>Support Contact</InputRow.Label>
            <InputRow.SmallInput>support@</InputRow.SmallInput>
        </InputRow>
        <InputRow margin='20'>
            <InputRow.Label>Currency</InputRow.Label>
            <InputRow.SelectOption
                options={[
                    { label: 'USD - United States Dollar', value: 0 },
                    { label: 'EUR - Euro', value: 1 },
                    { label: 'GBP - British Pound', value: 2 },
                    { label: 'INR - Indian Rupee', value: 3 },
                    { label: 'ILS - Israeli Shekel', value: 4 }
                ]}
            />
        </InputRow>
        <InputRow margin='30' >
            <InputRow.Label
                notes='Number of days digital download links will be available to your customers after purchase.'
            >Digital Product Expiration (Days)</InputRow.Label>
            <InputRow.SelectOption
                options={[
                    { label: '5 days', value: 0 },
                    { label: '10 days', value: 1 },
                    { label: '15 days', value: 2 },
                    { label: '20 days', value: 3 },
                    { label: '30 days', value: 4 }
                ]}
            />
        </InputRow>
        <InputRow margin='50' >
            <InputRow.Label
                notes='Embed any custom HTML code or scripts in the footer of all of your checkout pages.'
            >Embed HTML/Scripts</InputRow.Label>
            <InputRow.CodeInputArea>Enter HTML/Scripts here...</InputRow.CodeInputArea>
        </InputRow>
        <InputRow margin='-50'>
            <InputRow.Label
                notes="Select where you would like to send your customers after their order is complete."
            >Purchase Completion?</InputRow.Label>
            <InputRow.CheckBox>Redirect To Original Product Redirect URL</InputRow.CheckBox>
            <InputRow.CheckBox>Display Summary Page With Redirect Links</InputRow.CheckBox>
        </InputRow>
        <InputRow margin='100'>
            <InputRow.Label
                notes="Before redirecting to your custom thank you page we will attempt to fire your custom, Facebook, and Google pixels. This will cause a few second delay. Leaving this off will immediately redirect to your thank you page without firing your pixels."
            >Fire Pixels Before Redirect (Optional)</InputRow.Label>
            <InputRow.SwitchInput></InputRow.SwitchInput>
        </InputRow>
        <InputRow margin='30'>
            <InputRow.Label
                notes="Define what text should be shown in the digital download button that appears in the order receipt and summary page."
            >Digital Download Button Text</InputRow.Label>
            <InputRow.NormalInput></InputRow.NormalInput>
        </InputRow>
    </MainBlock>
);
