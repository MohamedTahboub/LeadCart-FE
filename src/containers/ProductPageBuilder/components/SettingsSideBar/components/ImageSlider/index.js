import React from 'react';

import common from 'components/common';
import { ImageSliderSettings, ImageSliderStyles } from './components';

const { Tabs, Tab } = common;

const ImageSlider = () => {

  return (
    <Tabs active='settings' className='padding-v-10 padding-h-10'>
      <Tab id='settings' title='Settings'>
        <ImageSliderSettings/>
      </Tab>

      <Tab id='styles' title='Styles'>
        <ImageSliderStyles/>
      </Tab>
    </Tabs>
  );
};

export default ImageSlider;
