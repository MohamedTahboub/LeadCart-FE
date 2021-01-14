import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Select from 'react-select';

import common from 'components/common';
import { useContext } from '../../../../../../../../actions';

import './style.css';

const { FlexBox, InlinePopup, Tooltip } = common;


const Fonts = ({ productsFonts, onChange, productPage, SettingToggleIcons }) => {
  const { actions: { onToggleProductFontsModal } = {} } = useContext();
  const { font: { url, family: fontFamily } = {} } = productPage;

  const LabelFontOption = ({ family }) => {
    return (
      <span style={{ fontFamily }} name={family} > {family} </span>
    );
  };

  const fontsOptions = productsFonts.map(({ url, family } = {}) => ({ value: url, label: <LabelFontOption family={family} /> }));
  const onSelectFont = ({ label: family, value: url }) => {
    const FontName = family?.props?.family;
    onChange({ name: 'pageStyles.productPage.font', value: { family: FontName, url } });
  };


  return (
    <InlinePopup
      title={'Page Font Family'}
      button={SettingToggleIcons}
      popUpContent={(
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

          <Tooltip text='Add New Font' placement='top'>
            <AiOutlinePlusCircle className='item-clickable' onClick={onToggleProductFontsModal} size={20} />
          </Tooltip>
        </FlexBox>
      )}
    />
  );
};


const mapStateToProps = ({ productsFonts }) => ({ productsFonts });
export default connect(mapStateToProps)(Fonts);

