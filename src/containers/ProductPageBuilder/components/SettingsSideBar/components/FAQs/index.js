import React from 'react';
import ids from 'shortid';

import common from 'components/common';
import { useContext } from '../../../../actions';
import Settings from './settings';
import Styles from './styles';

import './style.css';

const { Tabs, Tab } = common;
const newItem = { content: 'FAQ Text', title: 'FAQ Title' };


const FaqSettings = () => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {}, content: { list = [] } = {} } = sectionSetting;

  const onChange = (field) => {
    return actions.onSectionSettingChange({
      section: sectionSetting,
      field
    });
  };

  const onAddNewItem = () => {
    onChange({
      name: 'content.list',
      value: [...list, { ...newItem, id: ids.generate() }]
    });
  };

  const onColorChange = ({ target }) => {
    onChange(target);
  };


  const onBackgroundChange = ({ target }) => onChange(target);

  const settingsProps = {
    onChange,
    onAddNewItem,
    onColorChange,
    list,
    styles
  };


  const stylesProps = {
    onChange,
    onAddNewItem,
    onColorChange,
    list,
    styles,
    onBackgroundChange
  };


  return (
    <div className='faqs'>
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

export default FaqSettings;
