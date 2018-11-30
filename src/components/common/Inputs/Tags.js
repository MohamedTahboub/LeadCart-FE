import React from 'react';

const Tage = ({ children, onDelete, ...props }) => (
  <div className='tage-keyword-container  child-added-element'>
    <span className='tage-keyword'>{children}</span>
    <span onClick={onDelete} className='tage-delete'><i className='fas fa-times' /></span>
  </div>
);

const TagLengthValidate = ({ target: { value } }) => value.length > 3;

export const TagsElements = ({
  onAddTag, onDelete, showTageInput, tags, onCurrentTagChange, isCurrentTagValid, ...props
}) => (
  <div className='tages-element-handle'>
    {showTageInput && (
      <div className='tag-input-container'>
        <input
          onEnter={onAddTag}
          onChange={onCurrentTagChange}
          type='text'
          className='tage-input-field'
          placeholder='Enter Tag Keyword'
        />
        {isCurrentTagValid && (
          <span onClick={onAddTag} className='tag-save-btn'>
            <i className='fas fa-check' />
          </span>
        )}
      </div>
    )}
    {tags.map(({ id, value }) => (<Tage onDelete={() => onDelete(id)}>{value}</Tage>))}
  </div>
);
