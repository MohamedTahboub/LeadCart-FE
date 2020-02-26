import React from 'react';
import common from 'components/common';

import './style.css';

const { EditableField, FloatButton } = common;

const Feature = ({
  className,
  color = 'rgb(142, 209, 252)',
  id,
  onChange,
  onDelete,
  text
}) => (
  <div className='template-feature-item-container'>
    <span style={{ background: color }} className='template-feature-order'>{id + 1}</span>
    <EditableField
      className='template-feature-item'
      name={id}
      defaultValue='Feature description'
      onChange={onChange}
      value={text}
      textarea
    />
    <span
      onClick={() => onDelete(id)}
      className='template-feature-delete'
      role='presentation'
    >
      <i className='fas fa-trash-alt' />
    </span>
  </div>
);


const Features = ({
  features = {},
  color,
  ...props
}) => {
  const { title = 'Features list', enabled, list = [] } = features;

  const onChange = (name, value) => {
    const newFeatures = { ...features, [name]: value };
    // props.onChange({
    //   target: {
    //     name: 'pagePreferences.features',
    //     value: newFeatures
    //   }
    // });
  };
  const onFeatureChange = ({ target: { value, name } }) => {
    const newList = list.map((f, id) => {
      if (id === +(name)) f.text = value;
      return f;
    });
    onChange('list', newList);
  };


  const onFeatureDelete = (i) => {
    const newList = list.filter((f, id) => id !== +(i));
    onChange('list', newList);
  };

  const onAddNewFeature = () => {
    const newList = [...list, { text: 'edit feature content!' }];
    onChange('list', newList);
  };

  const onDisable = () => {
    onChange('enabled', false);
  };

  const onTitleChange = ({ target: { value } }) => {
    onChange('title', value);
  };


  return (

    <div className='product-template-features'>

      <FloatButton onClick={onDisable} position={{ left: 0 }}>
        <i className='fas fa-eye-slash' />
      </FloatButton>
      <FloatButton
        onClick={onAddNewFeature}
        position={{
          right: -5,
          left: 'unset',
          top: '0',
          background: 'transparent',
          color: '#4DA1FF'
        }}
      >
        <i className='fas fa-plus-circle' />
      </FloatButton>

      <EditableField
        className='template-features-title'
        name='pagePreferences.featuresTitle'
        defaultValue='Features List'
        onChange={onTitleChange}
        value={title}
      />
      {list.map(({ text }, id) => (
        <Feature
          key={id}
          id={id}
          text={text}
          onChange={onFeatureChange}
          onDelete={onFeatureDelete}
          color={color}
        />
      ))}
    </div>
  );
};

export default Features;
