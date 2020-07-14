import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ids from 'shortid';
import { useContext } from '../../../actions';
import {
  ImageOption,
  SettingBox
} from './common';


const emptyTestimonial = {
  author: 'edit author name!',
  content: 'click on text to edit content'
};


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

const {
  SideMenu,
  Tabs,
  EditableField,
  InputRow,
  MiniTwitterPicker,
  Button,
  FlexBox,
  Tab
} = common;

const { TextField, SelectOption } = InputRow;

const TestimonialsSection = (props) => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const {
    styles = {},
    actions: sectionActions = {},
    content: { list = [] } = {}
  } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const addNewColumn = () => {
    if (list.length <= 4) {
      list.id = ids.generate();
      actions.onSectionSettingChange({
        section: sectionSetting,
        field: {
          name: 'content.list',
          value: [...list, emptyTestimonial]
        }
      });
    }
  };
  const onThemeChange = (theme) => (src) => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.theme',
        value: theme
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
      </Tabs>
    </div>
  );
};

TestimonialsSection.propTypes = {};

export default TestimonialsSection;
