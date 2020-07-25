import React from 'react';
import PropTypes from 'prop-types';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import { CompleteOrderBtn } from './components';

const { FlexBox, ResizableTextarea } = common;


const StaticSections = ({ onSetting }) => {
  const {
    state: {
      product: {
        pageStyles = {},
        custom: {
          orderButtonText = 'Complete Order',
          declineButtonText = 'No Thanks'
        } = {}
      } = {}
    },
    actions
  } = useContext();

  const onSectionSettings = () => {
    const meta = {
      type: 'staticSectionSetting',
      menuTitle: 'Payment & Pricing Settings'
    };
    onSetting(meta);
  };

  const onChange = ({ target: { name, value } }) => {
    actions.onProductFieldChange({ name, value });
  };

  return (
    <FlexBox column className='relative-element'>
      <FlexBox
        id='upsell'
        className='pt-4'
        column
        center='h-center'
      >
        <CompleteOrderBtn
          name='custom.orderButtonText'
          text={orderButtonText}
          color={pageStyles.themeColor}
          onChange={onChange}
        />
        <ResizableTextarea
          onChange={onChange}
          name='custom.declineButtonText'
          value={declineButtonText}
          style={{
            minWidth: '400px',
            outlineStyle: 'none',
            textDecoration: 'underline'
          }}
          className='medium-text blush-gray max-w-500 margin-v-20 aligned-center'
        />
      </FlexBox>
    </FlexBox>
  );
};

StaticSections.propTypes = {
  language: PropTypes.objectOf(PropTypes.object).isRequired,
  onSetting: PropTypes.func.isRequired
};

export default StaticSections;
