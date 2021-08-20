import React from 'react';

import common from 'components/common';
import { useContext } from '../../../actions';

const { Tabs, Tab, BackgroundOptions } = common;

const Video = () => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {} } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };


  return (
    <div>
      <Tabs active='styles' className='padding-v-10 padding-h-10'>
        <Tab id='styles' title='styles'>
          <BackgroundOptions onChange={onChange} styles={styles} />
        </Tab>
      </Tabs>
    </div>
  );
};

Text.propTypes = {};

export default Video;
