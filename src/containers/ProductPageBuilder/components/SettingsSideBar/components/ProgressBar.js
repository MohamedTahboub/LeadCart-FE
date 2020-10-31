import React from 'react';
import common from 'components/common';
import progressAnimatedRect from 'assets/images/gifs/animated-progressbar-rect.gif';
import progressAnimated from 'assets/images/gifs/animated-progressbar.gif';
import { useContext } from '../../../actions';

import {
  ImageOption,
  SettingBox
} from './common';


const {
  Tabs,
  InputRow,
  MiniColorPicker,
  FlexBox,
  Tab
} = common;

const { TextField } = InputRow;


const themesOptions = [
  {
    theme: 'default',
    src: 'https://i.imgur.com/DsJ9H0o.png'
  },
  {
    theme: 'striped',
    src: 'https://i.imgur.com/p5mKqsm.png'
  },
  {
    theme: 'striped animated',
    src: progressAnimated
  },
  {
    theme: 'rectangle',
    src: 'https://i.imgur.com/or6mMuy.png'
  },
  {
    theme: 'rectangle striped',
    src: 'https://i.imgur.com/8flEJcl.png'
  },
  {
    theme: 'rectangle striped animated',
    src: progressAnimatedRect
  }
];

const ProgressBar = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {}, content = {} } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };
  const onThemeChange = ({ theme }) => (src) => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.theme',
        value: theme
      }
    });
  };

  return (
    <div>
      <Tabs active='themes' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='themes' title='Themes'>
          {themesOptions.map((theme) => (
            <ImageOption
              className='guarantee-theme-demo'
              value={theme.src}
              key={theme.theme}
              onClick={onThemeChange(theme)}
              active={styles.theme === theme.theme}
            />
          ))}
        </Tab>
        <Tab id='settings' title='Settings'>
          <FlexBox center='v-center margin-v-5' spaceBetween>
            <span className='gray-text'>Progress Value:</span>
            <TextField
              type='number'
              name='content.value'
              min={0}
              max={100}
              value={content.value}
              onChange={onChange}
              className='width-70'
            />
          </FlexBox>
          <SettingBox title='Colors'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Bar Color:</span>
              <MiniColorPicker
                name='styles.barColor'
                value={styles.barColor}
                onChange={onChange}
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Text Color:</span>
              <MiniColorPicker
                name='styles.textColor'
                value={styles.textColor}
                onChange={onChange}
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Bar Border Color:</span>
              <MiniColorPicker
                name='styles.borderColor'
                value={styles.borderColor}
                onChange={onChange}
              />
            </FlexBox>

          </SettingBox>
        </Tab>
      </Tabs>
    </div>
  );
};

ProgressBar.propTypes = {};

export default ProgressBar;
