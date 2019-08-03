import React from 'react';
import { HeaderLogo } from 'components/common/logos';
// import { SearchBar } from 'components/common/search';


// import './style.css';

export default ({ history, ...props }) => (
  <div className='header'>
    <HeaderLogo onClick={() => history.push('/')} />
  </div>
);
