import React, { Fragment } from 'react';
import Select from 'react-select';

import common from 'components/common';
import { options } from 'data/faqIcons';
import { useContext } from '../../../../actions';

const { InputRow, FlexBox } = common;
const { Label, AddImage } = InputRow;

const SelectInput = ({ onChange }) => {
  const { state: { modals: { sectionSetting = {} } = {} } } = useContext();
  const { styles: { isCustom, customOpenIcon = '', customCloseIcon = '' } } = sectionSetting;

  const onSelectIconChange = (selectedOption) => {
    const { value } = selectedOption;
    onChange({ name: 'styles.isCustom', value });
  };

  const onOpenIconChange = (img) => {
    onChange({ name: 'styles.customOpenIcon', value: img });
  };

  const onCloseIconChange = (img) => {
    onChange({ name: 'styles.customCloseIcon', value: img });
  };

  const [currentValue] = options.filter((ele) => ele.value === isCustom);
  const { value } = currentValue;

  return (
    <Fragment>
      <div className='margin-v-5'>
        <Label>Bullets Point:</Label>
        <Select
          options={options}
          onChange={onSelectIconChange}
          value={currentValue}
        />
      </div>

      {value === true &&
        <div>
          <FlexBox center='v-center margin-v-5'>
            <Label>Open custom bullets</Label>
            <AddImage
              onUploaded={onOpenIconChange}
              value={customOpenIcon}
            />
          </FlexBox>

          <FlexBox center='v-center margin-v-5'>
            <Label>Close custom bullets</Label>
            <AddImage
              onUploaded={onCloseIconChange}
              value={customCloseIcon}
            />
          </FlexBox>
        </div>
      }
    </Fragment>
  );
};


export default SelectInput;
