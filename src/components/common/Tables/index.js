import React, { Component } from 'react';
import clx from 'classnames';
import './style.css';
import { EasyAnimate } from '../Animation';

export default class Table extends Component {
  static Head = ({ children }) => (
    <span className='table-head'>
      {children}
    </span>
  )

  static Body = ({ children }) => (
    <div className='tabel-body'>{children}</div>
  )

  static HeadCell = ({
    children,
    flex = true,
    className = ''
  }) => (
    <div className={`table-head-cell  ${className} ${flex ? 'flex' : ''}`}>
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
    className = ''
  }) => (
    <EasyAnimate className={`table-row-container ${className} ${subRow ? '' : 'row-aligned-center'}`} delay={orderInList * 50}>
      <div className='table-row'>
        {children}
      </div>
      {subRow}
    </EasyAnimate>
  )

  static Cell = ({
    children,
    mainContent,
    className = '',
    flex = true,
    flexStart,
    subContent,
    sideContent,
    ...props
  }) => {
    const classNames = clx({
      'table-cell': true,
      [className]: className,
      flex,
      flexStart
    });

    return (
      <div className={classNames} {...props}>
        {mainContent && (
          !sideContent
            ? (
              <span className='cell-main-content'>
                {mainContent}
              </span>
            )
            : (
              <div>
                <span className='cell-main-content'>
                  {mainContent}
                </span>
                <span className='cell-main-content'>
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

  static RowControlls = ({ children }) => (
    <div className='row-controls'>
      {children}
    </div>
  )


  render = () => {
    const { subTable, className, children } = this.props;

    const classes = clx({
      'sub-table': subTable,
      [className]: className
    });
    return (
      <div className={`table-container ${classes}`}>
        {children}
      </div>
    );
  }
}
