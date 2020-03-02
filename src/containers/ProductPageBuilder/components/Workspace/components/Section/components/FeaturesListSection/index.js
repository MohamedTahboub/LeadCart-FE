import React from 'react';
import common from 'components/common';
import { useContext } from '../../../../../../actions';
import './style.css';
import {
  Feature
} from './components';

const { EditableField } = common;


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


  // const addNewTestimonial = () => {
  //   if (list.length <= 4) {
  //     list.id = ids.generate();
  //     actions.onSectionSettingChange({
  //       section: sectionSetting,
  //       field: {
  //         name: 'content.list',
  //         value: [...list, emptyTestimonial]
  //       }
  //     });
  //   }
  // };


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

  // const onAddNewFeature = () => {
  //   const newList = [...list, { text: 'edit feature content!' }];
  //   onChange('list', newList);
  // };


  const onTitleChange = ({ target: { value } }) => {
    onChange('content.title', value);
  };

  const style = {
    ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    fontSize: `${styles.fontSize}px`
  };

  return (

    <div className='features-list-container' style={style}>
      <EditableField
        className='features-list-title'
        // name='pagePreferences.featuresTitle'
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
          color={styles.themeColor}
        />
      ))}
    </div>
  );
};

export default Features;
