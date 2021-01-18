import React from 'react';
import moment from 'moment';
import Select from 'react-select';

import common from 'components/common';
import { ImageOption, SettingBox } from './common';
import { useContext } from '../../../actions';

const { Tabs, InputRow, MiniColorPicker, FlexBox, Tab } = common;
const { TextField, SelectOption, DatePicker, Toggle } = InputRow;

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

const CountDowTimerWidget = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    content = {}
  } = sectionSetting;

  const { value: timerValue, valueType = 'sessionTime' } = content;

  const onChange = (field) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field
    });
  };

  const onFiledChange = ({ target: { name, value } }) => onChange({ name, value });

  const onTimerValueChange = ({ target: { value, name } }) => {
    onChange({
      name: 'content.value',
      value: {
        ...timerValue,
        valueType: 'sessionTime',
        [name]: value
      }
    });
  };

  const onFixedTimeChange = (date) => {
    date && onChange({
      name: 'content.value',
      value: {
        ...timerValue,
        date: date.format(),
        valueType: 'fixedTime'
      }
    });
  };
  const onThemeChange = ({ theme }) => (src) => () => {
    onChange({
      name: 'styles.theme',
      value: theme
    });
  };


  const onSelectChange = (name) => ({ value }) => onChange({ name, value });
  const typeSelectValue = valueType === 'fixedTime' ? { label: 'Exact Date/Time', value: 'fixedTime' } : { label: 'Time For Each Session', value: 'sessionTime' };


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
              <MiniColorPicker
                name='styles.clockColor'
                value={styles.clockColor}
                onChange={onFiledChange}
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Background Color:</span>
              <MiniColorPicker
                name='styles.backgroundColor'
                value={styles.backgroundColor}
                onChange={onFiledChange}
              />
            </FlexBox>
          </FlexBox>
        </Tab>

        <Tab id='settings' title='Settings'>
          <SettingBox title='Redirect Link'>
            <FlexBox column className='margin-v-5' flexStart>
              <Toggle
                name='content.hasPostAction'
                value={content.hasPostAction}
                onToggle={onChange}
                className='mr-2'
                beforeLabel='show'
                afterLabel='hide'
              />
              {content.hasPostAction &&
                <TextField
                  name='content.redirectUrl'
                  value={content.redirectUrl}
                  onChange={onFiledChange}
                />
              }
            </FlexBox>
          </SettingBox>

          <SettingBox title='Setup'>
            <FlexBox column className='margin-v-5' flexStart>
              <span className='gray-text'>Timer Clock Type:</span>
              <Select
                value={typeSelectValue}
                onChange={onSelectChange('content.valueType')}
                className='bump-offer-style-dropdown  min-width-200'
                options={[
                  { label: 'Exact Date/Time', value: 'fixedTime' },
                  { label: 'Time For Each Session', value: 'sessionTime' }
                ]}
              />
            </FlexBox>
          </SettingBox>
          {content.valueType === 'fixedTime' ? (
            <SettingBox title='Exact Date Timer Value'>
              <FlexBox column className='margin-v-5' flexStart>
                <span className='gray-text'>Date:</span>
                <DatePicker
                  type='date'
                  disabledDate={(date) => date < (Date.now() - (24 * 60 * 60 * 1000))}
                  placeholder='Timer End Date'
                  defaultValue={moment(content.date)}
                  className='margin-left-30'
                  onChange={onFixedTimeChange}
                  showTime
                />
              </FlexBox>
            </SettingBox>
          ) :
            <SettingBox title='Fixed Session Timer Values'>
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
          }

          <SettingBox title='Appearance'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Days</span>
              <Toggle
                name='styles.showDays'
                value={styles.showDays}
                onToggle={onChange}
                className='mr-2'
                beforeLabel='show'
                afterLabel='hide'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Hours</span>
              <Toggle
                name='styles.showHours'
                value={styles.showHours}
                onToggle={onChange}
                className='mr-2'
                beforeLabel='show'
                afterLabel='hide'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Minutes</span>
              <Toggle
                name='styles.showMinutes'
                value={styles.showMinutes}
                onToggle={onChange}
                className='mr-2'
                beforeLabel='show'
                afterLabel='hide'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Seconds</span>
              <Toggle
                name='styles.showSeconds'
                value={styles.showSeconds}
                onToggle={onChange}
                className='mr-2'
                beforeLabel='show'
                afterLabel='hide'
              />
            </FlexBox>
          </SettingBox>
        </Tab>
      </Tabs>
    </div>
  );
};

CountDowTimerWidget.propTypes = {};

export default CountDowTimerWidget;
