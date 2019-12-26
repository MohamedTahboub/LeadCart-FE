import React from 'react';

export default ({
  title = 'Title',
  message = 'Message',
  type,
  ...props
}) => (
  <div
    style={{
      display: 'flex',
      backgroundColor: '#0f2f26',
      borderRadius: 5,
    }}
    {...props}
  >
    <div>
      <h4>Alligator.io</h4>
      <p>Has joined the chat</p>
    </div>
  </div>
);

