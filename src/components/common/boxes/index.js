import React from 'react';
import PropTypes from 'prop-types';
import { getSymbolsReferences } from 'libs';
import numeral from 'numeral';
import classNames from 'classnames';
import { CodeInputArea } from '../Inputs';

import './style.css';

export const FlexBoxesContainer = ({
  children, flex = '', className, ...props
}) => (
  <div className={`flex-boxes-container ${className || ''} ${flex}`}>
    {children}
  </div>
);

export const MainBlock = ({
  title,
  notes,
  children,
  className = '',
  containerClasses,
  blockHandel,
  blockActivabilityHandle = false,
  ...props
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
export const SmallBox = ({
  clickable = false,
  onClick,
  className = '',
  ...props
}) => (
  <div
    onClick={onClick}
    style={({ cursor: clickable ? 'pointer' : 'inherit' })}
    className={`small-box ${className}`}
  >
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


export const InsightBadge = ({
  title,
  value = 0,
  name,
  chart,
  description,
  format: valueFormat = '0.00',
  show,
  icon
}) => {
  // const iconClassName = iconsClassesReference(name)
  const { prefixSymbol, suffixSymbol } = getSymbolsReferences(name);

  if (!show) return null;

  const castedValue = typeof value === 'number' ? numeral(value).format(valueFormat) : value;

  return (
    <div className='insight-box'>
      <span className='insight-title'>{title}</span>
      <span className='insight-value'>
        {prefixSymbol}
        {castedValue}
        {suffixSymbol}
      </span>
      {chart && (
        <span className='insight-chart'>
          {chart}
        </span>
      )}
      {description && (
        <div
          data-label={description}
          className='insight-box-info-tip'
        >
          <i className='fas fa-info-circle' />
        </div>
      )}
    </div>
  );
};

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


export const FlexBox = ({
  className,
  column,
  spaceBetween,
  wrappable,
  flex,
  center,
  children
}) => {
  const classes = classNames({
    [className]: true,
    column,
    spaceBetween,
    wrappable,
    flex,
    [center]: center
  });

  return (
    <div className={`flex-box ${classes}`}>
      {children}
    </div>
  );
};

