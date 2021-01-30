import React, { useEffect, useState } from 'react';
import ToolTip from 'react-tooltip';
import { connect } from 'react-redux';

import common from 'components/common';
import FontRow from './FontRow';
import * as productsFontsActions from '../../../../../actions/productsFonts';
import { passProps } from 'helpers/common';

import './style.css';
import { FilterOption } from '../components';

const { Button, FlexBox, InputRow } = common;
const { TextField } = InputRow;


const InstalledFonts = ({ productsFonts = [], selectedInstalledFonts, setSelectedInstalledFonts, setHasNewFonts, onDelete, onCloseModal, deleteLoading }) => {
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

  const onSelectFont = ({ _id }) => () => {
    const newList = isSelectedFont(_id) ? selectedInstalledFonts.filter((elementId) => elementId !== _id) : [...selectedInstalledFonts, _id];
    setSelectedInstalledFonts(newList);
  };


  useEffect(() => {
    const searchedFonts = productsFonts.filter(({ family }) => family.toLowerCase().includes(searchValue.toLowerCase()));
    let theFilterEndResult = [];

    if (filterValue === 'all')
      theFilterEndResult = searchedFonts;
    else if (filterValue === 'selected')
      theFilterEndResult = searchedFonts.filter(({ _id }) => isSelectedFont(_id));
    else if (filterValue === 'notSelected')
      theFilterEndResult = searchedFonts.filter(({ _id }) => !isSelectedFont(_id));
    else
      theFilterEndResult = searchedFonts;

    setFilteredFonts(theFilterEndResult);
  }, [searchValue, filterValue]);


  useEffect(() => {setHasNewFonts(hasSelectedFonts);}, [hasSelectedFonts]);


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
          {filterKeys.map((ele) => (
            <FilterOption
              {...ele}
              isSelectedFilterKey={isSelectedFilterKey}
              onFilterFonts={onFilterFonts}
            />))}
        </FlexBox>

      </FlexBox>

      <FlexBox className='products-installed-fonts-content' flex column>
        {filteredFonts.map((ele) => (
          <FontRow
            isSelectedFont={isSelectedFont}
            onSelectFont={onSelectFont}
            {...ele}
          />))}
      </FlexBox>

      <FlexBox
        data-tip="You don't have any font to delete"
        data-tip-disable={hasSelectedFonts}
        data-place='left'
        className='full-width mt-4'
        flexEnd
      >
        <Button disabled={!hasSelectedFonts} className='danger-btn' onClick={onDelete} onprogress={deleteLoading} >
          Remove Selected
        </Button>
      </FlexBox>

      <ToolTip />
    </FlexBox>
  );
};

export default connect(passProps('productsFonts'), productsFontsActions)(InstalledFonts);
