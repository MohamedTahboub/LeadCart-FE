import React from 'react';

import InlinePopup from 'components/common/InlinePopup';
import common from 'components/common';
import { useContext } from '../../../actions';
import { ImageOption } from './common';

const themesOptions = [
  {
    theme: 'classic',
    src: 'https://i.imgur.com/KrpUDcY.png'
  }, {
    theme: 'modern',
    src: 'https://i.imgur.com/loxwoC8.png'
  }, {
    theme: 'description-oriented',
    src: 'https://imgur.com/gc1pKG8.png'
  }, {
    theme: 'edgy',
    src: 'https://imgur.com/qtbQdUD.png'
  }, {
    theme: 'plain',
    src: 'https://imgur.com/RRNuBwx.png'
  }, {
    theme: 'compact',
    src: 'https://imgur.com/ORfQGLU.png'
  }, {
    theme: 'business',
    src: 'https://imgur.com/dxL8dBD.png'
  }
];

const { Tabs, Tab, MiniColorPicker, FlexBox, InputRow } = common;
const { Label } = InputRow;

const TestimonialsSection = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {}, content = {} } = sectionSetting;


  const hasJobTitle = content?.authorDescription;
  const hasCountry = content?.authorCountry;

  const onThemeChange = (theme) => (src) => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.theme',
        value: theme
      }
    });
  };


  const onChange = ({ target: { value, name } = {} } = {}) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name,
        value
      }
    });
  };


  return (
    <div className='overflow-y-scroll'>
      <Tabs active='themes' className='padding-v-10 padding-h-10'>
        <Tab id='themes' title='Themes'>
          {themesOptions.map(({ theme, src }) => (
            <ImageOption
              className='guarantee-theme-demo'
              value={src}
              key={theme}
              onClick={onThemeChange(theme)}
              active={styles.theme === theme}
            />
          ))}
        </Tab>


        <Tab id='styles' title='Styles'>
          <FlexBox column>
            <InlinePopup
              title='Background Color'
              popUpContent={(
                <InputRow>
                  <Label>
                    Background Color:
                  </Label>
                  <MiniColorPicker
                    name='styles.backgroundColor'
                    value={styles.backgroundColor}
                    onChange={onChange}
                  />
                </InputRow>
              )}
            />

            <InlinePopup
              title='Name Color'
              popUpContent={(
                <InputRow>
                  <Label>
                    Name Color:
                  </Label>
                  <MiniColorPicker
                    name='styles.nameColor'
                    value={styles.nameColor}
                    onChange={onChange}
                  />
                </InputRow>
              )}
            />

            {hasJobTitle &&
            <InlinePopup
              title='Job Title Color'
              popUpContent={(
                <InputRow>
                  <Label>
                    Name Color:
                  </Label>
                  <MiniColorPicker
                    name='styles.jobTitleColor'
                    value={styles.jobTitleColor}
                    onChange={onChange}
                  />
                </InputRow>
              )}
            />}

            {hasCountry &&
            <InlinePopup
              title='Country Name Color'
              popUpContent={(
                <InputRow>
                  <Label>
                    Name Color:
                  </Label>
                  <MiniColorPicker
                    name='styles.countryNameColor'
                    value={styles.countryNameColor}
                    onChange={onChange}
                  />
                </InputRow>
              )}
            />}

            <InlinePopup
              title='Description Color'
              popUpContent={(
                <InputRow>
                  <Label>
                    Name Color:
                  </Label>
                  <MiniColorPicker
                    name='styles.descriptionColor'
                    value={styles.descriptionColor}
                    onChange={onChange}
                  />
                </InputRow>
              )}
            />
          </FlexBox>
        </Tab>

      </Tabs>
    </div>
  );
};

TestimonialsSection.propTypes = {};

export default TestimonialsSection;
