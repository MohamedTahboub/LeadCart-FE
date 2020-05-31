import React from 'react';
import common from 'components/common';


import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';
import guaranteeBadge2 from 'assets/images/guaranteeBadges/gur-2.svg';
import guaranteeBadge3 from 'assets/images/guaranteeBadges/gur-3.svg';
import guaranteeBadge4 from 'assets/images/guaranteeBadges/gur-4.png';
import guaranteeBadge5 from 'assets/images/guaranteeBadges/gur-5.jpg';
import guaranteeBadge6 from 'assets/images/guaranteeBadges/gur-6.png';


import { ImageOption } from './common';
import { useContext } from '../../../actions';

const badgesImages = [
  guaranteeBadge1,
  guaranteeBadge2,
  guaranteeBadge3,
  guaranteeBadge4,
  guaranteeBadge5,
  guaranteeBadge6
];
const themesOptions = [
  {
    src: 'https://i.imgur.com/RypH2Aw.png',
    theme: 'left-theme',
    badge: guaranteeBadge5
  },
  {
    src: 'https://i.imgur.com/v0HFpo7.png',
    theme: 'right-theme',
    badge: guaranteeBadge2
  },
  {
    src: 'https://i.imgur.com/ZQdvWU8.png',
    theme: 'center-theme',
    badge: guaranteeBadge3
  }
];


const {
  Tabs,
  FlexBox,
  Tab
} = common;


const GuaranteeWidget = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    content: { value: badgeImage } = {}
    // actions: sectionActions = {}
  } = sectionSetting;

  const onChange = (field) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field
    });
  };

  const onBadgeSelect = (image) => () => {
    onChange({
      name: 'content.badge',
      value: image
    });
  };
  const onThemeChange = ({ theme, badge }) => (src) => () => {
    onChange({
      name: 'styles.theme',
      value: theme
    });
  };


  return (
    <div>
      <Tabs active='themes' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='themes' title='Themes'>
          <FlexBox column>
            {themesOptions.map((theme) => (
              <ImageOption
                className='guarantee-theme-demo'
                value={theme.src}
                key={theme.theme}
                onClick={onThemeChange(theme)}
                active={styles.theme === theme.theme}
              />
            ))}
          </FlexBox>
        </Tab>
        <Tab id='guaranteeBadges' title='Guarantee Badges'>
          <FlexBox column>
            {badgesImages.map((badge) => (
              <ImageOption
                value={badge}
                key={badge}
                onClick={onBadgeSelect}
                active={badgeImage}
              />
            ))}
          </FlexBox>
        </Tab>
      </Tabs>
    </div>
  );
};

GuaranteeWidget.propTypes = {};

export default GuaranteeWidget;
