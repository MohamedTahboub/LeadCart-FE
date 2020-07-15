import React from 'react';
import { useContext } from '../../../../../../actions';
import './style.css';
import { Feature } from './components';


const Features = ({ section }) => {
  const { actions } = useContext();

  const {
    styles,
    content: { list = [] } = {}
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
      if (`${id}` === `${name}`) {
        return {
          ...f,
          text: value
        };
      }
      return f;
    });
    onChange('content.list', newList);
  };


  const onFeatureDelete = (i) => {
    const newList = list.filter((f, id) => id !== +(i));

    onChange('content.list', newList);
    if (!newList.length)
      actions.onSectionDelete(section.id);

  };

  return (

    <div className='features-list-container'>
      {list.map(({ text }, id) => (
        <Feature
          key={id}
          id={id}
          text={text}
          onChange={onFeatureChange}
          onDelete={onFeatureDelete}
          customBulletPoint={styles.customBulletPoint}
          color={styles.bulletColor}
          theme={styles.theme}
        />
      ))}
    </div>
  );
};
Feature.defaultProps = { section: {} };
export default Features;
