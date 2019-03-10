import React from 'react';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import {
  Tab, Tabs, TabList, TabPanel
} from 'react-tabs';
import common from 'components/common';


import 'react-tabs/style/react-tabs.css';
// import './style.css';

const { Block, TabTitle, InputRow } = common;
const Fullfillment = ({ onProductFullfillmentFieldChange, productLink, file }) => {
  const onFieldChange = ({ target: { name, value } }) => {
    onProductFullfillmentFieldChange({ name, value });
  };
  const onFileUpload = (file) => {
    onProductFullfillmentFieldChange({ name: 'file', value: file });
  };


  return (
    <Tabs>
      <TabList>
        <Tab><TabTitle>Fullfillment</TabTitle></Tab>
      </TabList>
      <TabPanel>
        <Block>
          <InputRow>
            <InputRow.Label
              description='If your customer purchases the bump offer, they will receive two links on their success page.'
            >
                       Product link

            </InputRow.Label>
            <InputRow.UrlInput nam='productLimk' value={productLink} onChange={onFieldChange} prefix='http://'></InputRow.UrlInput>
          </InputRow>
          <InputRow>
            <InputRow.Label>Type</InputRow.Label>
            <InputRow.CheckBox checked description='A digital file that buyers will download or a service.'>Digital / Service</InputRow.CheckBox>
            <InputRow.CheckBox className='hide-element' description='A tangible item that you will ship to buyers.'>Phisical</InputRow.CheckBox>
          </InputRow>
          <InputRow>
            <InputRow.Label>Digital File (Optional)</InputRow.Label>
            <InputRow.AddComponentField
            // value={productFiles}
              source='product_file'
              onUploaded={onFileUpload}
              description='Files should be smaller than 100MB.
            We support: PDF, RAR, ZIP, and any image/audio/video format.'
            >
    Add files

            </InputRow.AddComponentField>
          </InputRow>
        </Block>
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = ({ product: { fullfillment } }) => ({ ...fullfillment });
export default connect(mapStateToProps, producActions)(Fullfillment);
