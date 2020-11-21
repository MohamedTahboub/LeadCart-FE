import React from 'react';
import clx from 'classnames';

import common from 'components/common';
import { CancelModal } from '../components/common';
import countriesData from 'data/taxes/countries';
import SelectBoxes from './SelectBoxes';


const { FlexBox, Button, InputRow } = common;
const { Label, NormalInput } = InputRow;

const Expandable = ({ open, onSave, onConfirmCancelEdits, saveLoading, fields, onChange, onCloseCancelModal, cancelModalOpened, onCancelEdits }) => {
  const { name } = fields;

  return (
    <FlexBox className={clx('expandable px-5', { open, 'py-3': open })} column spaceBetween>
      <InputRow className='my-2 flex-box v-center'>
        <Label>Zone Name:</Label>
        <NormalInput
          onChange={onChange}
          value={name}
          name='name'
        />
      </InputRow>

      <SelectBoxes
        onChange={onChange}
        fields={fields}
        data={countriesData}
        className='mt-4'
      />

      {/* <SelectBoxes
        onChange={onChange}
        fields={fields}
        data={countriesData}
        className='mt-4'
        type='states'
      /> */}

      <FlexBox className='expandable-buttons py-2' spaceBetween>
        <Button
          className='px-5 py-1 mr-3 light-btn'
          onClick={onConfirmCancelEdits}
          disabled={saveLoading}
        >
          Cancel
        </Button>

        <Button
          className='px-5 py-1 primary-color'
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
