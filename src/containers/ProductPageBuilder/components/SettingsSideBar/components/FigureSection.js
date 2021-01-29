import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import { ImageOption } from './common';
import { useContext } from '../../../actions';


const themesOptions = [
  {
    src: 'https://i.imgur.com/huyz81T.png',
    theme: 'right-theme'
  },
  {
    src: 'https://i.imgur.com/tGdowpz.png',
    theme: 'left-theme'
  }
];


const { Tabs, FlexBox, Tab, BackgroundOptions } = common;


const FigureSection = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {} } = sectionSetting;

  const onThemeChange = (theme) => () => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.theme',
        value: theme
      }
    });
  };


  const onBackgroundChange = ({ target: { name, value } }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name,
        value
      }
    });
  };

  return (
    <div>
      <Tabs active='themes' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='themes' title='Themes'>
          <FlexBox column>
            {themesOptions.map((theme) => (
              <ImageOption
                className='figure-theme-demo'
                value={theme.src}
                key={theme.theme}
                onClick={onThemeChange(theme.theme)}
                active={styles.theme === theme.theme}
              />
            ))}
          </FlexBox>
        </Tab>

        <Tab id='styles' title='Styles'>
          <BackgroundOptions onChange={onBackgroundChange} styles={styles} />
        </Tab>
      </Tabs>
    </div>
  );
};

FigureSection.propTypes = {};

export default FigureSection;
