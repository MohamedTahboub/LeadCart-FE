import React, { useEffect, useState } from 'react';

import common from 'components/common';
import countriesData from 'data/taxes/countries';


import './style.css';

const { InputRow, FlexBox } = common;
const { Label, TextField } = InputRow;

const OptionItem = ({ label, onToggle }) => (
  <FlexBox
    className='zone-option-item py-1 px-2 soft-edges small-text m-1 item-clickable v-center'
    onClick={onToggle}
  >
    {label}
  </FlexBox>
);


const SelectBoxes = ({ onChange, fields, type = 'countries', className }) => {
  const { countries = [], states = [] } = fields;
  const isCountriesSelect = type === 'countries';
  const currentData = isCountriesSelect ? countries : states;
  const allData = isCountriesSelect ? countriesData : [];

  const [availableOptions, setAvailableOptions] = useState(allData);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [filteringValue, setFilteringValue] = useState('');

  const getCodesData = (data) => data.map(({ code }) => code);

  const onToggleOption = (value) => () => {
    const isDisplayed = Boolean(displayedOptions.find(({ code }) => code === value));
    const newDisplayedValues = isDisplayed ? getCodesData(displayedOptions.filter(({ code }) => code !== value)) : [...getCodesData(displayedOptions), value];
    const newDisplayedOptionsValues = allData.filter(({ code }) => newDisplayedValues.includes(code));
    const newAvailableOptionsValues = allData.filter(({ code }) => !newDisplayedValues.includes(code));

    onChange({ target: { value: newDisplayedValues, name: type } });
    setDisplayedOptions(newDisplayedOptionsValues);
    setAvailableOptions(newAvailableOptionsValues);
  };


  const onSearch = ({ target: { value } }) => {
    setFilteringValue(value);
    const filteredData = getCodesData(allData.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())));

    const displayedOptionsValues = allData.filter(({ code }) => currentData.includes(code)).filter(({ code }) => filteredData.includes(code));
    const availableOptionsValues = allData.filter(({ code }) => !currentData.includes(code)).filter(({ code }) => filteredData.includes(code));

    displayedOptionsValues && setDisplayedOptions(displayedOptionsValues);
    availableOptionsValues && setAvailableOptions(availableOptionsValues);
  };


  useEffect(() => {
    const displayedOptionsValues = allData.filter(({ code }) => currentData.includes(code));
    const availableOptionsValues = allData.filter(({ code }) => !currentData.includes(code));

    displayedOptionsValues && setDisplayedOptions(displayedOptionsValues);
    availableOptionsValues && setAvailableOptions(availableOptionsValues);
  }, [currentData]);


  return (
    <FlexBox className={className} column>
      <FlexBox className='mb-3 v-center' spaceBetween>
        <Label className='uppercase-text' >{type}: </Label>
        <TextField value={filteringValue} onChange={onSearch} placeholder={`Search for ${type}`} />
      </FlexBox>

      <FlexBox>
        <FlexBox className='displayed-zone-options min-width-250 mr-5 p-2 soft-edges' flex wrappable flexStart >
          {displayedOptions.map(({ code, name }, index) => (
            <OptionItem
              key={`${code}_${index}`}
              onToggle={onToggleOption(code)}
              label={name}
            />
          ))}
        </FlexBox>

        <FlexBox className='available-zone-options min-width-250 p-2 soft-edges' flex wrappable flexStart >
          {availableOptions.map(({ code, name }, index) => (
            <OptionItem
              key={`${code}_${index}`}
              onToggle={onToggleOption(code)}
              label={name}
            />
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};


export default SelectBoxes;
