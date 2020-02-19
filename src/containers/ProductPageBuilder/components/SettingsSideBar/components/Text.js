import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

const {
  SideMenu,
  Tabs,
  EditableField,
  InputRow,
  FlexBox,
  Tab,
} = common;

const { TextField } = InputRow;

const Text = (props) => (
  <div>
    <Tabs active='funnelBlocks' className='padding-v-10 padding-h-10'>
      <Tab id='styles' title='styles'>
        <div className='border-left-text'>Font</div>
        <div className='border-left-text'>Colors</div>
        <div className='border-left-text'>Paddings</div>
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
