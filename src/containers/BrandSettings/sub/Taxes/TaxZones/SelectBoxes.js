import React, { useEffect, useState } from 'react';

import common from 'components/common';
import countriesData from 'data/taxes/countries';

import './style.css';

const { InputRow, FlexBox, Title } = common;
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
  const savedData = isCountriesSelect ? countries : states;
  const allData = isCountriesSelect ? countriesData : states;

  const [allAvailableOptions, setAvailableOptions] = useState(allData);
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [availableSearchedOptions, setAvailableSearchedOptions] = useState([]);
  const [filteringValue, setFilteringValue] = useState('');

  const availableOptions = availableSearchedOptions ? availableSearchedOptions : allAvailableOptions;
  const hasDisplayedOptions = Boolean(displayedOptions.length);
  const hasAvailableOptions = Boolean(availableOptions.length);

  const getCodesData = (data) => data.map(({ code }) => code);
  const getFoundsCodes = (arrOfOptions, arrOfCodes) => arrOfOptions.filter(({ code }) => arrOfCodes.includes(code)) || [];
  const getNotFoundCodes = (arrOfOptions, arrOfCodes) => arrOfOptions.filter(({ code }) => !arrOfCodes.includes(code)) || [];


  const onToggleOption = (value) => () => {
    const isDisplayed = Boolean(displayedOptions.find(({ code }) => code === value));
    const newDisplayedValues = isDisplayed ? getCodesData(displayedOptions.filter(({ code }) => code !== value)) : [...getCodesData(displayedOptions), value];
    const newDisplayedOptionsValues = getFoundsCodes(allData, newDisplayedValues);
    const newAvailableOptionsValues = getNotFoundCodes(allData, newDisplayedValues);

    onChange({ target: { value: newDisplayedValues, name: type } });
    setDisplayedOptions(newDisplayedOptionsValues);
    setAvailableOptions(newAvailableOptionsValues);

    if (availableSearchedOptions)
      setAvailableSearchedOptions(getFoundsCodes(newAvailableOptionsValues, getCodesData(availableSearchedOptions)));
  };

  const onSearch = ({ target: { value } }) => setFilteringValue(value);

  useEffect(() => {
    const filteredData = getCodesData(allData.filter(({ name }) => name.toLowerCase().includes(filteringValue.toLowerCase())));
    const availableOptionsValues = getFoundsCodes(getNotFoundCodes(allData, savedData), filteredData);
    setAvailableSearchedOptions(availableOptionsValues);
  }, [filteringValue]);


  useEffect(() => {
    const displayedOptionsValues = allData.filter(({ code }) => savedData.includes(code));
    const availableOptionsValues = allData.filter(({ code }) => !savedData.includes(code));

    displayedOptionsValues && setDisplayedOptions(displayedOptionsValues);
    availableOptionsValues && setAvailableOptions(availableOptionsValues);
  }, [savedData]);


  return (
    <FlexBox className={className} column>
      <Label className='uppercase-text' >Zone {type}: </Label>

      <FlexBox>
        <FlexBox className='height-220 mr-5 min-width-250' column flex>
          <FlexBox className='min-height-35 mb-2 v-center'>
            <Title>Selected {type}</Title>
          </FlexBox>

          <FlexBox className='displayed-zone-options min-width-250 p-2 soft-edges' wrappable flexStart >
            {displayedOptions.map(({ code, name }, index) => (
              <OptionItem
                key={`${code}_${index}`}
                onToggle={onToggleOption(code)}
                label={name}
              />
            ))}

            {!hasDisplayedOptions &&
              <FlexBox className='h-center' flex>
                <Title>No {type} Selected</Title>
              </FlexBox>
            }
          </FlexBox>
        </FlexBox>

        <FlexBox className='height-220 min-width-250' column flex>
          <FlexBox className='min-height-35 mb-2 v-center' spaceBetween>
            <Title>Available {type}</Title>
            <TextField value={filteringValue} onChange={onSearch} placeholder={`${type} Search`} />
          </FlexBox>

          <FlexBox className='available-zone-options min-width-250 p-2 soft-edges' wrappable flexStart >
            {availableOptions.map(({ code, name }, index) => (
              <OptionItem
                key={`${code}_${index}`}
                onToggle={onToggleOption(code)}
                label={name}
              />
            ))}

            {!hasAvailableOptions &&
              <FlexBox className='h-center' flex>
                <Title>No {type} Available</Title>
              </FlexBox>
            }
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};


export default SelectBoxes;
