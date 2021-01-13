import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import ToolTip from 'react-tooltip';
import { connect } from 'react-redux';

import common from 'components/common';
import FontRow from './FontRow';
import { Title } from 'components/common/Titles';
import * as productsFontsActions from '../../../../../actions/productsFonts';

import './style.css';

const { Button, FlexBox, InputRow } = common;
const { TextField } = InputRow;


const GoogleFonts = ({ hasSelectedInstalledCustomFonts, setHasSelectedInstalledCustomFonts, productsFonts = [], deleteProductsFonts }) => {
  const [searchedFonts, setSearchedFonts] = useState(productsFonts);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFonts, setSelectedFonts] = useState([]);

  const onSearchFonts = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    const searchedFonts = productsFonts.filter(({ family }) => family.toLowerCase().includes(searchValue.toLowerCase()));

    setSearchedFonts(searchedFonts);
  };


  const hasSelectedFonts = Boolean(selectedFonts.length);
  const isSelectedFont = (id) => selectedFonts.includes(id);


  const onSelectFont = ({ id }) => () => {
    const newList = isSelectedFont(id) ? selectedFonts.filter((elementId) => elementId !== id) : [...selectedFonts, id];
    setSelectedFonts(newList);
  };


  const onDelete = () => {
    deleteProductsFonts(selectedFonts, {
      onSuccess: () => {
        console.log('deleted successfully');
      },
      onFailed: () => {
        console.log('deleted failed');
      }
    });
  };


  useEffect(() => setHasSelectedInstalledCustomFonts(hasSelectedFonts), [hasSelectedFonts]);


  return (
    <FlexBox className='products-installed-fonts' column>
      <TextField
        name='productsFontsSearch'
        className='products-installed-fonts-header-search'
        onChange={onSearchFonts}
        placeholder='Search For Installed Font'
        autoComplete='off'
        value={searchValue}
      />

      <FlexBox className='products-installed-fonts-content' flex>
        {searchedFonts.map((ele) => <FontRow isSelectedFont={isSelectedFont} onSelectFont={onSelectFont} {...ele} />) }
      </FlexBox>

      <FlexBox
        data-tip="You don't have any selected font to delete"
        data-tip-disable={hasSelectedInstalledCustomFonts}
        data-place='left'
        className='full-width mt-4'
        flexEnd
      >
        <Button disabled={!hasSelectedInstalledCustomFonts} className='danger-btn' onClick={onDelete} >
          Delete
        </Button>
      </FlexBox>
      <ToolTip />
    </FlexBox>
  );
};


const mapStateToProps = ({ productsFonts }) => ({ productsFonts });
export default connect(mapStateToProps, productsFontsActions)(GoogleFonts);
