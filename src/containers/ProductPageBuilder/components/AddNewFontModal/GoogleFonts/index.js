import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import ToolTip from 'react-tooltip';

import common from 'components/common';
import FontRow from './FontRow';

import './style.css';
import { Title } from 'components/common/Titles';

const { Button, FlexBox, InputRow, CustomRadio } = common;
const { TextField } = InputRow;


const FilterOption = ({ label, value, isSelectedFilterKey, onFilterFonts }) => {
  const isSelected = isSelectedFilterKey(value);
  return (
    <FlexBox className='v-center item-clickable mr-2' onClick={onFilterFonts(value)} >
      <CustomRadio checked={isSelected} borderColor={isSelected ? '#4da1ff' : 'rgba(0, 0, 0, 0.4)'} />
      <p className={clx('m-0 ml-1', { 'primary-text': isSelected })}>{label}</p>
    </FlexBox>
  );
};


const GoogleFonts = ({ setHasNewGoogleFonts, onSave }) => {
  const [googleFonts, setGoogleFonts] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [selectedFonts, setSelectedFonts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');


  const onSearchFonts = (e) => setSearchValue(e.target.value);
  const onFilterFonts = (value) => () => setFilterValue(value);
  const hasSelectedFonts = Boolean(selectedFonts.length);

  const filterKeys = [
    { label: 'All', value: 'all' },
    { label: 'Selected', value: 'selected' },
    { label: 'Not Selected', value: 'notSelected' },
    { label: 'Added', value: 'added' }
  ];

  const isSelectedFont = (family) => selectedFonts.find((ele) => ele.family === family);
  const isSelectedFilterKey = (filterKey) => filterValue === filterKey;

  const onSelectFont = ({ family, variant }) => () => {
    const newList = isSelectedFont(family) ? selectedFonts.filter((ele) => ele.family !== family) : [...selectedFonts, { family, variant }];
    setSelectedFonts(newList);
  };


  useEffect(() => {
    setLoading(true);

    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBId9mS0JB2nZlstxeoHiPWNEp7TBPeqRo')
      .then((res) => res.text())
      .then((data) => {
        const shortList = JSON.parse(data).items.slice(10, 25);
        setGoogleFonts(shortList);
        setFilteredFonts(shortList);
      })
      .then(() => setLoading(false));
  }, []);


  useEffect(() => {
    const searchedFonts = googleFonts.filter(({ family }) => family.toLowerCase().includes(searchValue.toLowerCase()));
    let theFilterEndResult = [];

    if (filterValue === 'all')
      theFilterEndResult = searchedFonts;
    else if (filterValue === 'selected')
      theFilterEndResult = searchedFonts.filter(({ family }) => isSelectedFont(family));
    else if (filterValue === 'notSelected')
      theFilterEndResult = searchedFonts.filter(({ family }) => !isSelectedFont(family));
    else
      theFilterEndResult = searchedFonts;

    setFilteredFonts(theFilterEndResult);
  }, [searchValue, filterValue]);


  useEffect(() => setHasNewGoogleFonts(hasSelectedFonts), [hasSelectedFonts]);


  return (
    <FlexBox className='products-google-fonts' column>
      <FlexBox className='products-google-fonts-header v-center' spaceBetween >
        <TextField
          name='productsFontsSearch'
          className='products-google-fonts-header-search'
          onChange={onSearchFonts}
          placeholder='Search For Google Font'
          autoComplete='off'
          value={searchValue}
        />

        <FlexBox className='ml-4'>
          {filterKeys.map((ele) => <FilterOption {...ele} isSelectedFilterKey={isSelectedFilterKey} onFilterFonts={onFilterFonts} />)}
        </FlexBox>
      </FlexBox>

      <FlexBox className='products-google-fonts-content' flex column>
        {
          loading ?
            <FlexBox className='full-width h-center' ><Title>Loading ...</Title></FlexBox>
            :
            filteredFonts.map((ele) => <FontRow isSelectedFont={isSelectedFont} onSelectFont={onSelectFont} {...ele} />)
        }
      </FlexBox>

      <FlexBox
        data-tip="You don't have any font to add"
        data-tip-disable={hasSelectedFonts}
        data-place='left'
        className='full-width mt-4'
        flexEnd
      >
        <Button disabled={!hasSelectedFonts} className='primary-color' onClick={onSave} >
          Save And Apply
        </Button>
      </FlexBox>
      <ToolTip />
    </FlexBox>
  );
};

export default GoogleFonts;
