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
  List,
  // InputRow,
  // MainTitle,
  // Button,
  // ActivationSwitchInput,
  // SubTabs,
  // FlexBoxesContainer
  EditableField
} = common;

const Features = ({
  list,
  title,
  type,
}) => {
  const [features, setFeatures] = useState(list);

  const onFeatureChange = ({ id, value }) => {
    const newList = features.map((feature) => {
      if (feature.id === id) return { id, value };
      return feature;
    });

    setFeatures(newList);
    // onFeaturesChange(newList)
  };

  const onAddFeature = (e) => {
    e.stopPropagation();
    if (features.length >= 8) return;
    const newList = [...features,
      {
        _id: ids.generate(),
        title: 'change title',
        description: 'feature description ...'
      }];
    setFeatures(newList);
    // onFeaturesChange(newList)
  };
  const onRemoveFeature = (id) => {
    const newList = features.filter(({ _id }) => _id !== id);
    setFeatures(newList);
  };

  return (
    <div className='upsell-features-container'>
      <div className='flex-container'>
        <EditableField
          name='title'
          value={title}
          // onChange={onChange.bind(this, id)}
          className='upsell-features-title'
          childElement={<AddIcon onClick={onAddFeature} toolTip='add new feature' />}
        />
      </div>
      <div className='upsell-features-list'>
        {features.map(({
          title, description, _id: id
        }, number) => (
          <UpsellFeature
            key={id}
            id={id}
            number={number + 1}
            title={title}
            description={description}
            onChange={onFeatureChange}
            onRemove={onRemoveFeature.bind(this, id)}
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
