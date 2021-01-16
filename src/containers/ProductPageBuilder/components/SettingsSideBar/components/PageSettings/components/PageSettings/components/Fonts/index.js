import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Select from 'react-select';

import common from 'components/common';

import './style.css';

const { FlexBox } = common;


const Fonts = ({ productsFonts, onChange, productPage }) => {
  const { font: { url, family: fontFamily } = {} } = productPage;

  const LabelFontOption = ({ family }) => {
    return (
      <span style={{ fontFamily }} name={family} > {family} </span>
    );
  };

  const fontsOptions = productsFonts.map(({ url, family } = {}) => ({ value: url, label: <LabelFontOption family={family} /> }));


  const onSelectFont = ({ label: family, value: url }) => {
    const FontName = family?.props?.family;
    onChange({ target: { name: 'pageStyles.productPage.font', value: { family: FontName, url } } });
  };


  return (
    <FlexBox id='custom-font' className='v-center' spaceBetween >
      <Helmet>
        <meta charSet='utf-8' />
        <link rel='stylesheet' href={url} />
      </Helmet>

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

