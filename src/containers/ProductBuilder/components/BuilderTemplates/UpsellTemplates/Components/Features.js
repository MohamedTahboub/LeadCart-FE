import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import UpsellFeature from 'components/UpsellFeature';
import ids from 'shortid';


const AddIcon = ({ tooltip, ...props }) => (
  <div
    {...props}

    className='add-new-upsell-btn'
  >
    <i className='fas fa-plus-circle' />
  </div>
);

const {
  EditableField
} = common;

const Features = ({
  product: {
    pagePreferences = {}
  } = {},
  ...props
}) => {
  const {
    list,
    title,
    type,
  } = pagePreferences.features;


  const onFeaturesChange = ({ target: { name, value } }) => {
    props.onChange({
      target: {
        name: 'pagePreferences.features',
        value: {
          ...pagePreferences.features,
          [name]: value
        }
      }
    });
  };
  const onFeatureChange = ({ id, value }) => {
    const newList = list.map((feature, i) => {
      if (i === id) return { ...value };
      return feature;
    });

    onFeaturesChange({
      target: {
        name: 'list',
        value: newList
      }
    });
  };

  const onAddFeature = (e) => {
    e.stopPropagation();
    if (list.length >= 8) return;
    const newList = [...list,
      {
        title: 'change title',
        text: 'feature description ...'
      }];
    onFeaturesChange({
      target: {
        name: 'list',
        value: newList
      }
    });
  };

  const onRemoveFeature = (id) => {
    const newList = list.filter((feature, i) => i !== id);
    onFeaturesChange({
      target: {
        name: 'list',
        value: newList
      }
    });
  };

  return (
    <div className='upsell-features-container'>
      <div className='flex-container'>
        <EditableField
          name='title'
          value={title}
          onChange={onFeaturesChange}
          className='upsell-features-title'
          childElement={<AddIcon onClick={onAddFeature} toolTip='add new feature' />}
        />
      </div>
      <div className={`upsell-features-list ${type}`}>
        {list.map(({
          title,
          text,
        }, number) => (
          <UpsellFeature
            key={`${number}:${title},${text}`}
            id={number}
            number={number + 1}
            title={title}
            text={text}
            onChange={onFeatureChange}
            onRemove={onRemoveFeature}
          />
        ))}
      </div>
    </div>
  );
};

Features.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf()),
  title: PropTypes.string
};

Features.defaultProps = {
  list: [],
  value: '',
  title: 'Bonuses you get with this offer'
};

export default Features;
