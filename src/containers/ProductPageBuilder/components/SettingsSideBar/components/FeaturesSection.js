import React, { useEffect, useState } from 'react';
import ids from 'shortid';
import { MdAddCircleOutline } from 'react-icons/md';

import common from 'components/common';
import { useContext } from '../../../actions';
import Toggle from '../../../../../components/common/Inputs/Toggle';
import { ImageOption } from './common';


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
  FlexBox,
  Tab,
  MiniColorPicker,
  BackgroundOptions
} = common;

const { Label, AddImage } = InputRow;

const FeaturesSection = () => {
  const [stash, setStash] = useState({});

  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    content: { list = [] } = {}
  } = sectionSetting;

  const [customBullets, setCustomBullets] = useState(styles.withCustomBullets);

  useEffect(() => {
    setCustomBullets(!!styles.withCustomBullets);
    setStash({ theme: styles.theme, image: styles.customBullet });
    //eslint-disable-next-line
  }, [styles.customBullet, styles.theme]);

  const onChange = ({ target }) => {
    return actions.onSectionSettingChange({
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
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.theme',
        value: theme
      }
    });
    setStash({ ...stash, theme });
  };

  const onImageChange = (image) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.customBullet',
        value: image
      }
    });
    setStash({ ...stash, image });
  };

  const onToggleCustomBullets = () => {
    setCustomBullets(!customBullets);
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.withCustomBullets',
        value: !customBullets
      }
    });
  };

  const onBackgroundChange = ({ target: { name, value } }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: { name, value }
    });
  };

  return (
    <div>
      <Tabs active='settings' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='settings' title='settings'>
          <FlexBox column center='h-center'>
            <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
              <Label>Add more:</Label>
              <FlexBox center='v-center' onClick={onAddNewFeature}>
                <MdAddCircleOutline className='gray-text mx-2 item-clickable' />
                <span>
                  {list.length}
                </span>
              </FlexBox>
            </FlexBox>
            <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
              <Label>Points Color</Label>
              <MiniColorPicker
                name='styles.bulletColor'
                value={styles.bulletColor}
                onChange={onChange}
              />
            </FlexBox>
            <FlexBox>
              <Label className='fit mr-4 d-flex align-center'>Custom bullets</Label>
              <Toggle value={customBullets} onToggle={onToggleCustomBullets} />
            </FlexBox>
            {
              customBullets ? (
                <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
                  <Label>Set custom bullets</Label>
                  <AddImage
                    name='styles.customBullet'
                    value={styles.customBullet}
                    onUploaded={onImageChange}
                  />
                </FlexBox>
              ) : (
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
              )
            }
          </FlexBox>
        </Tab>

        <Tab id='styles' title='Styles'>
          <BackgroundOptions onChange={onBackgroundChange} styles={styles} />
        </Tab>
      </Tabs>
    </div>
  );
};

FeaturesSection.propTypes = {};

export default FeaturesSection;
