import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import countriesList from 'data/countries';
import * as immutable from 'object-path-immutable';
import * as invoicingActions from 'actions/invoicing';
import { connect } from 'react-redux';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { invoicingSettingsSchema } from 'libs/validation';
import { downloadFile, notification } from 'libs';

const { FlexBox, InputRow, Button, Tooltip } = common;
const { Label, TextField, SearchInput, AddImage, Toggle } = InputRow;
const countries = countriesList.map(({ name: label, code: value }) => ({ label, value }));


const Invoicing = ({ invoicing, ...props }) => {

  const [values, setValues] = useState({});
  const [error, setError] = useState();

  const onSave = async () => {

    const { isValid, value: invoiceDetails, errorList = '' } = await invoicingSettingsSchema(values);

    if (!isValid)
      return notification.failed('Please check the fields, all fields are required');

    props.updateInvoicingDetails(invoiceDetails, {
      onSuccess: () => {
        notification.success('Invoices updated Successfully');
      },
      onFailed: (message) => {
        notification.failed(message);
      }
    });
  };


  const onChange = ({ target: { name, value } }) => {
    const newValues = immutable.set(values, name, value);
    setValues(newValues);
  };

  const onLocalChange = (name, value) => {
    onChange({ target: { name, value } });
  };

  const onDownloadSampleInvoice = async (e) => {
    e.preventDefault();
    const { isValid, value: { enabled, ...invoiceDetails } = {}, errorList } = await invoicingSettingsSchema(values);

    if (!isValid)
      return notification.failed('Please check the fields, all fields are required');

    props.generateSampleInvoice(invoiceDetails, {
      onSuccess: ({ invoice }) => {
        downloadFile(invoice, 'sample invoice.pdf');
        notification.success('A sample invoice has been generated successfully');
      },
      onFailed: (message) => {
        notification.failed(message);
      }
    });
  };

  useEffect(() => {
    setValues(invoicing);
  }, [invoicing]);

  const { streetAddress, streetAddressLine2, state, city, country } = values.address || {};
  return (
    <FlexBox column >
      <FlexBox flex spaceBetween center='v-center'>
        <FlexBox center='v-center' className='large-text m-0 mr-4 bold-text'>
          <span>
            Company Invoicing Details
          </span>
          <FlexBox className='ml-5 item-clickable' center='v-center' onClick={onDownloadSampleInvoice}>
            <Tooltip text='Generate sample invoice with the current details.' placement='bottom'>
              <FaFileInvoiceDollar color='gray' size={16} />
            </Tooltip>
            <span className='small-text gray-text ml-2'>Generate Sample</span>
          </FlexBox>
        </FlexBox>
        {error && (
          <span className='error-text truncate max-width-400'>{error}</span>
        )}
        <Button
          onClick={onSave}
          className='primary-btn px-3'
        >
          Save Changes
        </Button>
      </FlexBox>
      <FlexBox className='gray-text my-3 small-text'>
        These details will be populated in your customers invoices
      </FlexBox>
      <FlexBox column>
        <FlexBox className='mt-3' center='v-center'>
          <Label>Enable</Label>
          <Toggle
            value={values.enabled}
            name='enabled'
            onToggle={({ name, value }) => onLocalChange(name, value)}
          />
        </FlexBox>
        <FlexBox className='mt-3' center='v-center'>
          <Label>Company Name</Label>
          <TextField
            value={values.companyName}
            name='companyName'
            disabled={!values.enabled}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox className='mt-3' center='v-center'>
          <Label>Logo</Label>
          <AddImage
            value={values.logo}
            subLabel='Logo'
            disabled={!values.enabled}
            source='company_logo'
            name='logo'
            onUploaded={(image) => onLocalChange('logo', image)}
          >
            company logo
          </AddImage>
        </FlexBox>
        <FlexBox className='mt-3' center='v-center'>
          <Label>Tax Id</Label>
          <TextField
            value={values.taxId}
            name='taxId'
            disabled={!values.enabled}
            onChange={onChange}
          />
        </FlexBox>
      </FlexBox>
      <span className='title-text bold-text mt-3'>
        Company Address:
      </span>
      <FlexBox column className='pl-3'>
        <FlexBox className='mt-3' center='v-center'>
          <Label>Country</Label>
          <SearchInput
            options={countries}
            value={country}
            disabled={!values.enabled}
            // target='country'
            name='address.country'
            // defaultValue={defaultCountry}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox className='mt-3' center='v-center'>
          <Label>Street Address</Label>
          <TextField
            name='address.streetAddress'
            value={streetAddress}
            disabled={!values.enabled}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox className='mt-3' center='v-center'>
          <Label>Street Address Line 2 </Label>
          <TextField
            value={streetAddressLine2}
            name='address.streetAddressLine2'
            disabled={!values.enabled}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox className='mt-3' center='v-center'>
          <Label>City</Label>
          <TextField
            value={city}
            name='address.city'
            disabled={!values.enabled}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox className='mt-3' center='v-center'>
          <Label>State</Label>
          <TextField
            value={state}
            name='address.state'
            disabled={!values.enabled}
            onChange={onChange}
          />
        </FlexBox>
      </FlexBox>

    </FlexBox>
  );
};

Invoicing.propTypes = {};
const mapStateToProps = ({ settings: { invoicing = {} } = {} }) => ({ invoicing });

export default connect(mapStateToProps, invoicingActions)(Invoicing);
