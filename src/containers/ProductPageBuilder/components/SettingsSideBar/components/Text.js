import React from 'react';
import common from 'components/common';
import { useContext } from '../../../actions';

const {
  Tabs,
  MiniColorPicker,
  FlexBox,
  Tab,
  BackgroundOptions
} = common;


const Text = (props) => {
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
        <Tab id='styles' title='Styles'>
          <BackgroundOptions onChange={onChange} styles={styles} />
          {/* <div className='large-text border-left-text margin-top-20'>Background</div>
          <div className='padding-left-20'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Background Color</span>
              <MiniColorPicker
                name='styles.backgroundColor'
                value={styles.backgroundColor}
                onChange={onChange}
              />
            </FlexBox>
          </div> */}
        </Tab>
      </Tabs>
    </div>
  );
};

Text.propTypes = {};

export default Text;
