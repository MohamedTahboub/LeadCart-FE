import React, { Fragment } from 'react';
import common from 'components/common';
import { useContext } from '../../../../../../actions';


import './style.css';
import {
  ClassicTestimonial,
  ModernTestimonial
} from './components';

const {
  EditableField,
  FlexBox,
  LayoutSwitch
} = common;

// const Wrapper = ({ className, children, ...props }) => (className ? <div className={className}>{children}</div> : <Fragment>{children}</Fragment>);


const Testimonial = ({ theme = 'classic', ...props }) => (
  <LayoutSwitch active={theme}>
    <ClassicTestimonial id='classic' {...props} />
    <ModernTestimonial id='modern' {...props} />
  </LayoutSwitch>
);
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
        name: 'content.list',
        value: newList
      }
    });
  };

  const onDelete = (i) => {
    const newList = content.list.filter((f, id) => id !== +(i));
    onChange({
      target: {
        name: 'content.list',
        value: newList
      }
    });
  };


  return (
    <FlexBox
      center='h-center'
      // className='product-template-testimonials-container'
      column
      // style={style}
    >
      <h3>
        <EditableField
          name='content.title'
          defaultValue='Testimonials'
          onChange={onChange}
          value={content.title}
        />
      </h3>
      <FlexBox flex spaceAround wrappable={content.list && content.list.length > 2}>
        {Array.isArray(content.list) && content.list.map((i, id) => (
          <Testimonial
            key={id}
            orderId={id}
            {...i}
            // className={testimonialClassName}
            onDelete={onDelete}
            onChange={onTestimonialChange}
            theme={styles.theme}
          />
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default Testimonials;
