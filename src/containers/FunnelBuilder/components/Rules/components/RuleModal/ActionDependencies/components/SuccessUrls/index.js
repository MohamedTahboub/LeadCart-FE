import React from 'react';
import './style.css';
import common from 'components/common';
import { isFunction } from 'libs/checks';
import { DummySuccessUrl, NewUrl } from './components';

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

  const onDelete = (id) => {
    const newList = urls.filter((link, i) => id !== i);
    updateList(newList);
  };

  const onAddNew = (urlObj) => {
    const newList = [...urls, urlObj];
    updateList(newList);
  };

  return (
    <FlexBox column>
      <FlexBox column className='success-urls-container'>
        {urls.map((url, id) => (
          <DummySuccessUrl
            key={url._id + id.toString()}
            id={id}
            onDelete={onDelete}
            {...url}
          />
        ))}
      </FlexBox>
      <NewUrl onAdd={onAddNew} />
    </FlexBox>
  );
};

export default SuccessUrls;
