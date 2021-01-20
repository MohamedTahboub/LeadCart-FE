import React, { useEffect, useState } from 'react';
import ToolTip from 'react-tooltip';
import ids from 'shortid';

import common from 'components/common';
import { useGoogleFonts } from 'libs/hooks';
import FontRow from './FontRow';
import { FilterOption } from '../components';
import './style.css';

const { Button, FlexBox, InputRow, Title } = common;
const { TextField } = InputRow;

const constructFontUrl = ({ variant, family = '' }) => {
  const urlBase = 'https://fonts.googleapis.com/css?family=';
  const familyName = family.replace(/ /g, '+');
  const variantName = `:${variant}`;
  const subset = '&subset=latin';
  const url = `${urlBase}${familyName}${variantName}${subset}`;
  return url;
};

const GoogleFonts = ({ setHasNewFonts, onSave, selectedNewFonts, setSelectedNewFonts, onCloseModal, saveLoading }) => {
  const [googleFonts, onSearch, { isLoading, searchKey }] = useGoogleFonts();

  const [filteredFonts, setFilteredFonts] = useState([]);
  const [filterValue, setFilterValue] = useState('all');


  const onSearchFonts = (e) => onSearch && onSearch(e.target?.value);
  const onFilterFonts = (value) => () => setFilterValue(value);
  const hasSelectedFonts = Boolean(googleFonts.length);

  const filterKeys = [
    { label: 'All', value: 'all' },
    { label: 'Selected', value: 'selected' },
    { label: 'Not Selected', value: 'notSelected' }
  ];

  const isSelectedFont = (family) => selectedNewFonts.find((ele) => ele.family === family);
  const isSelectedFilterKey = (filterKey) => filterValue === filterKey;

  const onSelectFont = ({ family, variant }) => () => {
    const fontUrl = constructFontUrl({ variant, family });
    const newFont = { family, variant, url: fontUrl, type: 'googleFont', id: ids.generate() };

    const newList = isSelectedFont(family) ?
      selectedNewFonts.filter((ele) => ele.family !== family)
      :
      [...selectedNewFonts, newFont];

    setSelectedNewFonts(newList);
  };


  useEffect(() => {
    let theFilterEndResult = [];
    if (filterValue === 'all')
      theFilterEndResult = googleFonts;
    else if (filterValue === 'selected')
      theFilterEndResult = googleFonts.filter(({ family }) => isSelectedFont(family));
    else if (filterValue === 'notSelected')
      theFilterEndResult = googleFonts.filter(({ family }) => !isSelectedFont(family));
    else
      theFilterEndResult = googleFonts;

    setFilteredFonts(theFilterEndResult);
    return () => setFilteredFonts([]);
  }, [googleFonts, filterValue]);


  useEffect(() => {
    setHasNewFonts(hasSelectedFonts);
    return () => setHasNewFonts([]);
  }, [hasSelectedFonts]);

  return (
    <FlexBox className='products-google-fonts' column>
      <FlexBox className='products-google-fonts-header v-center' spaceBetween >
        <TextField
          name='productsFontsSearch'
          className='products-google-fonts-header-search'
          onChange={onSearchFonts}
          placeholder='Search For Google Font'
          autoComplete='off'
          value={searchKey}
        />

        <FlexBox className='ml-4'>
          {filterKeys.map((ele) => <FilterOption {...ele} isSelectedFilterKey={isSelectedFilterKey} onFilterFonts={onFilterFonts} />)}
        </FlexBox>
      </FlexBox>

      <FlexBox className='products-google-fonts-content' flex>
        {
          isLoading ?
            <FlexBox className='full-width' center='h-center'><Title>Loading ...</Title></FlexBox>
            :
            filteredFonts.map((ele) => <FontRow isSelectedFont={isSelectedFont} onSelectFont={onSelectFont} {...ele} />)
        }
      </FlexBox>

      <FlexBox className='full-width mt-4' spaceBetween >
        <Button className='light-btn' onClick={onCloseModal} >
          Close
        </Button>

        <FlexBox data-tip="You don't have any font to add" data-tip-disable={hasSelectedFonts} data-place='left' >
          <Button disabled={!hasSelectedFonts || saveLoading} onprogress={saveLoading} className='primary-color' onClick={onSave} >
            Install Selected
          </Button>
        </FlexBox>
      </FlexBox>

      <ToolTip />
    </FlexBox>
  );
};

export default GoogleFonts
;
