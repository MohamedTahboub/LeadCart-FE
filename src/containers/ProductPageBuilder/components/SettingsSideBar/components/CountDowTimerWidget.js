import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import moment from 'moment';


import { ImageOption, SettingBox } from './common';
import { useContext } from '../../../actions';

const {
  Tabs,
  InputRow,
  MiniTwitterPicker,
  FlexBox,
  Tab
} = common;

const themesOptions = [
  {
    theme: 'formal-rectangle',
    src: 'https://i.imgur.com/gwXUspZ.png'
  },
  {
    theme: 'digital-rectangle',
    src: 'https://i.imgur.com/KgdDBYk.png'
  },
  {
    theme: 'formal-circle',
    src: 'https://i.imgur.com/qw2kuTT.png'
  },
  {
    theme: 'digital-circle',
    src: 'https://i.imgur.com/8cPU4ku.png'
  }
];
const { TextField, SelectOption, DatePicker } = InputRow;

const CountDowTimerWidget = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    content = {}
    // actions: sectionActions = {}
  } = sectionSetting;

  const { value: timerValue } = content;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const onTimerValueChange = ({ target: { value, name } }) => {
    onChange({
      target: {
        name: 'content.value',
        value: {
          ...timerValue,
          valueType: 'sessionTime',
          [name]: value
        }
      }
    });
  };

  const onFixedTimeChange = (date) => {
    onChange({
      target: {
        name: 'content.value',
        value: {
          ...timerValue,
          date: date.format(),
          valueType: 'fixedTime'
        }
      }
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
        <Tab id='colors' title='Colors'>
          <FlexBox column flex className='min-height-400'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Clock Color:</span>
              <MiniTwitterPicker
                name='styles.clockColor'
                value={styles.clockColor}
                onChange={onChange}
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Background Color:</span>
              <MiniTwitterPicker
                name='styles.backgroundColor'
                value={styles.backgroundColor}
                onChange={onChange}
              />
            </FlexBox>
          </FlexBox>
        </Tab>
        <Tab id='settings' title='Settings'>
          <SettingBox title='Setup'>
            <FlexBox column className='margin-v-5' flexStart>
              <span className='gray-text'>Timer Clock Type:</span>
              <SelectOption
                value={content.valueType}
                name='content.valueType'
                onChange={onChange}
                className='bump-offer-style-dropdown'
                options={[
                  { label: 'Exact Date/Time', value: 'fixedTime' },
                  { label: 'Time For Each Session', value: 'sessionTime' }
                ]}
              />
            </FlexBox>
          </SettingBox>
          {content.valueType === 'fixedTime' ? (
            <SettingBox title='Fixed Session Timer Values'>
              <FlexBox column className='margin-v-5' flexStart>
                <span className='gray-text'>Date:</span>
                <DatePicker
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
                <span className='gray-text'>Minutes:</span>
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
      </Tabs>
    </div>
  );
};

CountDowTimerWidget.propTypes = {};

export default CountDowTimerWidget;
