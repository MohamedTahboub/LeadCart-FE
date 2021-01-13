import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import ToolTip from 'react-tooltip';
import ids from 'shortid';
import { connect } from 'react-redux';


import common from 'components/common';
import FontRow from './FontRow';
import * as productsFontsActions from '../../../../../actions/productsFonts';


import './style.css';
import { passProps } from 'helpers/common';

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


const InstalledFonts = ({ productsFonts = [], selectedInstalledFonts, setSelectedInstalledFonts, setHasNewFonts, onDelete }) => {
  const [filteredFonts, setFilteredFonts] = useState(productsFonts);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  const onSearchFonts = (e) => setSearchValue(e.target.value);
  const onFilterFonts = (value) => () => setFilterValue(value);
  const hasSelectedFonts = Boolean(selectedInstalledFonts.length);

  const filterKeys = [
    { label: 'All', value: 'all' },
    { label: 'Selected', value: 'selected' },
    { label: 'Not Selected', value: 'notSelected' }
  ];

  const isSelectedFont = (id) => selectedInstalledFonts.includes(id);
  const isSelectedFilterKey = (filterKey) => filterValue === filterKey;

  const onSelectFont = ({ id }) => () => {
    const newList = isSelectedFont(id) ? selectedInstalledFonts.filter((elementId) => elementId !== id) : [...selectedInstalledFonts, id];
    setSelectedInstalledFonts(newList);
  };


  useEffect(() => {
    const searchedFonts = productsFonts.filter(({ family }) => family.toLowerCase().includes(searchValue.toLowerCase()));
    let theFilterEndResult = [];

    if (filterValue === 'all')
      theFilterEndResult = searchedFonts;
    else if (filterValue === 'selected')
      theFilterEndResult = searchedFonts.filter(({ id }) => isSelectedFont(id));
    else if (filterValue === 'notSelected')
      theFilterEndResult = searchedFonts.filter(({ id }) => !isSelectedFont(id));
    else
      theFilterEndResult = searchedFonts;

    setFilteredFonts(theFilterEndResult);
  }, [searchValue, filterValue]);


  useEffect(() => setHasNewFonts(hasSelectedFonts), [hasSelectedFonts]);


  return (
    <FlexBox className='products-installed-fonts' column>
      <FlexBox className='products-installed-fonts-header v-center' spaceBetween >
        <TextField
          name='productsFontsSearch'
          className='products-installed-fonts-header-search'
          onChange={onSearchFonts}
          placeholder='Search For Installed Font'
          autoComplete='off'
          value={searchValue}
        />

        <FlexBox className='ml-4'>
          {filterKeys.map((ele) => <FilterOption {...ele} isSelectedFilterKey={isSelectedFilterKey} onFilterFonts={onFilterFonts} />)}
        </FlexBox>
      </FlexBox>

      <FlexBox className='products-installed-fonts-content' flex column>
        {filteredFonts.map((ele) => <FontRow isSelectedFont={isSelectedFont} onSelectFont={onSelectFont} {...ele} />)}
      </FlexBox>

      <FlexBox
        data-tip="You don't have any font to add"
        data-tip-disable={hasSelectedFonts}
        data-place='left'
        className='full-width mt-4'
        flexEnd
      >
        <Button disabled={!hasSelectedFonts} className='danger-btn' onClick={onDelete} >
          Delete
        </Button>
      </FlexBox>
      <ToolTip />
    </FlexBox>
  );
};

export default connect(passProps('productsFonts'), productsFontsActions)(InstalledFonts);
