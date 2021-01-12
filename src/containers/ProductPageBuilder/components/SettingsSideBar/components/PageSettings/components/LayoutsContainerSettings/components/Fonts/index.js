import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Helmet } from 'react-helmet';

import common from 'components/common';
import { useContext } from '../../../../../../../../actions';


import './style.css';

const { FlexBox, Button } = common;


const Fonts = ({ fonts = [], onChange }) => {
  const [isFontReady, setFontReady] = useState(false);
  const { actions: { onToggleProductFontsModal } = {} } = useContext();
  const fontsOptions = fonts.map(({ url, family }) => ({ value: url, label: family }));


  const CURRENT_FONT_STYLESHEET = 'https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap';
  const fontFamily = 'East Sea Dokdo';
  // const CURRENT_FONT_STYLESHEET = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;0,700;1,100;1,300;1,900&display=swap';
  // const fontFamily = 'Poppins';


  const onSelectFont = (data) => {
    onChange({ name: 'productPage.fontFamily', value: data });
  };


  return (
    <FlexBox id='custom-font' column spaceBetween >
      <Helmet>
        <meta charSet='utf-8' />
        <link
          rel='stylesheet'
          href={CURRENT_FONT_STYLESHEET}
          onLoad={console.log}
        />
      </Helmet>

      <Select
        options={fontsOptions}
        onChange={onSelectFont}
        className='min-width-200 mb-2'
      />

      <Button className='light-btn' onClick={onToggleProductFontsModal} style={{ fontFamily }} >Q W E R T Y U I O P A S D F G H J K L Z X C V B N M</Button>
    </FlexBox>
  );
};

export default Fonts;
