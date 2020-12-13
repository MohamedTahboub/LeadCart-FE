import React from 'react';
import ids from 'shortid';

import common from 'components/common';
import defaultDropImage from 'assets/images/upload-image.png';
import { useContext } from '../../../../actions';
import Settings from './settings';
import Styles from './styles';

import './style.css';

const { Tabs, Tab } = common;


const ImageSliderSettings = () => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();


  const { styles = {}, content = {} } = sectionSetting;
  const { images } = content;

  const onChange = (field) => {
    return actions.onSectionSettingChange({
      section: sectionSetting,
      field
    });
  };

  const onAddNewImage = () => {
    onChange({
      name: 'content.images',
      value: [...images, { src: defaultDropImage, id: ids.generate() }]
    });
  };


  const settingsProps = { onAddNewImage, onChange, content };


  const stylesProps = {};


  return (
    <div className='image-slider-settings'>
      <Tabs active='settings' className='padding-v-10 padding-h-10'>
        <Tab id='settings' title='settings'>
          <Settings {...settingsProps} />
        </Tab>

        <Tab id='styles' title='Styles'>
          <Styles {...stylesProps} />
        </Tab>
      </Tabs>
    </div >
  );
};

export default ImageSliderSettings;
