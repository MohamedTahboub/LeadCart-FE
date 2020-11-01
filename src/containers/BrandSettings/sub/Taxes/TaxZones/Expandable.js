import React from 'react';
import clx from 'classnames';
import Select from 'react-select';

import common from 'components/common';
import { CancelModal } from '../components';
import countriesData from 'data/taxes/countries';

const { FlexBox, Button, InputRow } = common;
const { Label, NormalInput } = InputRow;

const Expandable = ({ open, onSave, onConfirmCancelEdits, saveLoading, fields, onChange, onCloseCancelModal, cancelModalOpened, onCancelEdits }) => {
  const { name, countries = [] } = fields;

  const getCountriesOptions = (countries) => countries.map(({ name: label, code: value }) => ({ label, value }));
  const countriesOptions = getCountriesOptions(countriesData);
  const defaultCountries = getCountriesOptions(countriesData.filter(({ code }) => countries.includes(code)));


  return (
    <FlexBox className={clx('expandable px-5 h-center', { open, 'py-3': open })} column spaceBetween>

      <InputRow className='my-2 flex-box v-center'>
        <Label>Zone Name:</Label>
        <NormalInput
          onChange={onChange}
          value={name}
          name='name'
        />
      </InputRow>

      <InputRow>
        <Label>Countries: </Label>
        <Select
          isMulti
          className='expandable-form-select'
          options={countriesOptions}
          defaultValue={defaultCountries}
          onChange={(arrOfValues) => {
            onChange({ target: { value: arrOfValues.map(({ value }) => value), name: 'countries' } });
          }}
        />
      </InputRow>


      <FlexBox className='mt-5' spaceBetween>
        <Button
          className='px-5 py-2 mr-3 light-btn'
          onClick={onConfirmCancelEdits}
          disabled={saveLoading}
        >
          Cancel
        </Button>

        <Button
          className='px-5 py-2 primary-color'
          onClick={onSave}
          disabled={saveLoading}
          onprogress={saveLoading}
        >
          Save
        </Button>
      </FlexBox>

      <CancelModal
        onSave={onSave}
        onClose={onCloseCancelModal}
        isVisible={cancelModalOpened}
        onCancelEdits={onCancelEdits}
        saveLoading={saveLoading}
      />
    </FlexBox>
  );
};

export default Expandable;
