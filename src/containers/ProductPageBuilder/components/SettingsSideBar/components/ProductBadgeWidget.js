
import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import bookMarkImage1 from 'assets/images/icons/bookmark.svg';
import bookMarkImage2 from 'assets/images/icons/bookmark-2.svg';


import { ImageOption, SettingBox } from './common';
import { useContext } from '../../../actions';

const badgesImages = [
  bookMarkImage1,
  bookMarkImage2
];


const {
  Tabs,
  InputRow,
  MiniColorPicker,
  FlexBox,
  Tab
} = common;

const {
  TextField,
  SelectOption
} = InputRow;

const ProductBadgeWidget = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    content = {}
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
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Badge Position:</span>
              <SelectOption
                value={content.position}
                name='content.position'
                onChange={onChange}
                className='bump-offer-style-dropdown'
                options={[
                  { label: 'Absolute Top', value: 'absolute-top' },
                  { label: 'As Normal Section', value: 'section' },
                  { label: 'Absolute Bottom', value: 'absolute-bottom' }
                ]}
              />
            </FlexBox>

          </SettingBox>
          <SettingBox title='Options'>
            <FlexBox column>
              {badgesImages.map((badge) => (
                <ImageOption
                  value={badge}
                  key={badge}
                  onClick={onBadgeSelect}
                  active={content.badgeImage}
                />
              ))}
            </FlexBox>
          </SettingBox>
        </Tab>

        <Tab id='styles' title='Styles'>
          <SettingBox title='Colors'>

            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Badge Color:</span>
              <MiniColorPicker
                name='styles.badgeColor'
                value={styles.badgeColor}
                onChange={onChange}
              />
            </FlexBox>
          </SettingBox>
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

          <SettingBox title='Margins'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Margin Top:</span>
              <TextField
                name='styles.marginTop'
                type='number'
                value={styles.marginTop}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text '>Margin Bottom:</span>
              <TextField
                type='number'
                name='styles.marginBottom'
                value={styles.marginBottom}
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

ProductBadgeWidget.propTypes = {};

export default ProductBadgeWidget;
