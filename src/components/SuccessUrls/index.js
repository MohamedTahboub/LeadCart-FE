import React, { Fragment } from 'react';
import NewUrlRow from './NewUrlRow';
import './style.css';
import moment from 'moment';

const SuccessUrls = ({
  name,
  list = [],
  ...props
}) => {
  const onChange = ({ target: { value, name } }, id) => {
    const newList = list.map((link, i) => {
      if (i === id) return { ...link, [name]: value };
      return link;
    });

    props.onChange({
      target: {
        name,
        value: newList
      }
    });
  };

  const onDelete = (id) => {
    const newList = list.filter((link, i) => id !== i);
    props.onChange({
      target: {
        name,
        value: newList
      }
    });
  };

  const onAddNew = () => {
    const newList = [...list, { url: '', activeDuration: moment() }];
    props.onChange({
      target: {
        name,
        value: newList
      }
    });
  };
  return (
    <Fragment>
      <div className='success-urls-container'>
        {list.map((url, id) => (
          <NewUrlRow
            key={url._id + id.toString()}
            id={id}
            onChange={onChange}
            onDelete={onDelete}
            {...url}
          />
        ))}
      </div>
      <span onClick={onAddNew} className='new-fulfillment-btn'>
        <span className='add-label'>Add New Success Url :</span>
        <i className='fas fa-plus' />
        {' '}
        New Success Url
      </span>
    </Fragment>
  );
};

export default SuccessUrls;
