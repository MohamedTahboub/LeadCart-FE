import React, { Component } from 'react';
import './style.css';

export const BlankLink = ({ to, children, ...props }) => (
  <a href={to} target='_blank' className='blank-link'>{children}</a>
);

