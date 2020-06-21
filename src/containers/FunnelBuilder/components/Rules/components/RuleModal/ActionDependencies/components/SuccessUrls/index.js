import React from 'react';
import './style.css';
import moment from 'moment';
import common from 'components/common';
import { isFunction } from 'libs/checks';
import { UrlRow } from './components';

const { FlexBox } = common;
const SuccessUrls = ({
  name = 'action.metaData.successUrls',
  successUrls: urls = [{ activeDuration: '7,day', url: 'https:example.com' }],
  onChange
}) => {

  const updateList = (newList) => {
    if (isFunction(onChange)) {
      onChange({
        target: {
          name,
          value: newList
        }
      });
    }
  };
  const onFieldChange = ({ target: { value, name } }, id) => {
    const newList = urls.map((link, i) => {
      if (i === id) return { ...link, [name]: value };
      return link;
    });

    updateList(newList);
  };

  const onDelete = (id) => {
    const newList = urls.filter((link, i) => id !== i);
    updateList(newList);
  };

  const onAddNew = () => {
    const newList = [...urls, { url: '', activeDuration: moment() }];
    updateList(newList);
  };

  return (
    <FlexBox column>
      <FlexBox column className='success-urls-container'>
        {urls.map((url, id) => (
          <UrlRow
            key={url._id + id.toString()}
            id={id}
            onChange={onFieldChange}
            onDelete={onDelete}
            {...url}
          />
        ))}
      </FlexBox>
      <span onClick={onAddNew} className='new-fulfillment-btn'>
        <span className='add-label'>New Success Url:</span>
        <i className='fas fa-plus' />
      </span>
    </FlexBox>
  );
};

export default SuccessUrls;
