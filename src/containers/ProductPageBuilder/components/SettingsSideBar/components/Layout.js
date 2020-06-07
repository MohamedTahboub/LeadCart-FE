import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ReactTooltip from 'react-tooltip';
import sectionsTemplate from 'data/productSectionsTemplates';
import ids from 'shortid';
import { useContext } from '../../../actions';

const nestedSectionTemplate = sectionsTemplate.text;

const {
  SideMenu,
  Tabs,
  EditableField,
  InputRow,
  MiniTwitterPicker,
  FlexBox,
  Tab,
  Button
} = common;

const { TextField, SelectOption } = InputRow;

const Layout = (props) => {
  const {
    state: {
      modals: {
        sectionSetting = {}
      } = {}
    },
    actions
  } = useContext();

  const {
    structure = {},
    styles = {},
    content: {
      sections: nestedSection = []
    } = {}
  } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const addNewColumn = () => {
    if (nestedSection.length <= 4) {
      nestedSectionTemplate.id = ids.generate();
      actions.onSectionSettingChange({
        section: sectionSetting,
        field: {
          name: 'content.sections',
          value: [...nestedSection, nestedSectionTemplate]
        }
      });
    }
  };
  return (
    <div>
      <Tabs active='structure' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='structure' title='structure'>
          <div className='large-text border-left-text margin-top-20'>Columns</div>
          <div className='padding-left-20'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span
                data-tip='number of nested sections'
                className='gray-text'
              >
                Current Section:
                {nestedSection.length}
              </span>
              <Button
                data-tip={(nestedSection.length >= 4) ? 'you can\'t add more than 4 nested sections' : ''}
                disabled={nestedSection.length >= 4}
                className='primary-btn'
                onClick={addNewColumn}
              >
                Add New Section
              </Button>
            </FlexBox>
          </div>
        </Tab>

        <Tab id='styles' title='styles'>
          <div className='large-text border-left-text margin-top-20'>Size</div>
          <div className='padding-left-20'>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Section Height:</span>
              <TextField
                name='styles.height'
                type='number'
                value={styles.height}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Section Width:</span>
              <TextField
                type='number'
                name='styles.width'
                value={styles.width}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </div>

          <div className='large-text border-left-text margin-top-20'>Margin</div>
          <div className='padding-left-20'>
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
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Margin Left:</span>
              <TextField
                name='styles.marginLeft'
                type='number'
                value={styles.marginLeft}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Margin Right:</span>
              <TextField
                type='number'
                name='styles.marginRight'
                value={styles.marginRight}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </div>

          <div className='large-text border-left-text margin-top-20'>Padding</div>
          <div className='padding-left-20'>
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
              <span className='gray-text'>Padding Bottom:</span>
              <TextField
                type='number'
                name='styles.paddingBottom'
                value={styles.paddingBottom}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Padding Left:</span>
              <TextField
                name='styles.paddingLeft'
                type='number'
                value={styles.paddingLeft}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Padding Right:</span>
              <TextField
                type='number'
                name='styles.paddingRight'
                value={styles.paddingRight}
                onChange={onChange}
                className='width-70'
              />
            </FlexBox>
          </div>
        </Tab>
      </Tabs>
      <ReactTooltip delayShow={300} />
    </div>
  );
};

Text.propTypes = {

};

export default Layout;
