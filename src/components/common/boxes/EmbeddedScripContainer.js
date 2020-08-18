import React from 'react';
import { CodeInputArea } from '../Inputs';


const EmbeddedScripContainer = ({ headNote, showCopied, script }) => (
  <div className='embeded-script-container'>
    <div className='input-head-note'>
      <span className='head-note-text'>{headNote}</span>
    </div>
    <CodeInputArea
      disabled
      value={script}
      name='embededScript'
      flixable
    />
    <span style={{ opacity: showCopied ? 1 : 0 }} className='copied-flag'>Copied!</span>
  </div>
);


export default EmbeddedScripContainer;
