import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import moment from 'moment';

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

const { TextField, SelectOption, DatePicker } = InputRow;

const CountDowTimerWidget = (props) => {
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
    content = {},
    // actions: sectionActions = {}
  } = sectionSetting;

  const { value: timerValue } = content;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  // const onBadgeSelect = (image) => () => {
  //   actions.onSectionSettingChange({
  //     section: sectionSetting,
  //     field: {
  //       name: 'content.value',
  //       value: image
  //     }
  //   });
  // };

  const onTimerValueChange = ({ target: { value, name } }) => {
    onChange({
      target: {
        name: 'content.value',
        value: { ...timerValue, [name]: value }
      }
    });
  };

  const onFixedTimeChange = (date) => {
    onChange({
      target: {
        name: 'content.value',
        value: { ...timerValue, date }
      }
    });
  };

  return (
    <div>
      <Tabs active='settings' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='settings' title='Settings'>
          <SettingBox title='Setup'>
            <FlexBox column center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Timer Clock Type:</span>
              <SelectOption
                value={content.valueType}
                name='content.valueType'
                onChange={onChange}
                className='bump-offer-style-dropdown'
                options={[
                  { label: 'Exact Date/Time', value: 'fixedTime' },
                  { label: 'Time For Each Session', value: 'sessionTime' },
                ]}
              />
            </FlexBox>
          </SettingBox>
          {content.valueType === 'fixedTime' ? (
            <SettingBox title='Fixed Session Timer Values'>
              <FlexBox center='v-center margin-v-5' spaceBetween>
                <span className='gray-text'>Date:</span>
                <DatePicker
                  name='content.date'
                  type='date'
                  disabledDate={(date) => date < (Date.now() - (24 * 60 * 60 * 1000))}
                  placeholder='Timer End Date'
                  defaultValue={moment(content.date)}
                  className='margin-left-30'
                  onChange={onFixedTimeChange}
                />
              </FlexBox>
            </SettingBox>
          ) : (
            <SettingBox title='Fixed Date Timer Values'>
              <FlexBox center='v-center margin-v-5' spaceBetween>
                <span className='gray-text'>Days:</span>
                <TextField
                  name='days'
                  type='number'
                  value={timerValue.days}
                  onChange={onTimerValueChange}
                  className='width-70'
                />
              </FlexBox>
              <FlexBox center='v-center margin-v-5' spaceBetween>
                <span className='gray-text'>Hours:</span>
                <TextField
                  type='number'
                  name='hours'
                  value={timerValue.hours}
                  onChange={onTimerValueChange}
                  className='width-70'
                />
              </FlexBox>
              <FlexBox center='v-center margin-v-5' spaceBetween>
                <span className='gray-text'>Seconds:</span>
                <TextField
                  type='number'
                  name='minutes'
                  value={timerValue.minutes}
                  onChange={onTimerValueChange}
                  className='width-70'
                />
              </FlexBox>
            </SettingBox>
          )}
        </Tab>

        <Tab id='themes' title='Themes'>
          CountDown Themes
        </Tab>
        <Tab id='styles' title='Styles'>
          <SettingBox title='Margin'>
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
              <span className='gray-text'>Margin Bottom:</span>
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

CountDowTimerWidget.propTypes = {

};

export default CountDowTimerWidget;
