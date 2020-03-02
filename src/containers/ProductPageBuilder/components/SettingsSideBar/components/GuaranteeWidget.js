import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';


import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';
import guaranteeBadge2 from 'assets/images/guaranteeBadges/gur-2.svg';
import guaranteeBadge3 from 'assets/images/guaranteeBadges/gur-3.svg';
import guaranteeBadge4 from 'assets/images/guaranteeBadges/gur-4.png';
import guaranteeBadge5 from 'assets/images/guaranteeBadges/gur-5.jpg';
import guaranteeBadge6 from 'assets/images/guaranteeBadges/gur-6.png';


import { SettingBox, ImageOption } from './common';
import { useContext } from '../../../actions';

const badgesImages = [
  guaranteeBadge1,
  guaranteeBadge2,
  guaranteeBadge3,
  guaranteeBadge4,
  guaranteeBadge5,
  guaranteeBadge6,
];


const {
  Tabs,
  InputRow,
  MiniTwitterPicker,
  FlexBox,
  Tab,
} = common;

const { TextField, SelectOption, AddImage } = InputRow;

const GuaranteeWidget = (props) => {
  const {
    state: {
      modals: {
        sectionSetting = {}
      } = {}
    },
    actions
  } = useContext();

  const {
    styles = {},
    content: {
      value: badgeImage
    } = {},
    // actions: sectionActions = {}
  } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const onBadgeSelect = (image) => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'content.value',
        value: image
      }
    });
  };

  return (
    <div>
      <Tabs active='styles' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='settings' title='Settings'>
          <SettingBox title='Options'>
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
          </SettingBox>
        </Tab>

        <Tab id='styles' title='Styles'>
          <SettingBox title='Size'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Image Height:</span>
              <TextField
                name='styles.height'
                type='number'
                value={styles.height}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Image Width:</span>
              <TextField
                type='number'
                name='styles.width'
                value={styles.width}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </SettingBox>

          <SettingBox title='Paddings'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Padding Top:</span>
              <TextField
                name='styles.paddingTop'
                type='number'
                value={styles.paddingTop}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text '>Padding bottom:</span>
              <TextField
                type='number'
                name='styles.paddingBottom'
                value={styles.paddingBottom}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </SettingBox>
        </Tab>
      </Tabs>
    </div>
  );
};

GuaranteeWidget.propTypes = {

};

export default GuaranteeWidget;
