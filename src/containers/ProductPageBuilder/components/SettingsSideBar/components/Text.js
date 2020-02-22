import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

const {
  SideMenu,
  Tabs,
  EditableField,
  InputRow,
  MiniTwitterPicker,
  FlexBox,
  Tab,
} = common;

const { TextField, SelectOption } = InputRow;

const Text = (props) => (
  <div>
    <Tabs active='styles' className='padding-v-10 padding-h-10'>
      <Tab id='styles' title='styles'>
        <div className='large-text border-left-text'>Font</div>
        <div className='padding-left-20'>
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>Font Size</span>
            <TextField type='number' defaultValue={16} className='width-70' />
          </FlexBox>
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>FontFamily Color</span>
            <SelectOption
              // value={showConnected}
              className='margin-h-10'
              // onChange={onChangeConnectFilter}
              options={[
                { label: 'Cairo', value: '\'Open Sans\', sans-serif' },
                { label: 'Calibri', value: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif' },
                { value: 'Georgia', label: 'Georgia' },
                { value: 'Palatino Linotype', label: 'Palatino Linotype' },
                { value: 'Book Antiqua', label: 'Book Antiqua' },
                { value: 'Courier New', label: 'Courier, monospace' },
                { value: 'Arial', label: 'Arial' },
                { value: 'Lucida Console', label: 'Lucida Console' },
                { value: 'Helvetica', label: 'Helvetica' },
                { value: 'Arial Black', label: 'Arial Black' },
                { value: 'Lucida Sans Unicode', label: 'Lucida Sans Unicode' },
                { value: 'Times New Roman', label: 'Times New Roman' },
              ]}
            />
          </FlexBox>
        </div>


        <div className='large-text border-left-text margin-top-20'>Colors</div>
        <div className='padding-left-20'>
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>BackGround Color</span>
            <MiniTwitterPicker
              name='containerTextColor'
              // value={style.containerTextColor}
              onChange={() => {}}
            />
          </FlexBox>
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>Text Color</span>
            <MiniTwitterPicker
              name='containerTextColor'
              // value={style.containerTextColor}
              onChange={() => {}}
            />
          </FlexBox>
        </div>


        <div className='large-text border-left-text margin-top-20'>Paddings</div>
        <div className='padding-left-20'>
          <FlexBox center='v-center ' spaceBetween>
            <span className='gray-text'>Padding Top:</span>
            <TextField type='number' defaultValue={16} className='width-70' />
          </FlexBox>
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>Padding bottom:</span>
            <TextField type='number' defaultValue={16} className='width-70' />
          </FlexBox>
        </div>
      </Tab>
      <Tab id='actions' title='actions'>

        <div className='border-left-text'>On Section Click Open:</div>
        <TextField />
      </Tab>
    </Tabs>
  </div>
);

Text.propTypes = {

};

export default Text;
