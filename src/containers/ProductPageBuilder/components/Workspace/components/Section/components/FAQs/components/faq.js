import React from 'react';
import Expand from 'react-expand-animated';
import clx from 'classnames';
import { FaTrashAlt } from 'react-icons/fa';

import common from 'components/common';
import ContentIcons from './faqIcon';

const { ResizableInput, ResizableTextarea, FlexBox } = common;

const FAQ = ({ title, content, id, toggle, onChange, open, onDelete, styles }) => {
  return (
    <div className={clx(
      'faq-listItem', 'margin-v-10',
      { 'faq-active': open === id }
    )}
    >
      <FlexBox center='v-center'>

        <FaTrashAlt
          className='faq-listItem-delete'
          onClick={() => {
            onDelete(id);
          }}
        />

        <span onClick={() => { toggle(id); }}>
          <ContentIcons
            id={id}
            toggle={toggle}
            open={open}
            styles={styles}
          />

          <span className='faq-listItem-title' >
            <ResizableInput
              value={title}
              onChange={onChange}
              name={'title'}
              id={id}
            />
          </span>
        </span>
      </FlexBox>


      <Expand open={open === id}>
        <ResizableTextarea
          className='faq-listItem-content'
          value={content}
          onChange={onChange}
          name={'content'}
          id={id}
        />
      </Expand>
    </div>
  );
};

export default FAQ;
