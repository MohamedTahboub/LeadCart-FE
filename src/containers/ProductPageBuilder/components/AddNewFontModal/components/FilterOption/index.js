import React from 'react';
import common from 'components/common';
import clx from 'classnames';

const { FlexBox, CustomRadio } = common;

const FilterOption = ({ label, value, isSelectedFilterKey, onFilterFonts }) => {
  const isSelected = isSelectedFilterKey(value);
  return (
    <FlexBox className='v-center item-clickable mr-2' onClick={onFilterFonts(value)} >
      <CustomRadio checked={isSelected} borderColor={isSelected ? '#4da1ff' : 'rgba(0, 0, 0, 0.4)'} />
      <p className={clx('m-0 ml-1', { 'primary-text': isSelected })}>{label}</p>
    </FlexBox>
  );
};

FilterOption.propTypes = {};

export default FilterOption;
