import React, { Fragment } from 'react';
import { Testi as Testimonial } from 'components/Testimonials';
import common from 'components/common';
import { useContext } from '../../../../../../actions';


import './style.css';

const {
  EditableField,
  FlexBox
} = common;

// const Wrapper = ({ className, children, ...props }) => (className ? <div className={className}>{children}</div> : <Fragment>{children}</Fragment>);

const Testimonials = ({
  section = {},
  ...props
}) => {
  const { styles = {}, content = {} } = section;
  const { actions } = useContext();


  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section,
      field: target
    });
  };

  const onTestimonialChange = ({ target: { name, value } }) => {
    const updateMatched = (t, id) => (id === name ? value : t);
    const newList = content.list.map(updateMatched);
    onChange({
      target: {
        name: 'list',
        value: newList
      }
    });
  };

  const onDelete = (i) => {
    const newList = content.list.filter((f, id) => id !== +(i));
    onChange({
      target: {
        name: 'list',
        value: newList
      }
    });
  };

  // const onAdd = () => {
  //   const newList = [...list, { author: 'edit author name!', content: 'click on text to edit content' }];
  //   onChange('list', newList);
  // };

  // const onDisable = () => {
  //   onChange('enabled', false);
  // };

  // const onTitleChange = ({ target: { value } }) => {
  //   onChange('title', value);
  // };

  const style = {
    ...styles,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    fontSize: `${styles.fontSize}px`
  };

  return (
    <div
      className='product-template-testimonials-container'
      style={style}
    >
      <h3>
        <EditableField
          name='content.title'
          defaultValue='Testimonials'
          onChange={onChange}
          value={content.title}
        />
      </h3>
      <FlexBox>
        {Array.isArray(content.list) && content.list.map((i, id) => (
          <Testimonial
            key={id}
            id={id}
            {...i}
            // className={testimonialClassName}
            onDelete={onDelete}
            onChange={onTestimonialChange}
          />
        ))}
      </FlexBox>
    </div>
  );
};

export default Testimonials;
