import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import common from 'components/common';

import './style.css';

const { FlexBox } = common;


const Fonts = ({ productsFonts, onChange }) => {
  const LabelFontOption = ({ family: labelFamily }) =>
    (<span style={{ fontFamily: labelFamily }} >
      {labelFamily}
    </span>);


  const fontsOptions = productsFonts.map(({ url, family } = {}) => ({ value: url, label: <LabelFontOption family={family}/> }));

  const onSelectFont = ({ label: family, value: url }) => {
    const FontName = family?.props?.family;
    onChange({ target: { name: 'pageStyles.productPage.font', value: { family: FontName, url } } });
  };

  return (
    <FlexBox id='custom-font' className='v-center' spaceBetween >
      <Select
        options={fontsOptions}
        onChange={onSelectFont}
        className='flex-1 mr-2'
        closeMenuOnSelect={false}
      />
    </FlexBox>
  );
};


const mapStateToProps = ({ productsFonts }) => ({ productsFonts });
export default connect(mapStateToProps)(Fonts);

