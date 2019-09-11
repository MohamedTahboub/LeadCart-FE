import React, { Fragment } from 'react';
import { CodeInputArea } from '../Inputs'
import PropTypes from 'prop-types';
import { iconsClassesReference, getSymbolsReferences } from 'libs'
import './style.css';

export const FlexBoxesContainer = ({ children, flex = '', className, ...props }) => (
  <div className={`flex-boxes-container ${className ? className : ''} ${flex}`}>
    {children}
  </div>
);

export const MainBlock = ({
  title, notes, children, className = '', containerClasses, blockHandel, blockActivabilityHandle = false, ...props
}) => (
    <div className={`main-block ${className}`}>
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
export const SmallBox = ({ clickable = false, onClick, className = '', ...props }) => (
  <div onClick={onClick} style={({ cursor: clickable ? 'pointer' : 'inherit' })} className={`small-box ${className}`}>
    <div className='small-box-container'>
      {props.children}
    </div>
  </div>
);
export const Box = ({
  header,
  contentClassName = '',
  className = '',
  content,
  footer,
  ...props
}) => (
    <div className={`normal-box ${className}`}>
      {header && <div className='box-header'>{header}</div>}
      {content && <div className={`box-content ${contentClassName}`}>{content}</div>}
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


export const InsightBadge = ({
  title,
  value,
  name,
  chart,
  show,
  icon
}) => {

  // const iconClassName = iconsClassesReference(name)
  const { prefixSymbol, suffixSymbol } = getSymbolsReferences(name)

  if (!show) return null;
  return (
    <div className='insight-box'>
      <span className='insight-title'>{title}</span>
      <span className='insight-value'>
        {prefixSymbol}
        {isNaN(+value) ? 0 : +value}
        {suffixSymbol}
      </span>
      {chart && (
        <span className='insight-chart'>
          {chart}
        </span>
      )}
      <span className="insight-box-info-tip">
        <i className="fas fa-info-circle" />
      </span>
    </div>
  )
}

InsightBadge.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  chart: PropTypes.instanceOf(HTMLElement),
  icon: PropTypes.instanceOf(HTMLElement),
};

InsightBadge.defaultProps = {
  chart: null,
  icon: null
};