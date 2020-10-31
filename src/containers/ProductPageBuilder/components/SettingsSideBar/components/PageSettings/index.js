import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../actions';

import {
  LayoutsContainerSettings,
  LayoutsSettings,
  PageSettings
} from './components';

const { Tabs, Tab } = common;

const PageLayoutSettings = () => {

  const {
    state: { product = {} },
    actions: {
      onProductFieldChange,
      onToggleProductBackgroundModal
    } = {}
  } = useContext();

  const { pageStyles = {} } = product;

  const onChange = ({ target }) => {
    console.log(target);
    onProductFieldChange(target);
  };


  const pageSettingsProps = {
    pageStyles,
    onChange,
    onToggleProductBackgroundModal
  };

  return (
    <Tabs active='pageSettings' className='p-2 flex' tabsContentClassName='scrolling-70vh flex'>
      <Tab id='pageSettings' title='Page' >
        <PageSettings {...pageSettingsProps} />
      </Tab>
      <Tab id='layoutContainer' title='Layouts Container' >
        <LayoutsContainerSettings {...pageSettingsProps} />
      </Tab>
      <Tab id='layouts' title='Layouts' >
        <LayoutsSettings {...pageSettingsProps} />
      </Tab>
    </Tabs>
  );
};
PageLayoutSettings.propTypes = {};


export default PageLayoutSettings;
