import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../../../actions';
import './style.css';
import {
  Feature
} from './components';

const { EditableField, FlexBox } = common;


const Features = ({
  section = {},
  ...props
}) => {
  const { actions } = useContext();

  const {
    styles,
    content: {
      list = [],
      title
    } = {}
  } = section;


  const onChange = (name, value) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name,
        value
      }
    });
  };


  const onFeatureChange = ({ target: { value, name } }) => {
    const newList = list.map((f, id) => {
      if (id === +(name)) f.text = value;
      return f;
    });
    onChange('content.list', newList);
  };


  const onFeatureDelete = (i) => {
    const newList = list.filter((f, id) => id !== +(i));
    onChange('content.list', newList);
  };


  const onTitleChange = ({ target: { value } }) => {
    onChange('content.title', value);
  };


  return (

    <div className='features-list-container'>
      <FlexBox flex>
        <EditableField
          className='features-list-title'
          // name='pagePreferences.featuresTitle'
          defaultValue='Features List'
          onChange={onTitleChange}
          value={title}
        />
      </FlexBox>
      {list.map(({ text }, id) => (
        <Feature
          key={id}
          id={id}
          text={text}
          onChange={onFeatureChange}
          onDelete={onFeatureDelete}
          color={styles.bulletColor}
          theme={styles.theme}
        />
      ))}

    </div>
  );
};

export default Features;
