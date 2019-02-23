import React, { Fragment } from 'react';
import { CodeInputArea } from '../Inputs'
import './style.css';
export const FlexBoxesContainer = ({ children, className, ...props }) => (
  <div className={`flex-boxes-container ${className ? className : ''}`}>
    {children}
  </div>
);

export const MainBlock = ({
  title, notes, children, classes = [], containerClasses, blockHandel, blockActivabilityHandle = false, ...props
}) => (
    <div className={`main-block ${classes.join(' ')}`}>
      <div className='main-title-container'>
        <span className='main-title'>{title}</span>
        {notes && <span className='main-title-note'>{notes}</span>}
        {blockHandel && blockHandel}
      </div>
      {children
        && (
          <div className={`box-container ${containerClasses && containerClasses.join(' ')}`}>
            {children}
          </div>
        )}
    </div>
  );


export const Block = ({ children, ...props }) => (
  <div className='block-container'>
    {children}
  </div>
);
export const SmallBox = ({ clickable = false, onClick, classes = [], ...props }) => (
  <div onClick={onClick} style={({ cursor: clickable ? 'pointer' : 'inherit' })} className={`small-box ${classes.join(' ')}`}>
    <div className='small-box-container'>
      {props.children}
    </div>
  </div>
);
export const Box = ({
  header, content, footer, ...props
}) => (
    <div className='normal-box'>
      {header && <div className='box-header'>{header}</div>}
      {content && <div className='box-content'>{content}</div>}
      {footer && <div className='box-footer'>{footer}</div>}
    </div>
  );

export const EmbededScripContainer = ({ headNote, showCopied, script }) => (
  <div className='embeded-script-container'>
    <div className="input-head-note">
      <span className="head-note-text">{headNote}</span>
    </div>
    <CodeInputArea
      disabled={true}
      value={script}
      name='embededScript'
      flixable={true}
    />
    <span style={{ opacity: showCopied ? 1 : 0 }} className="copied-flag">Copied!</span>
  </div>
)