import React, { useEffect, useState } from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';
import { useContext } from '../../actions';
import FontRow from './FontRow';

import './style.css';
import { Title } from 'components/common/Titles';

const { Button, Tabs, Tab, FlexBox, InputRow, CustomCheckbox } = common;
const { TextField } = InputRow;

const AddNewFontModal = () => {
  const [googleFonts, setGoogleFonts] = useState([]);
  const [filteredFonts, setFilteredFonts] = useState([]);
  const [selectedFonts, setSelectedFonts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');


  const isSelectedFont = (family) => selectedFonts.find((ele) => ele.family === family);
  const isSelectedFilterKey = (filterKey) => filterValue === filterKey;

  const {
    state: { addNewFont: isAddNewFontOpened } = {},
    actions: { onToggleAddNewFontModal } = {}
  } = useContext();


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


  const onSelectFont = ({ family, variant }) => () => {
    const newList = isSelectedFont(family) ? selectedFonts.filter((ele) => ele.family !== family) : [...selectedFonts, { family, variant }];
    setSelectedFonts(newList);
  };


  const onSearchFonts = (e) => setSearchValue(e.target.value);
  const onFilterFonts = (value) => () => setFilterValue(value);


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


  return (
    <Modal className='pt-3 products-fonts-modal-container' isVisible onClose={() => onToggleAddNewFontModal()}>
      <Tabs active='googleFonts'>
        <Tab id='googleFonts' title='Google Fonts'>

          <FlexBox className='products-google-fonts' column>

            <FlexBox className='products-google-fonts-header' >
              <TextField
                name='productsFontsSearch'
                className='products-google-fonts-header-search'
                onChange={onSearchFonts}
                placeholder='Search For Google Font'
                autoComplete='off'
                value={searchValue}
              />

              <FlexBox className='mx-4' >
                <FlexBox className='v-center item-clickable mr-2' onClick={onFilterFonts('all')} >
                  <CustomCheckbox style={{ paddingLeft: '19px' }} active={isSelectedFilterKey('all')} />
                  <p className='m-0 ml-1' >All</p>
                </FlexBox>

                <FlexBox className='v-center item-clickable mr-2' onClick={onFilterFonts('selected')} >
                  <CustomCheckbox style={{ paddingLeft: '19px' }} active={isSelectedFilterKey('selected')} />
                  <p className='m-0 ml-1' >Selected</p>
                </FlexBox>

                <FlexBox className='v-center item-clickable mr-2' onClick={onFilterFonts('notSelected')} >
                  <CustomCheckbox style={{ paddingLeft: '19px' }} active={isSelectedFilterKey('notSelected')} />
                  <p className='m-0 ml-1' >Not Selected</p>
                </FlexBox>

                <FlexBox className='v-center item-clickable mr-2' onClick={onFilterFonts('added')} >
                  <CustomCheckbox style={{ paddingLeft: '19px' }} active={isSelectedFilterKey('added')} />
                  <p className='m-0 ml-1' >Added</p>
                </FlexBox>
              </FlexBox>

              <Button className='light-btn products-google-fonts-header-btn' >Save And Apply</Button>
            </FlexBox>


            <FlexBox className='products-google-fonts-content' column>
              {loading ?
                <FlexBox><Title>Loading ...</Title></FlexBox>
                :
                filteredFonts.map((ele) => <FontRow isSelectedFont={isSelectedFont} onSelectFont={onSelectFont} {...ele} />)
              }
            </FlexBox>
          </FlexBox>
        </Tab>


        <Tab id='customFont' title='Custom Font' >
          <FlexBox className='products-custom-fonts' >

          Custom
          </FlexBox>
        </Tab>
      </Tabs>
    </Modal>
  );
};

export default AddNewFontModal;
