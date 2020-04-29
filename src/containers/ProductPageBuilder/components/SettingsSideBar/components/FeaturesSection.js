import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ids from 'shortid';
import { useContext } from '../../../actions';

import {
  ImageOption,
  SettingBox
} from './common';


const featuresThemesImages = [
  {
    src: 'https://i.imgur.com/Ho0kXdp.png',
    theme: 'orderedCircles'
  },
  {
    src: 'https://i.imgur.com/04bOvK1.png',
    theme: 'unorderedCircles'
  },
  {
    src: 'https://i.imgur.com/z1dPx7V.png',
    theme: 'unorderedCheckMarkCircles'
  },
  {
    src: 'https://i.imgur.com/y3R35BA.png',
    theme: 'orderedRectangles'
  },
  {
    src: 'https://i.imgur.com/Mgn7TuW.png',
    theme: 'unorderedRectangles'
  },
  {
    src: 'https://i.imgur.com/wrZDZ0s.png',
    theme: 'unorderedCheckMarkRectangles'
  }
];


const emptyFeature = { text: 'Feature Content' };
const {
  Tabs,
  InputRow,
  Button,
  FlexBox,
  Tab,
  MiniTwitterPicker

} = common;

const { TextField } = InputRow;

const FeaturesSection = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    content: { list = [] } = {}
  } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const onAddNewFeature = () => {
    if (list.length <= 10) {
      list.id = ids.generate();
      actions.onSectionSettingChange({
        section: sectionSetting,
        field: {
          name: 'content.list',
          value: [...list, emptyFeature]
        }
      });
    }
  };

  const onThemeChange = (theme) => () => () => {
    onChange({
      target: {
        name: 'styles.theme',
        value: theme
      }
    });
  };

  return (
    <div>
      <Tabs active='settings' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='settings' title='settings'>
          <FlexBox column center='h-center'>
            <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
              <span className='gray-text'>Points Color</span>
              <MiniTwitterPicker
                name='styles.bulletColor'
                value={styles.bulletColor}
                onChange={onChange}
              />
            </FlexBox>
            <FlexBox column center='h-center'>
              {featuresThemesImages.map(({ src, theme }) => (
                <ImageOption
                  className='feature-theme-demo'
                  value={src}
                  key={theme}
                  onClick={onThemeChange(theme)}
                  active={theme === styles.theme}
                />
              ))}
            </FlexBox>
          </FlexBox>
        </Tab>
      </Tabs>
    </div>
  );
};

FeaturesSection.propTypes = {};

export default FeaturesSection;
