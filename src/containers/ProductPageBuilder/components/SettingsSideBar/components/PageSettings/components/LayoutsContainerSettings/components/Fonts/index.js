import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Select from 'react-select';

import common from 'components/common';
import { useContext } from '../../../../../../../../actions';

import './style.css';

const { FlexBox, Button, InlinePopup } = common;


const Fonts = ({ productsFonts, onChange, productPage, SettingToggleIcons }) => {
  const { actions: { onToggleProductFontsModal } = {} } = useContext();
  const { font: { url, family: fontFamily } = {} } = productPage;

  const fontsOptions = productsFonts.map(({ url, family }) => ({ value: url, label: family }));
  const onSelectFont = ({ label: family, value: url }) => onChange({ name: 'pageStyles.productPage.font', value: { family, url } });


  return (
    <InlinePopup
      title={'Product Font'}
      button={SettingToggleIcons}
      popUpContent={(
        <FlexBox id='custom-font' spaceBetween >
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
          <Button className='light-btn' onClick={onToggleProductFontsModal} style={{ fontFamily }} >Fonts Management</Button>
        </FlexBox>
      )}
    />
  );
};


const mapStateToProps = ({ productsFonts }) => ({ productsFonts });
export default connect(mapStateToProps)(Fonts);

