import React, { Component } from 'react';
import clx from 'classnames';
import './style.css';
import { EasyAnimate } from '../Animation';
// import clx from 'classnames'
export default class Table extends Component {

  static Head = ({ children, className, ...props }) => (
    <span className={clx('table-head', className)} {...props}>
      {children}
    </span>
  )

  static Body = ({ children, className }) => (
    <div className={clx('table-body', className)}>{children}</div>
  )

  static HeadCell = ({
    children,
    flex = true,
    className = '',
    nowrap
  }) => (
    <div className={clx('table-head-cell', className, { flex }, { nowrap })}>
      {children && (
        <span>
          {children}
        </span>
      )}
    </div>
  )

  static Row = ({
    children,
    orderInList = 0,
    subRow,
    className = '',
    onClick,
    noMinWidth,
    ...props
  }) => {
    const classNames = clx('table-row-container', className, { 'row-aligned-center': subRow }, { 'no-min-width': noMinWidth });

    return (
      <EasyAnimate
        className={classNames}
        delay={orderInList * 50}
        {...props}
      >
        <div className='table-row' onClick={onClick}>
          {children}
        </div>
        {subRow}
      </EasyAnimate>
    );
  }

  static Cell = ({
    children,
    mainContent,
    className = '',
    mainCellClassName,
    flex = true,
    flexStart,
    subContent,
    sideContent,
    nowrap,
    ...props
  }) => {
    const classNames = clx('table-cell', className, {
      nowrap,
      flex,
      flexStart
    });

    return (
      <div className={classNames} {...props}>
        {mainContent && (
          !sideContent
            ? (
              <span className={clx('cell-main-content', mainCellClassName)}>
                {mainContent}
              </span>
            )
            : (
              <div>
                <span className={clx('cell-main-content', mainCellClassName)}>
                  {mainContent}
                </span>
                <span className={clx('cell-main-content', mainCellClassName)}>
                  {sideContent}
                </span>
              </div>
            )
        )
        }
        {typeof subContent !== 'object'
          ? <span className='cell-sub-content'>{subContent}</span>
          : <span className={`cell-sub-content ${subContent && subContent.className}`}>{subContent && subContent.content}</span>
        }
        {children}
      </div>
    );
  }

  static SmallCell = ({ children }) => (
    <div className='small-table-cell'>{children}</div>
  )

  static RowControls = ({ children }) => (
    <div className='row-controls'>
      {children}
    </div>
  )


  render = () => {
    const { subTable, className, children } = this.props;
    const classes = clx('table-container', className, { 'sub-table': subTable });

    return (
      <div className={` ${classes}`}>
        {children}
      </div>
    );
  }
}

export { default as Pagination, withPagination } from './Pagination';
