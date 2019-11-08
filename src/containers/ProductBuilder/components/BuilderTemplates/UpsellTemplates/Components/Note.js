import React from 'react';
import PropTypes from 'prop-types';
// import EditableField from './EditableField';
import QuillEditor from 'components/QuillEditor';

const Note = ({
  product: {
    pagePreferences: {
      orderNote: {
        enabled,
        text,
        style
      } = {}
    } = {}
  } = {},
  ...props
}) => {
  const onEdit = (text) => {
    props.onChange({
      target: {
        name: 'pagePreferences.orderNote',
        value: {
          enabled,
          text,
          style
        }
      }
    });
  };

  return enabled ? (
    <div className='upsell-notes-container'>
      <QuillEditor
        value={text}
        onEdit={onEdit}
      />
    </div>
  ) : null;
};
Note.propTypes = {
  value: PropTypes.string
};

Note.defaultProps = {
  value: 'upsell title here'
};

export default Note;
